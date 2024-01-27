import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

function AuthLayout({ children }) {
  const router = useRouter();
  const pathName = router.pathname;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex flex-col w-full lg:w-3/5 bg-[#394592]">
        <div className="flex justify-center items-center pt-8 lg:pt-12 ">
          <Image src="/analyticAI_logo.png" width={250} height={100} alt="AnalyticAI Logo" />
        </div>

        {/* Illustration */}
        {pathName == "/authentication/login" ? (
          <div className="flex justify-center items-center lg:pt-12 ">
            <Image className="w-auto h-auto" src="/Login-image.png" width={500} height={100} alt="Login-image" />
          </div>
        ) : (
          <div className="flex justify-center items-center lg:pt-12 ">
            <Image src="/Enter OTP-image.png" width={500} height={100} alt="OTP-image" />
          </div>
        )}
        {/* Illustration */}

        <div className="text-center items-center mb-3 lg:pt-[80px]">
          <div className="flex flex-col">
            <div className="text-white text-2xl mb-2">Data Fusion</div>
            <div className="text-white text-sm">Plan, Budget, Forecast, Grow Your Business</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center lg:w-2/5">{children}</div>
    </div>
  );
}

export default AuthLayout;
