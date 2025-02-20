import * as z from "zod";
import { UserLogin } from "../../schemas/user";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { loginUser, selectUser } from "../../store/features/user/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

interface LoginFormProps {
  onClose: () => void;
}

export const LoginForm = ({ onClose }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { status, error } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof UserLogin>>({
    resolver: zodResolver(UserLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof UserLogin>> = (formData) => {
    dispatch(loginUser({ email: formData.email, password: formData.password }));
  };

  // redux klaidas sinchronizuojam su formos klaidomis
  useEffect(() => {
    if (error) {
      setError("root", { message: error });
    }
  }, [error, setError]);

  // jei viskas ok, redirectinam
  useEffect(() => {
    if (status === "succeeded") {
      // ar useris, ar adminas
      if (user.role === "ADMIN") {
        navigate("/suvestine");
        return;
      }

      if (user.role === "USER") {
        navigate("/profilis");
        return;
      }
    }
  }, [status, user, navigate]);

  return (
    <form className="auth-form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <h3>Prisijungimas</h3>
      <div className="w-full h-6">
        {errors.root && (
          <span className="form-error">{errors.root.message}</span>
        )}
      </div>

      {/* ---------- el. pastas ----------- */}
      <div>
        <label htmlFor="email">El. paštas</label>
        <input
          autoComplete="on"
          id="email"
          className="form-input"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <span className="form-error">{errors.email.message}</span>
        )}
      </div>

      {/* ---------- Slaptazodis -------------- */}
      <div>
        <label htmlFor="password">Slaptažodis</label>
        <input
          id="password"
          className="form-input"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <span className="form-error">{errors.password.message}</span>
        )}
      </div>

      {/* ---------- darom submita -------------- */}
      <div className="flex flex-col gap-2 py-3">
        <button
          className="btn-generic"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Prisijungimas..." : "Prisijungti"}
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
