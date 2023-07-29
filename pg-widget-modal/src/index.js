import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Components
import App from "./App";

// Providers
import { MerchantContextProvider } from "./providers/merchant";
import { Helmet } from "react-helmet";

export const CF_Widget = function ({}) {
  let executed = false;

  function load() {
    if (executed) {
      return;
    }

    executed = true;

    const widgetDiv = document.getElementById("cashfree-widget");

    window.addEventListener(
      "message",
      (event) => {
        const merchantData = {
          frameData: event.data.frameDataObj,
          amount: event.data.amount,
          opentab: event.data.opentab,
        };

        ReactDOM.render(
          <MerchantContextProvider value={merchantData}>
            <Helmet>
              <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/index.min.css"
              />
              <script src="https://cdn.tailwindcss.com"></script>

              <script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"></script>

              <link
                href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
                rel="stylesheet"
              />
            </Helmet>
            <App openTab={event.data.opentab} />
          </MerchantContextProvider>,
          widgetDiv
        );
      },
      false
    );
  }

  return {
    //to make function public
    load: load,
  };
};

// so that to call above function in console/script
window["CF_Widget"] = CF_Widget;
