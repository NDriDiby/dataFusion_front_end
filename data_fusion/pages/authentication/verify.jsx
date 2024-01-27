import Spinner from "@/components/Spinner";
import { selectUserEmail } from "@/features/AuthSlice";
import { sendOTP, verifyOTP } from "@/helper/backEndFunction";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AuthLayout from "@/components/Authentication/AuthLayout";

function Verify() {
  const router = useRouter();
  const userEmail = useSelector(selectUserEmail); // Replace with your actual token state path
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOTPValid, setIsOTPValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");

  // Create refs for each input field
  const otp1Ref = useRef(null);
  const otp2Ref = useRef(null);
  const otp3Ref = useRef(null);
  const otp4Ref = useRef(null);
  const otp5Ref = useRef(null);
  const otp6Ref = useRef(null);

  useEffect(() => {
    const enteredOTP = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;
    setErrorMessage("");
    setOtp(enteredOTP);
  }, [otp1, otp2, otp3, otp4, otp5, otp6]);

  // const obfuscateEmail = (email) => {
  //   const [username, domain] = email.split("@");
  //   if (username.length > 2) {
  //     const obfuscatedUsername = `${username[0]}${"*".repeat(username.length - 2)}${username[username.length - 1]}`;
  //     return `${obfuscatedUsername}@${domain}`;
  //   }
  //   // Fallback for usernames with 2 characters or less
  //   return `*${username[username.length - 1]}@${domain}`;
  // };

  const resendOTP = async () => {
    try {
      const data = await sendOTP(userEmail);
      console.log("OTP sent:", data.data);
      setErrorMessage(data.data);
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error
    }
  };

  // const obfuscatedEmail = obfuscateEmail(userEmail);

  const handleInputChange = (value, currentRef, nextRef) => {
    currentRef.current.focus();

    // Check if the value is a number

    // Update the state for the current OTP input
    const otpIndex = currentRef.current.getAttribute("data-index");
    switch (otpIndex) {
      case "1":
        setOtp1(value);
        break;
      case "2":
        setOtp2(value);
        break;
      case "3":
        setOtp3(value);
        break;
      case "4":
        setOtp4(value);
        break;
      case "5":
        setOtp5(value);
        break;
      case "6":
        setOtp6(value);
        break;
      default:
        break;
    }

    if (value.length === 1 && nextRef) {
      nextRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    setIsOTPValid(false);
    setErrorMessage("");
    e.preventDefault();
    const result = await verifyOTP(userEmail, otp);
    if (!result.success) {
      setErrorMessage(result.error);
      console.log("result.error", result.error);
    } else {
      // Handle success
      setIsOTPValid(true); // Update state based on successful verification
      router.push("/dashboard/home/");
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 text-center">
          <div className="flex flex-col text-center mb-3">
            <div className="font-bold text-2xl text-[#171D1C]">OTP Verification</div>
            <div className="text-center text-sm text-gray-400">Enter code sent to {userEmail}</div>
          </div>
        </div>

        <div>
          {errorMessage && <div className="error-message text-center font-semibold text-red-500 p-2 mb-3">{errorMessage.error || errorMessage.code || errorMessage.message}</div>}
          {isOTPValid && <div className="text-green-500 font-semibold text-center p-2 mb-3">OTP Verified Successfully!</div>}
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-x-4 mb-5">
            <input
              ref={otp1Ref}
              data-index="1"
              value={otp1}
              onChange={(e) => handleInputChange(e.target.value, otp1Ref, otp2Ref)}
              type="text"
              maxLength="1"
              placeholder="0"
              className="w-[50px] h-[50px] text-center py-2 border border-gray-300 rounded-md"
            />
            <input
              ref={otp2Ref}
              data-index="2"
              value={otp2}
              onChange={(e) => handleInputChange(e.target.value, otp2Ref, otp3Ref)}
              type="text"
              maxLength="1"
              placeholder="0"
              className="w-[50px] h-[50px] text-center py-2 border border-gray-300 rounded-md"
            />
            <input
              ref={otp3Ref}
              data-index="3"
              value={otp3}
              onChange={(e) => handleInputChange(e.target.value, otp3Ref, otp4Ref)}
              type="text"
              maxLength="1"
              placeholder="0"
              className="w-[50px] h-[50px] text-center py-2 border border-gray-300 rounded-md"
            />
            <input
              ref={otp4Ref}
              data-index="4"
              value={otp4}
              onChange={(e) => handleInputChange(e.target.value, otp4Ref, otp5Ref)}
              type="text"
              maxLength="1"
              placeholder="0"
              className="w-[50px] h-[50px] text-center py-2 border border-gray-300 rounded-md"
            />
            <input
              ref={otp5Ref}
              data-index="5"
              value={otp5}
              onChange={(e) => handleInputChange(e.target.value, otp5Ref, otp6Ref)}
              type="text"
              maxLength="1"
              placeholder="0"
              className="w-[50px] h-[50px] text-center py-2 border border-gray-300 rounded-md"
            />
            <input
              ref={otp6Ref}
              data-index="6"
              value={otp6}
              onChange={(e) => handleInputChange(e.target.value, otp6Ref, null)}
              type="text"
              maxLength="1"
              placeholder="0"
              className="w-[50px] h-[50px] text-center py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mt-6">
            <button className="w-full py-2  bg-[#394592] text-white rounded-md hover:bg-gray-700">Verify</button>
          </div>
        </form>

        <div className="flex justify-center items-center mt-5">
          <div className="flex flex-col">
            <div className="text-center text-sm text-[#171D1C]">Don&apos;t get code</div>
            <div onClick={() => resendOTP()} className="text-center text-sm text-[#394592] cursor-pointer">
              Resend code
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Verify;
