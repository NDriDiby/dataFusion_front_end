import AuthLayout from "@/components/Authentication/AuthLayout";
import React, { useState, useEffect } from "react";
import { FaRegEnvelope } from "react-icons/fa6";
import { useRouter } from "next/router";
import { findUser } from "@/helper/backEndFunction";

function forgetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [email]);

  const retrieveUser = async (e, email) => {
    e.preventDefault();
    try {
      const response = await findUser(email);
      console.log("response.data", response.data);
    } catch (error) {
      console.log("error", error.response.data);
      setErrorMessage(error.response.data);
    }
  };
  return (
    <AuthLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="items-center">
          <div className="flex flex-col text-center mb-5">
            <div className="font-bold text-2xl text-[#171D1C]">Forget Password</div>
            <div className="text-center text-sm text-gray-400">Enter your email to get a link to reset your password</div>
          </div>
        </div>

        <div>{errorMessage && <div className="error-message text-center font-semibold text-red-500 p-2 mb-3">{errorMessage.error || errorMessage.code || errorMessage.message}</div>}</div>

        <form>
          <div className="space-y-3 md:w-[400px] lg:w-[400px] px-2">
            <div className="mb-3">
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
          </div>

          <div className="mt-3 px-2">
            <button onClick={(e) => retrieveUser(e, email)} className="w-full py-2  bg-[#394592] text-white rounded-md hover:bg-gray-700">
              Verify
            </button>
          </div>
          <div onClick={() => router.push("/authentication/login/")} className="text-center text-[#171D1C] mt-2 text-sm underline cursor-pointer">
            Back to login
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default forgetPassword;
