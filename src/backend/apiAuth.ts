import { UserType } from '@/types/user.type';
import supabase from './supabase';

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signup({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar: '',
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser(): Promise<UserType> {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session)
    return {
      id: '',
      name: '',
      email: '',
      role: '',
      avatar: '',
    } as UserType;

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw new Error(userError.message);

  const { error: fetchError } = await supabase
    .from('User')
    .select('*')
    .eq('id', userData.user.id)
    .single();

  if (fetchError) {
    const { error: insertError } = await supabase.from('User').insert({
      id: userData.user.id,
      name: userData.user.user_metadata.name,
      avatar: userData.user.user_metadata.avatar,
    });

    if (insertError) throw new Error(insertError.message);
  }

  return {
    id: userData.user.id,
    name: userData.user.user_metadata.name,
    email: userData.user.email,
    role: userData.user.role,
    avatar: userData.user.user_metadata.avatar,
  } as UserType;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser(newRow: {
  id: string;
  name: string;
  image: string;
  password: string;
}) {
  try {
    let avatarUrl: string | null = null;
    if (newRow.image) {
      const fileName = `avatar-${Math.random().toString(36).substring(2, 15)}`;

      const { error: storageError } = await supabase.storage
        .from('avatar')
        .upload(fileName, newRow.image);

      if (storageError)
        throw new Error(`Storage error: ${storageError.message}`);

      avatarUrl = `https://taqdpudyhenvaibczyar.supabase.co/storage/v1/object/public/avatar/${fileName}`;
    }

    const updateData = {
      data: {
        name: newRow.name,
        ...(avatarUrl && { avatar: avatarUrl }),
      },
      ...(newRow.password && { password: newRow.password }),
    };

    const { data: updateUser, error: authError } =
      await supabase.auth.updateUser(updateData);

    if (authError) throw new Error(`Auth error: ${authError.message}`);

    const dbUpdate = {
      name: newRow.name,
      ...(avatarUrl && { avatar: avatarUrl }),
    };

    const { error: dbError } = await supabase
      .from('User')
      .update(dbUpdate)
      .eq('id', newRow.id);

    if (dbError) throw new Error(`Database error: ${dbError.message}`);

    return updateUser;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating user:', error.message);
    } else {
      console.error('Error updating user:', error);
    }
    throw error;
  }
}


