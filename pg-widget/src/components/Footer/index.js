import React from "react";

function Footer() {
  return (
    <div className="flex items-center justify-end mt-2">
      <span className="tracking-widest text-xs mr-5 my-2">
        P O W E R E D &nbsp; B Y{" "}
      </span>
      <img
        src={
          "https://cashfreelogo.cashfree.com/website/NavFooter/Cashfree-Dark.svg"
        }
        alt="cashfree"
        className="w-auto h-7"
      />
    </div>
  );
}

export default Footer;
