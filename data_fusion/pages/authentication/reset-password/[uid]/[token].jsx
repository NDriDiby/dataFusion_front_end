import AuthLayout from "@/components/Authentication/AuthLayout";
import React, { useState, useEffect } from "react";
import { FaRegEnvelope } from "react-icons/fa6";
import { useRouter } from "next/router";
import { findUser, resetPassword } from "@/helper/backEndFunction";
import { VscKey } from "react-icons/vsc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function ResetPassword() {
  const router = useRouter();
  const { uid, token } = router.query;
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [existingUser, setExistingUser] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

  //   console.log("DATA", uid64, token);

  useEffect(() => {
    setErrorMessage("");
  }, [email]);

  const seePassword = () => {
    setViewPassword(!viewPassword);
  };

  const retrieveUser = async (e, email) => {
    e.preventDefault();
    try {
      const response = await findUser(email);
      setExistingUser(true);
    } catch (error) {
      // console.log("error", error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  const handleResetPassword = async (e, password1, password2) => {
    e.preventDefault();
    if (password1 !== password2) {
      setErrorMessage({ error: "Password do not match" });
      return;
    }
    try {
      const response = await resetPassword(password1, uid, token);

      setErrorMessage(response.data.message);
      setTimeout(() => {
        router.push("/authentication/login/");
      }, 3000);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <AuthLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="items-center">
          <div className="flex flex-col text-center mb-5">
            <div className="font-bold text-2xl text-[#171D1C]">Reset Password</div>
            <div className="text-center text-sm text-gray-400">Enter your new password</div>
          </div>
        </div>

        <div>
          {errorMessage && (
            <div className={`error-message text-center font-semibold p-2 mb-3 ${errorMessage.error || errorMessage.message ? "text-red-500" : "text-green-500"}`}>
              {errorMessage.error || errorMessage.message || errorMessage}
            </div>
          )}
        </div>

        <form>
          <div className="space-y-3 md:w-[400px] lg:w-[400px] px-2">
            <div className="relative mb-3">
              <div className="flex items-center border border-[#D9D9D9] rounded-md relative">
                <VscKey className="absolute ml-3 text-gray-400 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                <input
                  type={viewPassword ? "text" : "password"}
                  placeholder="New password"
                  className="w-full pl-10 pr-10 py-2 bg-transparent focus:outline-none rounded-md  focus:border-black"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                  {viewPassword ? <MdOutlineRemoveRedEye onClick={seePassword} className="text-gray-400" /> : <RiEyeCloseLine onClick={seePassword} className="text-gray-400" />}
                </div>
              </div>
            </div>
            <div className="relative mb-3">
              <div className="flex items-center border border-[#D9D9D9] rounded-md relative">
                <VscKey className="absolute ml-3 text-gray-400 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                <input
                  type={viewPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="w-full pl-10 pr-10 py-2 bg-transparent focus:outline-none rounded-md  focus:border-black"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                  {viewPassword ? <MdOutlineRemoveRedEye onClick={seePassword} className="text-gray-400" /> : <RiEyeCloseLine onClick={seePassword} className="text-gray-400" />}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 px-2">
            <button onClick={(e) => handleResetPassword(e, password1, password2)} className="w-full py-2  bg-[#394592] text-white rounded-md hover:bg-gray-700">
              Reset password
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

export default ResetPassword;
