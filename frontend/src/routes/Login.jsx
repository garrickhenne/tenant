import LoginForm from "../components/LoginForm";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    const oldTitle = document.title;
    document.title = 'tenant | Login';

    return () => document.title = oldTitle;
  }, []);

  return (
    <main>
      <h1 className="text-slate-200">Login</h1>

      <LoginForm />
    </main>
  );
};

export default Login;