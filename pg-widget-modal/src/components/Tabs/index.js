/* eslint-disable array-callback-return */
import React from "react";

// Constants
import { labelMapping } from "../../constants/common";

function Tabs({ openedTab, setOpenedTab, data, amount }) {
  return (
    <ul
      className="nav nav-tabs flex justify-around sm:justify-start md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4 relative"
      id="tabs-tab3"
      role="tablist"
    >
      {Object.keys(data).map((tab) => {
        if (tab === "offerDetails" && data.offerDetails.offers.length === 0)
          return;

        if (
          tab === "emiDetails" &&
          data.emiDetails.ccEMIPlans.length === 0 &&
          data.emiDetails.dcEMIPlans.length === 0
        )
          return;

        if (tab === "emiDetails" && parseInt(amount) < 2500) return;

        if (tab === "payLaters" && data.payLaters.length === 0) return;

        return (
          <li
            className="nav-item"
            role="presentation"
            onClick={() => setOpenedTab(tab)}
            key={tab}
          >
            <span
              className={`focus:outline-none cursor-pointer
      nav-link w-full block font-medium text-xs leading-tight uppercase border-x-0 
     border-t-0 border-b-4 !px-2 sm:!px-6 py-3 my-2 ${
       openedTab === tab && "active !border-black"
     }`}
              data-bs-toggle="pill"
              data-bs-target={tab}
              role="tab"
              aria-selected={openedTab === tab}
            >
              {labelMapping[tab] === "emi" ? (
                <span
                  className={`${
                    openedTab === tab
                      ? "text-black font-semibold"
                      : "text-purple-500"
                  }`}
                >
                  {data.emiDetails.isNoCostEMI ? "No Cost EMI" : "Card EMI"}
                </span>
              ) : (
                <span
                  className={`${
                    openedTab === tab
                      ? "text-black font-semibold"
                      : "text-purple-500"
                  }`}
                >
                  {labelMapping[tab]}
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default Tabs;
