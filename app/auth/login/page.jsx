// import { login, signup } from "../actions";

// export default function LoginPage() {
//   return (
//     <form>
//       <label htmlFor="email">Email:</label>
//       <input id="email" name="email" type="email" required />
//       <label htmlFor="password">Password:</label>
//       <input id="password" name="password" type="password" required />
//       <button formAction={login}>Log in</button>
//     </form>
//   );
// }

import { login } from "../actions";

// components
import AuthForm from "../AuthForm";

export default function Login() {
  return (
    <main>
      <h2 className="text-center">Login</h2>

      <AuthForm handleSubmit={login} />
    </main>
  );
}
