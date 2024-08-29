import { login, signup } from "../actions";

// components
import AuthForm from "../AuthForm";

export default function Login() {
  return (
    <main>
      <h2 className="text-center">Sign up</h2>

      <AuthForm handleSubmit={signup} />
    </main>
  );
}
