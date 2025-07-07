import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm
        space-y-4"
      >
        {/* Heading */}
        <h1 className="text-lg font-semibold text-center text-blue-900">
          Welcome to ENTNT Dental Center
        </h1>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center -mt-2">{error}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-[300px] p-4 bg-blue-100 border rounded-lg shadow-md mx-auto block"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-[300px] p-4 bg-blue-100 border rounded-lg shadow-md mx-auto block"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-[300px] p-4 bg-blue-100 border rounded-lg shadow-md mx-auto block"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
