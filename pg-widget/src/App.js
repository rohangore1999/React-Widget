import React from "react";
import * as Sentry from "@sentry/react";

// Components
import OfferWidget from "./containers/OfferWidget";

function App() {
  console.log = console.warn = console.error = () => {};
  return <OfferWidget />;
}

export default Sentry.withProfiler(App);
