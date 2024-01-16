import { useState } from "react";
import { login } from "@/features/AuthSlice";
import { useDispatch } from "react-redux";
import { sendOTP } from "@/helper/backEndFunction";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const action = await dispatch(login({ email, password }));
      if (login.fulfilled.match(action)) {
        // Login successful
        console.log("Login successful:", action.payload);

        // Send OTP
        try {
          const data = await sendOTP(email);
          console.log("OTP sent:", data.data);
          router.push("/authentication/verify/");
        } catch (otpError) {
          console.error("Error sending OTP:", otpError);
          // Handle OTP send error
        }
      } else {
        // Login failed
        setErrorMessage("Invalid Credentials");
        console.log("Login failed:", action.error);
        // Handle login failure
        return;
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  py-2 px-4">
      {isLoading ? (
        <Spinner message={"Processing your information"} />
      ) : (
        <>
          <div className="p-4 bg-white w-full max-w-xs mx-auto rounded-md shadow-md">
            {errorMessage && <div className="error-message text-center font-semibold text-red-500 p-2">{errorMessage}</div>}
            <h2 className="text-2xl font-bold text-[#0a2558] text-center mb-4">Connexion</h2>
            {/* Display error message if login fails */}

            <form>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mt-4">
                <button className="w-full py-2 px-4 bg-[#0a2558] text-white rounded-md hover:bg-gray-700" onClick={handleLogin}>
                  Valider
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
