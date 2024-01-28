import React from "react";
import Image from "next/image";

export const renderIllustration = (pathName) => {
  switch (pathName) {
    case "/authentication/login":
      return (
        <div className="flex justify-center items-center lg:pt-12">
          <Image src="/Login-image.png" width={500} height={500} alt="Login-image" />
        </div>
      );

    case "/authentication/verify":
      return (
        <div className="flex justify-center items-center lg:pt-12">
          <Image priority src="/Enter OTP-image.png" width={500} height={500} alt="OTP-image" />
        </div>
      );

    // Add more cases as needed

    default:
      return (
        <div className="flex justify-center items-center lg:pt-12">
          <Image src="/forgetPassword-image.png" width={500} height={500} alt="forgetPassword-image" />
        </div>
      );
  }
};
