import { UseFormRegister } from 'react-hook-form';

interface FormData {
  name?: string;
  image?: string;
  password?: string;
  email?: string;
  price?: number;
  description?: string;
  category?: string;
  title?: string;
  piecesRemaining?: number;
  color1?: string;
  color2?: string;
  yourRating?: number;
  yourName?: string;
  rating?: number;
  comment?: string;
}

export interface InputProps {
  register: UseFormRegister<{ [key: string]: any }> | any;
  type?: 'text' | 'number' | 'email' | 'password' | 'file';
  name: keyof FormData;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  additionalClasses?: string;
  labelStyle?: boolean;
}
