/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { init } from "@amplitude/analytics-browser";
import "regenerator-runtime"; // need for Parcel bundle

// Components
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";

// Providers
import { MerchantContext } from "../../providers/merchant";

import { track } from "@amplitude/analytics-browser";

function OfferWidget() {
  // eslint-disable-next-line no-unused-vars
  const [isOpen, setIsOpen] = useState(false);
  const [openedTab, setOpenedTab] = useState();

  const { frameData, amount, appId } = useContext(MerchantContext);

  function openModal(opentab) {
    window.top.postMessage({ isModelOpen: true, opentab }, "*");

    setIsOpen(true);
  }

  if (
    frameData &&
    frameData.offerDetails.offers.length === 0 &&
    frameData.payLaters.length === 0 &&
    frameData.emiDetails.ccEMIPlans.length === 0 &&
    frameData.emiDetails.dcEMIPlans.length === 0
  )
    return;

  init("8a82123f9215935073f85d06243f895b", appId);

  // Page load
  track("PG offers_widget_load", {
    appId: appId,
  });

  // on button click
  const logClick = (type) => {
    track("PG widget_button_click", {
      appId: appId,
      type: type,
    });
  };

  return (
    <div className="flex flex-col max-w-md sm:px-5 py-2 border-blue-300 rounded-xl bg-[#F9FDFF] my-4 !overflow-y-hidden">
      {!frameData && <Loading />}

      {/* offers */}
      <div className="flex items-center justify-center mb-1 text-center space-x-2">
        {frameData && frameData.offerDetails.offers.length !== 0 && (
          <div className="flex flex-col justify-center items-center h-20 w-44 sm:!w-36 p-2 bg-white space-y-2">
            <span className="text-base font-semibold">
              ₹{frameData && frameData.offerDetails.maxSavings}
            </span>
            <span className="text-xs">Savings</span>
            <span
              className="cursor-pointer text-[#4895D6] font-bold underline pl-1 text-xs"
              onClick={() => {
                openModal("offerDetails");
                setOpenedTab("offerDetails");
                logClick("Savings");
              }}
            >
              <button className="focus:outline-none underline">
                {frameData && frameData.offerDetails.offers.length} Offers
              </button>
            </span>
          </div>
        )}

        {/* payLater */}
        {frameData && frameData.payLaters.length !== 0 && (
          <div
            className={`flex flex-col justify-center items-center h-20 ${
              frameData.length === 2 ? "w-44 sm:!w-36" : "!w-52"
            }  p-2 bg-white space-y-2`}
          >
            <span className="text-sm font-semibold">0% Interest</span>
            <span className="text-xs">Pay Later</span>
            <span
              className="cursor-pointer text-[#4895D6] font-bold underline pl-1 text-xs"
              onClick={() => {
                openModal("payLaters");
                setOpenedTab("payLaters");
                logClick("Paylater");
              }}
            >
              <button className="focus:outline-none underline">
                View options
              </button>
            </span>
          </div>
        )}

        {/* emi */}
        {frameData &&
          frameData.emiDetails.ccEMIPlans.length !== 0 &&
          frameData.emiDetails.dcEMIPlans.length !== 0 &&
          amount > 2500 && (
            <div className="flex flex-col justify-center items-center h-20 w-52 sm:!w-40 p-2 bg-white space-y-2">
              <span className="text-base font-semibold">
                ₹
                {frameData &&
                  frameData.emiDetails.minEmiAmount.toLocaleString("en-US")}
              </span>
              <span className="text-xs">Starting EMI</span>
              <span
                className="cursor-pointer text-[#4895D6] font-bold underline pl-1 text-xs"
                onClick={() => {
                  openModal("emiDetails");
                  setOpenedTab("emiDetails");
                  logClick("EMI");
                }}
              >
                <button className="focus:outline-none underline">
                  View plans
                </button>
              </span>
            </div>
          )}
      </div>

      {/* Cashfree Logo */}
      <Footer />
    </div>
  );
}

export default OfferWidget;
