import React from "react";

// Components
import Accordion from "components/Accordion";

// Utils
import { getEmiPlanSequence } from "utils/common";

function EmiAccordion({ data, handleClick, plans }) {
  const ccEMIPlansSequence = getEmiPlanSequence(data.emiDetails.ccEMIPlans);

  const dcEMIPlansSequence = getEmiPlanSequence(data.emiDetails.dcEMIPlans);

  return (
    <div className="md:hidden accordion" id="accordionExample">
      <div className="accordion-item bg-white border border-gray-200">
        <div className="flex flex-col mt-2 overflow-y-scroll max-h-96 md:w-1/3 w-full">
          {/* for credit card */}
          {ccEMIPlansSequence.map((plan, idx) => (
            <div
              onClick={() => handleClick(plan)}
              key={idx}
              className={`flex flex-col p-5 justify-between px-2 cursor-pointer hover:bg-gray-100 !border-b`}
            >
              <Accordion plan={plan} />
            </div>
          ))}

          {/* for debit card */}
          {dcEMIPlansSequence.map((plan, idx) => (
            <div
              onClick={() => handleClick(plan)}
              key={idx}
              className={`flex flex-col p-5 justify-between px-2 cursor-pointer hover:bg-gray-100 !border-b`}
            >
              <Accordion plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmiAccordion;
