import * as z from 'zod';
import { UserLogin } from '../../schemas/user';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  getUserError,
  getUserStatus,
  login,
  selectUser,
} from '../../store/user/userSlice';

interface LoginFormProps {
  onClose: () => void;
}

export const LoginForm = ({ onClose }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const error = useAppSelector(getUserError);
  const status = useAppSelector(getUserStatus);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof UserLogin>>({
    resolver: zodResolver(UserLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof UserLogin>> = async (
    formData
  ) => {
    const { email, password } = formData;

    if (status === 'idle') dispatch(login({ email, password }));
    console.log(user);
    console.log(status);
    console.log(error);
    if (error) {
      setError('root', { message: error });
      return;
    }
  };

  return (
    <form className="auth-form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <h3>Prisijungimas</h3>
      <div className="w-full h-6">
        {errors.root && (
          <span className="form-error">{errors.root.message}</span>
        )}
      </div>

      {/* ---------- el pastas ----------- */}
      <div>
        <label htmlFor="email">El. paštas</label>
        <input
          autoComplete="on"
          id="email"
          className="form-input"
          type="email"
          {...register('email')}
        />
        {errors.email && (
          <span className="form-error">{errors.email.message}</span>
        )}
      </div>
      {/* ---------- slaptazodis -------------- */}
      <div>
        <label htmlFor="password">Slaptažodis</label>
        <input
          id="password"
          className="form-input"
          type="password"
          {...register('password')}
        />
        {errors.password && (
          <span className="form-error">{errors.password.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2 py-3">
        <button className="btn-generic" type="submit">
          Prisijungti
        </button>
        <div className="flex gap-2 justify-center">
          <span>Pirmas kartas?</span>
          <button type="button" onClick={onClose} className="btn-link">
            Prašome užsiregistruoti
          </button>
        </div>
      </div>
    </form>
  );
};
