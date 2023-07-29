import React, { useState } from "react";

// Components
import OffersContent from "../../components/OffersContent";
import PayLaterContent from "../../components/PayLaterContent";
import EmiContent from "../../components/EmiContent";

// Utils
import { getEmiPlanSequence, renderIcon } from "../../utils/common";

function TabContent({ data, openedTab, plans, setPlans }) {
  const ccEMIPlansSequence = getEmiPlanSequence(data.emiDetails.ccEMIPlans);

  const [activePlan, setActivePlan] = useState(
    data.emiDetails.dcEMIPlans.length !== 0 && ccEMIPlansSequence[0].name
  );

  return (
    <div className="tab-content" id="tabs-tabContent3">
      {/* Offers */}
      <OffersContent
        openedTab={openedTab}
        data={data}
        renderIcon={renderIcon}
      />

      {/* Pay Later */}
      <PayLaterContent
        openedTab={openedTab}
        data={data}
        renderIcon={renderIcon}
      />

      {/* EMI */}
      <EmiContent
        openedTab={openedTab}
        data={data}
        activePlan={activePlan}
        plans={plans}
        setActivePlan={setActivePlan}
        setPlans={setPlans}
      />
    </div>
  );
}

export default TabContent;
