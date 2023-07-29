import React, { useState } from "react";
import moment from "moment";
import { BsCalendar } from "react-icons/bs";
import { CopyToClipboard } from "react-copy-to-clipboard";

// Constants
import { FORMATS } from "../../constants/date";

function OffersContent({ openedTab, data, renderIcon }) {
  const [copiedCode, setCopiedCode] = useState("");
  const [isCopied, setIsCopied] = useState("");

  const handleCopy = (code) => {
    setIsCopied("Copied!");

    setTimeout(() => {
      setIsCopied(code);
    }, 1000);
  };

  return (
    <div
      className={`tab-pane fade text-xs sm:text-base ${
        openedTab === "offerDetails" ? "active show" : "hidden"
      }`}
      id="offerDetails"
      role="tabpanel"
    >
      <div className="mt-2 flex-1 overflow-hidden overflow-y-scroll max-h-96 text-xs sm:text-base">
        {data.offerDetails.offers.map((offer) => (
          <div
            key={offer.code}
            className="mb-8 space-y-3 bg-gray-50 p-5 rounded-md"
          >
            <div className="flex items-center justify-center">
              {/* icon */}
              {offer.paymentMethod !== "ALL" &&
              offer.paymentMethod !== "UPI" ? (
                <div className="flex space-x-2">
                  {offer.paymentModes.PAY_LATER &&
                    offer.paymentModes.PAY_LATER.map((paymentOption) =>
                      renderIcon(
                        paymentOption.display.split(" ")[0],
                        paymentOption.display
                      )
                    )}
                </div>
              ) : (
                <div className="flex space-x-2">
                  {renderIcon(
                    "ALL",
                    "https://img.icons8.com/ios/250/000000/wallet.png"
                  )}
                </div>
              )}

              {/* title */}
              <div className="flex flex-1 items-center">
                <h2 className="text-gray-900 text-left font-semibold text-base pl-2">
                  {offer.title}
                </h2>
              </div>

              {/* offer valid */}
              {offer.paymentMethod !== "ALL" && (
                <p className="text-left w-20 hidden sm:!flex justify-center items-center space-x-1 sm:text-xs sm:w-auto text-gray-500 break-words">
                  <span>
                    <BsCalendar />
                  </span>
                  <span>
                    Offer valid till{" "}
                    {
                      moment(offer.endTime)
                        .format(FORMATS.TIMESTAMP)
                        .split(",")[0]
                    }
                  </span>
                </p>
              )}
            </div>

            <p className="text-left sm:text-sm text-gray-500">
              {offer.description}
            </p>

            {/* offer to apply */}
            <div
              className="flex justify-between pr-2 w-20 cursor-pointer"
              onClick={() => {
                setCopiedCode(offer.code);
                handleCopy(offer.code);
              }}
            >
              <CopyToClipboard text={offer.code}>
                <h3
                  className={`${
                    isCopied === "Copied!" &&
                    "bg-purple-200 border-purple-300 border"
                  }  border-2 rounded-md text-xs p-2 bg-purple-50 border-purple-300 border-dashed`}
                >
                  {copiedCode === offer.code ? isCopied : offer.code}
                </h3>
              </CopyToClipboard>
            </div>

            {/* offer valid - mobile */}
            {offer.paymentMethod !== "ALL" && (
              <p className="flex items-center space-x-1 text-left sm:w-auto text-xs sm:hidden text-gray-500 break-words">
                <span>
                  <BsCalendar />
                </span>
                <span>
                  Offer valid till{" "}
                  {
                    moment(offer.endTime)
                      .format(FORMATS.TIMESTAMP)
                      .split(",")[0]
                  }
                </span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OffersContent;
