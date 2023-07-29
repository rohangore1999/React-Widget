import React from "react";

// Components
import Cards from "../../components/Cards";
import { getBankDetails } from "../../utils/common";

function PayLaterContent({ openedTab, data, renderIcon }) {
  return (
    <div
      className={`tab-pane fade ${
        openedTab === "payLaters" ? "active show" : "hidden"
      }`}
      id="payLaters"
      role="tabpanel"
    >
      <div className="hidden md:flex md:flex-col mt-2 flex-1 overflow-y-scroll max-h-96">
        {/* Paylater Card */}
        <img
          className="flex object-contain justify-center items-center w-full mx-auto my-2 mb-5"
          alt={"paylater banner"}
          src={"https://sdk.cashfree.com/js/widget/1.0.0/banner.svg"}
        />

        {data.payLaters.map((payLater, idx) => (
          <div key={payLater.code} className="mb-8 space-y-5 text-xs md:px-20">
            {/* Paylater to apply */}
            <table className="w-full table-fixed">
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center justify-start space-x-2">
                      <span className="!hidden sm:!block">
                        {renderIcon(
                          payLater.nick.split(" ")[0],
                          payLater.display
                        )}
                      </span>
                      <h3 className="text-left">
                        {getBankDetails(payLater)[0].issuers}
                      </h3>
                    </div>
                  </td>

                  <td>
                    <div className="flex justify-center items-center">
                      <h3 className="text-center">
                        {getBankDetails(payLater)[0].interest}
                      </h3>
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center justify-end">
                      <h3>
                        <span>
                          {getBankDetails(payLater)[0].creditPeriod}{" "}
                          <span className="text-gray-500">Credit Period</span>
                        </span>
                      </h3>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {data.payLaters.length - 1 === idx ? "" : <hr />}
          </div>
        ))}
      </div>

      {/* Card View - for Mobile View */}
      <Cards data={data} />
    </div>
  );
}

export default PayLaterContent;
