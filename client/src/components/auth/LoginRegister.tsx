import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const LoginRegister = () => {
  const [login, setLogin] = useState(true);

  return (
    <div>
      {login ? (
        <LoginForm onClose={() => setLogin(false)} />
      ) : (
        <RegisterForm onClose={() => setLogin(true)} />
      )}
    </div>
  );
};
