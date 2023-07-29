import React, { useContext, useState } from "react";
import "regenerator-runtime"; // need for Parcel bundle

// Components
import OfferModal from "../../components/OfferModal/OfferModal";

// Providers
import { MerchantContext } from "../../providers/merchant";

function OfferWidget({ openTab }) {
  const { frameData, amount, opentab } = useContext(MerchantContext);

  const [isOpen, setIsOpen] = useState(true);
  const [openedTab, setOpenedTab] = useState(opentab);

  function closeModal() {
    window.top.postMessage({ isModelClose: true }, "*");

    setIsOpen(false);
  }

  function openModal() {
    window.top.postMessage({ isModelOpen: true }, "*");

    setIsOpen(true);
  }

  // useEffect(() => {
  //   (async function fetchData() {
  //     const response = await getOffers(
  //       merchantId,
  //       amount,
  //       isOffer,
  //       isPayLater,
  //       isEmi
  //     );

  //     if (response.statusCode === 500) return;

  //     setData(response);
  //   })();
  // }, [merchantId, amount, isOffer, isPayLater, isEmi]);

  if (
    frameData &&
    frameData.offerDetails.offers.length === 0 &&
    frameData.payLaters.length === 0 &&
    frameData.emiDetails.ccEMIPlans.length === 0 &&
    frameData.emiDetails.dcEMIPlans.length === 0
  )
    return;

  return (
    <div>
      {frameData && (
        <OfferModal
          isOpen={isOpen}
          openModal={openModal}
          closeModal={closeModal}
          data={frameData}
          openedTab={openedTab}
          setOpenedTab={setOpenedTab}
          amount={amount}
        />
      )}
    </div>
  );
}

export default OfferWidget;
