import React from "react";

// Components
import EmiAccordion from "../../components/EmiAccordion";

// Utils
import {
  getEMIBankDetails,
  getEmiPlanSequence,
  renderIcon,
} from "../../utils/common";

function EmiContent({
  openedTab,
  data,
  activePlan,
  plans,
  setPlans,
  setActivePlan,
}) {
  const handleClick = (plan) => {
    setPlans(plan);
    setActivePlan(plan.name);
  };

  const ccEMIPlansSequence = getEmiPlanSequence(data.emiDetails.ccEMIPlans);

  const dcEMIPlansSequence = getEmiPlanSequence(data.emiDetails.dcEMIPlans);

  return (
    <div
      className={`tab-pane fade ${
        openedTab === "emiDetails" ? "active show" : "hidden"
      }`}
      id="emiDetails"
      role="tabpanel"
    >
      <div className="hidden md:flex">
        {/* left side - Menu */}

        {/* for credit card */}
        <div className="flex flex-col mt-2 overflow-y-scroll max-h-96 md:w-1/3 w-full mr-2">
          {ccEMIPlansSequence.map((plan) => (
            <div
              onClick={() => handleClick(plan)}
              key={plan.name}
              className={`flex p-5 justify-between px-2 cursor-pointer items-center ${
                activePlan === plan.name && "bg-gray-100"
              } hover:bg-gray-100`}
            >
              <h2
                className={`flex items-center justify-center space-x-2 text-xs text-left w-1/2 ${
                  activePlan === plan.name && "text-purple-500 font-bold"
                }`}
              >
                <span className="text-xs">
                  {renderIcon(plan.nick.split(" ")[0], plan.name)}
                </span>
                <span>{getEMIBankDetails(plan)[0].issuers}</span>
              </h2>

              {plan.isNoCostEmi ? (
                <span className="bg-blue-500 text-white text-xs mx-2 px-2.5 py-0.5 !uppercase rounded-lg items-end justify-end font-bold !text-[8px] !h-fit">
                  No cost
                </span>
              ) : (
                ""
              )}
            </div>
          ))}

          {/* for debit card */}
          {dcEMIPlansSequence.map((plan) => (
            <div
              onClick={() => handleClick(plan)}
              key={plan.name}
              className={`flex p-5 justify-between px-2 cursor-pointer items-center ${
                activePlan === plan.name && "bg-gray-100 text-purple-500"
              } hover:bg-gray-100`}
            >
              <h2
                className={`flex items-center justify-center space-x-2 text-xs text-left ${
                  activePlan === plan.name && "text-purple-500 font-bold"
                }`}
              >
                <span className="w-8">
                  {renderIcon(plan.nick.split(" ")[0], plan.name)}
                </span>
                <span>{getEMIBankDetails(plan)[0].issuers}</span>
              </h2>

              {plan.isNoCostEmi ? (
                <span className="bg-blue-500 text-white text-xs mx-2 px-2.5 !uppercase py-0.5 rounded-lg items-end justify-end !text-[8px] !h-fit">
                  No cost
                </span>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>

        {/* right side - Table */}
        <div className="hidden md:flex md:flex-1 overflow-y-scroll max-h-96 ">
          <div className="flex flex-col w-full">
            <div className="overflow-x-auto">
              <div className="py-4 inline-block w-full">
                <div className="overflow-hidden">
                  <table className="w-full md:min-w-full text-center">
                    <thead className="border-b bg-gray-200">
                      <tr className="!rounded-md">
                        <th
                          scope="col"
                          className="text-sm font-medium text-black px-6 py-4 rounded-l-md"
                        >
                          Months
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-black px-6 py-4"
                        >
                          Interest
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-black px-6 py-4"
                        >
                          Monthly EMI
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-black px-6 py-4 rounded-r-md"
                        >
                          Overall Cost
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {plans &&
                        plans.schemes.map((planRow) => (
                          <tr
                            className={`${
                              planRow.interest === 0 ? "bg-blue-50" : "bg-white"
                            }  border-b`}
                            key={planRow.months}
                          >
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {planRow.months}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {planRow.interest}%
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              ₹{planRow.emiAmount.toLocaleString("en-US")}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              ₹{planRow.totalAmount.toLocaleString("en-US")}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion - for Mobile View */}
      <EmiAccordion data={data} handleClick={handleClick} plans={plans} />
    </div>
  );
}

export default EmiContent;
