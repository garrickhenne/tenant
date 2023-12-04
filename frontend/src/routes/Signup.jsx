import SignupForm from "../components/SignupForm";
import { useEffect } from "react";

const Signup = () => {
  useEffect(() => {
    const oldTitle = document.title;
    document.title = 'tenant | Sign up';

    return () => document.title = oldTitle;
  }, []);

  return (
    <main>
      <h1 className="text-slate-200">Create an Account</h1>

      <SignupForm />
    </main>
  );
};

export default Signup;