import Spinner from "@/components/Spinner";
import { selectUserEmail } from "@/features/AuthSlice";
import { verifyOTP } from "@/helper/backEndFunction";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

function Verify() {
  const router = useRouter();
  const userEmail = useSelector(selectUserEmail); // Replace with your actual token state path
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOTPValid, setIsOTPValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsOTPValid(false);
    setErrorMessage("");
    e.preventDefault();
    const result = await verifyOTP(userEmail, otp);
    if (!result.success) {
      setErrorMessage(result.error);
    } else {
      // Handle success
      setIsOTPValid(true); // Update state based on successful verification
      router.push("/dashboard/home/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  py-6 px-4">
      <div className="rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-[#0a2558] text-center">OTP Verification</h1>
          <div className="">
            <p className="text-sm text-gray-600 text-center mt-2">We have sent a One-Time Password to your email. Please enter it below to verify your account. The OTP expires in 5 minutes.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
          {errorMessage && <div className="error-message text-center font-semibold text-red-500 p-2">{errorMessage.error || errorMessage.code}</div>}
          {isOTPValid && <div className="text-green-500 font-semibold text-center p-2">OTP Verified Successfully!</div>}
          <div className="mb-6">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className=" text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              maxLength="6"
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Verify;
