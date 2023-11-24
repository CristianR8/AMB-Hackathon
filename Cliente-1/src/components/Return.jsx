import React from "react";
import { Link } from "react-router-dom";
import { IoIosReturnLeft } from "react-icons/io";
import { MdDownload } from "react-icons/md";

const Return = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="px-8 py-4 rounded-xl fixed bottom-4 right-8 m-4 text-bold text-lg z-0 bg-neutral-950 hover:scale-110 hover:bg-neutral-50 hover:text-neutral-950 hover:border-neutral-950 text-neutral-50 transition-all duration-200 shadow-2xl"
    >
        Return
      <IoIosReturnLeft />

    </Link>
  );
};

export default Return;
