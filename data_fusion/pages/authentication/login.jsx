import { useState } from "react";
import { login } from "@/features/AuthSlice";
import { useDispatch } from "react-redux";
import { sendOTP } from "@/helper/backEndFunction";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";
import AuthLayout from "@/components/Authentication/AuthLayout";
import { FaRegEnvelope } from "react-icons/fa6";
import { VscKey } from "react-icons/vsc";
import { RiEyeCloseLine } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const dispatch = useDispatch();

  const seePassword = () => {
    setViewPassword(!viewPassword);
  };

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
    <AuthLayout>
      <div className="flex justify-center items-center">
        <div className="items-center">
          <div className="flex flex-col text-center mb-10">
            <div className="font-bold text-2xl text-[#171D1C]">Login</div>
            <div className="text-center text-sm text-gray-400">Welcome to Data Fusion</div>
          </div>

          <div className="">
            {isLoading ? (
              <Spinner message={"Processing your information"} />
            ) : (
              <>
                <div className="">
                  {errorMessage && <div className="error-message text-center font-semibold text-red-500 p-2">{errorMessage}</div>}

                  <form>
                    <div className="space-y-3 md:w-[400px] lg:w-[400px] px-2">
                      <div className="mb-5">
                        <div className="text-sm mb-1 text-[#171D1C]">Email or Phone number</div>
                        <div className="flex items-center border border-[#D9D9D9] rounded-md relative">
                          <FaRegEnvelope className="absolute ml-3 text-gray-400 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                          <input
                            type="email"
                            placeholder="Email"
                            className="w-full pl-10 pr-10 py-2 bg-transparent focus:outline-none rounded-md  focus:border-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <div className="text-sm mb-1 text-[#171D1C]">Password</div>
                        <div className="flex items-center border border-[#D9D9D9] rounded-md relative">
                          <VscKey className="absolute ml-3 text-gray-400 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                          <input
                            type={viewPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full pl-10 pr-10 py-2 bg-transparent focus:outline-none rounded-md  focus:border-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                            {viewPassword ? <MdOutlineRemoveRedEye onClick={seePassword} className="text-gray-400" /> : <RiEyeCloseLine onClick={seePassword} className="text-gray-400" />}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 flex justify-end mb-2">
                        <div className="text-gray-500 text-xs cursor-pointer text-semibold" onClick={() => router.push("/authentication/forget-password/")}>
                          Forget Password?
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 px-2">
                      <button className="w-full py-2 px-4 bg-[#394592] text-white rounded-md hover:bg-gray-700" onClick={handleLogin}>
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;

{
  /* <div className="flex flex-col items-center justify-center min-h-screen  py-2 px-4">
      {isLoading ? (
        <Spinner message={"Processing your information"} />
      ) : (
        <>
          <div className="p-4 bg-white w-full max-w-xs mx-auto rounded-md shadow-md">
            {errorMessage && <div className="error-message text-center font-semibold text-red-500 p-2">{errorMessage}</div>}
            <h2 className="text-2xl font-bold text-[#0a2558] text-center mb-4">Connexion</h2>
           

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
    </div> */
}
