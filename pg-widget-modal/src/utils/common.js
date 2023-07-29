import { bankDetails, emiDetails, paymentCodeSequence } from "constants/common";
import React from "react";

// Cashfree Icons
const icons = require("payments-icons-library");

export const getEmiPlanSequence = (emiData) => {
  const ccEMIPlansSequence = [];

  paymentCodeSequence.map((paymentCode) => {
    emiData.forEach((emiDetails) => {
      if (paymentCode === emiDetails.paymentCode) {
        ccEMIPlansSequence.push(emiDetails);
      }
    });

    return ccEMIPlansSequence;
  });

  return ccEMIPlansSequence;
};

export const getBaseURL = () => {
  return process.env.REACT_APP_API_URL;
};

export const getEMIBankDetails = (emi) =>
  emiDetails.filter((emiDetail) => emiDetail.paymentCode === emi.paymentCode);

export const getBankDetails = (payLater) =>
  bankDetails.filter((bankDetail) => bankDetail.paymentCode === payLater.code);

export const renderIcon = (icon, displayName) => {
  if (icon === "bob") {
    icon = "bobc";
  }
  if (icon === "Zestmoneyv2") {
    icon = "zestmoney";
  }
  if (icon === "ausmallccemi") {
    icon = "au";
  }

  if (icon === "sc") {
    icon = "scb";
  }

  if (icon === "Lazy") {
    icon = "lazypay";
  }

  if (icon === "homecredit") {
    return (
      <div className="group relative cursor-pointer border p-1 rounded-md">
        <span
          className="group-hover:visible bottom-10 left-0 absolute rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 p-2 
          text-center min-w-max invisible"
        >
          {displayName}
        </span>
        <img
          alt="icon"
          src={
            "https://merchant.cashfree.com/merchants/d3b0d9bda235d4aec7b7.svg"
          }
        />
      </div>
    );
  }

  if (icon === "kreditbee") {
    return (
      <div className="group relative cursor-pointer border p-1 rounded-md">
        <span
          className="group-hover:visible bottom-10 left-0 absolute rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 p-2 
          text-center min-w-max invisible"
        >
          {displayName}
        </span>
        <img
          alt="icon"
          src={
            "https://payments.cashfree.com/order/icons/cardlessemi/kreditbee.png"
          }
        />
      </div>
    );
  }

  if (icon === "ALL") {
    return (
      <div className="group relative cursor-pointer border p-1 rounded-md">
        <span
          className="group-hover:visible bottom-10 left-0 absolute rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 p-2 
          text-center min-w-max invisible"
        >
          {displayName}
        </span>
        <img
          alt="icon"
          width={32}
          src={"https://img.icons8.com/ios/250/000000/wallet.png"}
        />
      </div>
    );
  }

  const iconImage = icons.getIcon(icon, "sm");

  return (
    <div className="group relative cursor-pointer border p-1 rounded-md">
      <span
        className="group-hover:visible bottom-10 left-0 absolute rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 p-2 
        text-center min-w-max invisible"
      >
        {displayName}
      </span>
      <img alt="icon" src={iconImage.icon_url} />
    </div>
  );
};
