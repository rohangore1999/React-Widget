import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

import { getEMIBankDetails, renderIcon } from "../../utils/common";

const Accordion = ({ plan }) => (
  <Disclosure>
    {({ open }) => (
      <h2 className="accordion-header mb-0" id="headingOne">
        <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-black focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75 items-center">
          <span className="mr-5">
            {renderIcon(plan.nick.split(" ")[0], plan.name)}
          </span>
          <div className="flex-1">
            <span className="w-[50%]">
              {getEMIBankDetails(plan)[0].issuers}
            </span>
          </div>

          {plan.isNoCostEmi ? (
            <span className="bg-blue-500 text-white text-xs mx-2 px-2.5 py-0.5 !uppercase rounded-lg items-end justify-end !text-[10px] !h-fit">
              No cost
            </span>
          ) : (
            ""
          )}
          <ChevronUpIcon
            className={`${open ? "rotate-180 transform" : ""} h-5 w-5 `}
          />
        </Disclosure.Button>
        <Disclosure.Panel>
          <div className="flex flex-col w-full">
            <div className="overflow-x-auto">
              <div className="py-4 inline-block w-full">
                <table className="w-full md:min-w-full text-center">
                  <thead className="border-b bg-gray-200 text-xs">
                    <tr>
                      <th
                        scope="col"
                        className="md:text-sm font-medium text-black px-6 py-4 text-xs"
                      >
                        Months
                      </th>
                      <th
                        scope="col"
                        className="md:text-sm font-medium text-black px-6 py-4 text-xs"
                      >
                        Interest
                      </th>
                      <th
                        scope="col"
                        className="md:text-sm font-medium text-black px-6 py-4 text-xs"
                      >
                        Monthly EMI
                      </th>
                      <th
                        scope="col"
                        className="md:text-sm font-medium text-black px-6 py-4 text-xs"
                      >
                        Overall Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan &&
                      plan.schemes.map((planRow, idx) => (
                        <tr
                          className={`${
                            planRow.interest === 0 ? "bg-blue-50" : "bg-white"
                          }  border-b`}
                          key={idx}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                            {planRow.months}
                          </td>
                          <td className="text-xs md:text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {planRow.interest}%
                          </td>
                          <td className="text-xs md:text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ₹{planRow.emiAmount.toLocaleString("en-US")}
                          </td>
                          <td className="text-xs md:text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            ₹{planRow.totalAmount.toLocaleString("en-US")}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Disclosure.Panel>
      </h2>
    )}
  </Disclosure>
);

export default Accordion;
