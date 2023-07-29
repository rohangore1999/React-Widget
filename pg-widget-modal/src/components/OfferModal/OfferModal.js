import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

// Components
import Tabs from "../../components/Tabs";
import TabContent from "../../components/TabContent/TabContent";
import Footer from "../../components/Footer";
import { getEmiPlanSequence } from "utils/common";

export default function OfferModal({
  isOpen,
  closeModal,
  data,
  openedTab,
  setOpenedTab,
  amount,
}) {
  const ccEMIPlansSequence = getEmiPlanSequence(data.emiDetails.ccEMIPlans);
  const initialPlan = ccEMIPlansSequence[0];

  const [plans, setPlans] = useState({});

  useEffect(() => {
    setPlans(initialPlan);
  }, [initialPlan]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="tansition-all ease-in-out duration-1000 transform"
              enterFrom="translate-y-1/4"
              leave="tansition-all ease-in duration-500 transform"
            >
              <Dialog.Panel className="w-full max-w-3xl overflow-hidden sm:rounded-2xl bg-white p-6 text-left align-middle shadow-xl absolute bottom-0 sm:relative sm:bottom-full sm:transform sm:transition-all">
                <span className="hidden sm:!flex justify-end text-xl">
                  <AiOutlineClose
                    onClick={closeModal}
                    className="cursor-pointer"
                  />
                </span>
                <div className="flex flex-col md:flex-row text-center items-center justify-center">
                  <div className="flex flex-col w-full">
                    <button
                      className="flex sm:hidden justify-start items-center focus:outline-none text-left text-[#2B2D42] w-20 mb-3"
                      onClick={closeModal}
                    >
                      <span className="text-lg w-5">
                        <IoIosArrowBack />
                      </span>{" "}
                      Close
                    </button>
                    <Tabs
                      openedTab={openedTab}
                      data={data}
                      amount={amount}
                      setOpenedTab={setOpenedTab}
                    />

                    <hr className="border-t-4 -mt-7" />

                    <TabContent
                      plans={plans}
                      data={data}
                      openedTab={openedTab}
                      setPlans={setPlans}
                      amount={amount}
                    />

                    <hr className="py-2 z-1" />

                    <Footer />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
