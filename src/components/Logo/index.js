import React from "react";
import Image from "next/image";

const Logo = ({ width = 44 }) => {
  return <Image src="/images/logo.png" width={width} height={width} alt="Prilaku Logo" />;
};

export default Logo;
