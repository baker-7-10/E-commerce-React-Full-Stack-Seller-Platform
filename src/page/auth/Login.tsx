import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Image from '@/assets/Side Image.png';
import useUser from '@/hooks/useUser';
import { UseLogin } from '@/hooks';
import Input from '@/ui/Input/Input';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();
  const { login, isLoading } = UseLogin();

  const { isAuthenticated } = useUser();

  async function onSubmit(newRow: { email: string; password: string }) {
    login(newRow);
  }
  const navigate = useNavigate();

  return (
    <div className=" flex justify-center items-center  flex-col   p-20 gap-24 ">
      {isAuthenticated && (
        <p
          onClick={() => navigate(-1)}
          className=" z-50  text-[20px] absolute top-[60px]  left-2"
        >
          <FontAwesomeIcon icon={faArrowCircleLeft} />
        </p>
      )}
      <div className="  flex  flex-row-reverse gap-3 h-[80vh]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="   min-w-[300px]  h-[350px]  flex flex-col  gap-7 p-4"
        >
          <h1 className="  text-2xl    font-bold">Log in to Exclusive</h1>
          <p>Enter your details below</p>

          <Input
            label={'email'}
            register={register}
            type={'text'}
            name={'email'}
            labelStyle={true}
          />
          <Input
            label={'password'}
            register={register}
            type={'text'}
            name={'password'}
            labelStyle={true}
          />
          <button
            disabled={isLoading}
            className=" p-1 rounded-sm bg-red-600 text-white  "
            type="submit"
          >
            Log In
          </button>

          <Link className="text-red-600" to="/SignUp">
            create new account!
          </Link>
        </form>
        <img src={Image} className=" hidden lg:block   " />
      </div>
    </div>
  );
}

export default Login;
