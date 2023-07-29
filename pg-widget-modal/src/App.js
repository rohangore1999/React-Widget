import React from "react";

// Components
import OfferWidget from "./containers/OfferWidget";

function App({ openTab }) {
  console.log = console.warn = console.error = () => {};
  return <OfferWidget openTab={openTab} />;
}

export default App;
