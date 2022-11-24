import React from "react";
import Image from "next/image";

const Logo = ({ width = 50 }) => {
  return <Image src="/images/logo.png" width={width} height={width} />;
};

export default Logo;
