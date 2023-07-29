import React from "react";
import ReactDOM from "react-dom";
import { Helmet } from "react-helmet";
import "./index.css";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// Component
import App from "./App";

// Providers
import { MerchantContextProvider } from "./providers/merchant";

Sentry.init({
  dsn: "https://f692341e088742a4976b181239997add@o330525.ingest.sentry.io/4504672514670592",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

export const CF_Widget = function () {
  let executed = false;

  function load() {
    if (executed) {
      return;
    }

    executed = true;

    const widgetDiv = document.getElementById("cashfree-widget");

    window.addEventListener("message", (event) => {
      const merchantData = {
        frameData: event.data.frameDataObj,
        amount: event.data.amount,
        appId: event.data.appId,
      };

      ReactDOM.render(
        <MerchantContextProvider value={merchantData}>
          <Helmet>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/index.min.css"
            />
            <link
              href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
              rel="stylesheet"
            />

            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"></script>
          </Helmet>

          <App />
        </MerchantContextProvider>,
        widgetDiv
      );
    });
  }

  return {
    //to make function public
    load,
  };
};

// so that to call above function in console/script
window["CF_Widget"] = CF_Widget;
