import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <Image
      src="/assets/icons/loader.svg"
      alt="loading..."
      width={200}
      height={200}
    />
  );
};

export default Loader;
