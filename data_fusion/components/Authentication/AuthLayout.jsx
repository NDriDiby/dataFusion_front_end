import Image from "next/image";
import React from "react";

function AuthLayout({ children }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex flex-col w-full lg:w-3/5 bg-[#394592]">
        <div className="flex justify-center items-center mt-8 lg:mt-24 ">
          <Image src="/analyticAI_logo.png" width={250} height={100} />
        </div>

        <div className="text-center items-center mb-3  pt-12 lg:pt-[600px]">
          <div className="flex flex-col">
            <div className="text-white text-2xl mb-2">Data Fusion</div>
            <div className="text-white text-sm">Plan, Budget, Forecast, Grow Your Business</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center  lg:w-2/5">{children}</div>
    </div>
  );
}

export default AuthLayout;
