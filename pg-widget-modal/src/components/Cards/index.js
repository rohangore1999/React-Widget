import React from "react";
import { getBankDetails, renderIcon } from "../../utils/common";

function Cards({ data }) {
  return (
    <div className="md:hidden mt-2 flex-1 overflow-hidden overflow-y-scroll max-h-96 text-xs sm:text-base">
      <img
        className="flex object-contain justify-center items-center w-full mx-auto my-2 mb-5"
        alt={"paylater banner"}
        src={"https://sdk.cashfree.com/js/widget/1.0.0/bnplbanner.svg"}
      />
      {data.payLaters.map((payLater) => (
        <div
          className="mb-8 space-y-5 bg-gray-50 p-5 rounded-md"
          key={payLater.display}
        >
          <div className="flex flex-1 items-center">
            {renderIcon(payLater.nick.split(" ")[0], payLater.display)}

            <h2 className="text-gray-900 text-left font-semibold text-base pl-2">
              {getBankDetails(payLater)[0].issuers}
            </h2>
          </div>

          <div className="flex justify-between text-base text-gray-800">
            {getBankDetails(payLater)[0].interest}
            <span>{getBankDetails(payLater)[0].creditPeriod} </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
