import * as z from "zod";
import { UserRegister } from "../../schemas/user";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HelperService from "../../services/HelperService";
import toast from "react-hot-toast";
import AuthService from "../../services/AuthService";

interface RegisterFormProps {
  onClose: () => void;
}

export const RegisterForm = ({ onClose }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof UserRegister>>({
    resolver: zodResolver(UserRegister),
    defaultValues: {
      first_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof UserRegister>> = async (
    formData
  ) => {
    const { first_name, email, password } = formData;
    try {
      await AuthService.register(first_name, email, password);
      toast.success("Registracija sėkminga! Prašome prisijungti.");
      onClose();
    } catch (e: unknown) {
      setError("root", { message: HelperService.errorToString(e) });
    }
  };

  return (
    <form className="auth-form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <h3>Registracija</h3>
      <div className="w-full h-6">
        {errors.root && (
          <span className="form-error">{errors.root.message}</span>
        )}
      </div>
      {/* ----------- vardas -------------- */}
      <div>
        <label htmlFor="first_name">Vardas</label>
        <input
          autoComplete="on"
          id="first_name"
          className="form-input"
          type="text"
          {...register("first_name")}
        />
        {errors.first_name && (
          <span className="form-error">{errors.first_name.message}</span>
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
          {...register("email")}
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
          {...register("password")}
        />
        {errors.password && (
          <span className="form-error">{errors.password.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2 py-3">
        <button className="btn-generic" type="submit">
          Užsiregistruoti
        </button>
        <div className="flex gap-2 justify-center">
          <span>Ne pirmas kartas?</span>
          <button type="button" onClick={onClose} className="btn-link">
            Prašome prisijungti
          </button>
        </div>
      </div>
    </form>
  );
};
