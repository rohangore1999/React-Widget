let isWebappjs = false;
let frameDataObj;
let widgetConfigObj;

// For Woocommerce
window.addEventListener("load", function () {
  if (isWebappjs) return;
  // from Iframes
  const iframeDiv = document.getElementById("cashfree-widget");

  if (!iframeDiv) return;

  const oldIframe = document.getElementById("cf-iframe");

  if (oldIframe) {
    oldIframe.parentElement.removeChild(oldIframe);
  }

  // API call
  const getData = async () => {
    if (
      (iframeDiv.dataset.isoffers === "no" &&
        iframeDiv.dataset.ispaylater === "no" &&
        iframeDiv.dataset.isemi === "no") ||
      !iframeDiv.dataset.amount ||
      iframeDiv.dataset.amount === "" ||
      iframeDiv.dataset.appid.includes("data") ||
      iframeDiv.dataset.appid === ""
    ) {
      return;
    }

    const response = await fetch(
      `https://receiver.cashfree.com/pgnextgenconsumer/uiapi/external/merchants/offers?appId=${iframeDiv.dataset.appid}&amount=${iframeDiv.dataset.amount}`,
      {
        method: "POST",
        body: JSON.stringify({
          isOffer: iframeDiv.dataset.isoffers === "yes" ? true : false,
          isPayLater: iframeDiv.dataset.ispaylater === "yes" ? true : false,
          isEMIPlans:
            iframeDiv.dataset.amount > 2500 && iframeDiv.dataset.isemi === "yes"
              ? true
              : false,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const frameData = await response.json();

    return frameData;
  };

  // dynamic iframes
  const iframe = document.createElement("iframe");

  if (
    (iframeDiv.dataset.isoffers === "no" &&
      iframeDiv.dataset.ispaylater === "no" &&
      iframeDiv.dataset.isemi === "no") ||
    !iframeDiv.dataset.amount ||
    iframeDiv.dataset.amount === "" ||
    iframeDiv.dataset.appid.includes("data") ||
    iframeDiv.dataset.appid === ""
  ) {
    iframe.style.display = "none";
  }

  iframe.src = "https://cf-widget-frame.cashfree.com/"; // hosted bundle of our UI
  iframe.id = "cf-iframe";
  iframe.loading = "eager";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  iframe.onload = async () => {
    frameDataObj = await getData();

    if (
      frameDataObj.statusCode ||
      (frameDataObj.offerDetails.offers.length === 0 &&
        frameDataObj.payLaters.length === 0 &&
        frameDataObj.emiDetails.ccEMIPlans.length === 0 &&
        frameDataObj.emiDetails.dcEMIPlans.length === 0)
    ) {
      iframe.style.display = "none";
    }

    iframe.contentWindow.postMessage(
      {
        frameDataObj: frameDataObj,
        amount: iframeDiv.dataset.amount,
        appId: iframeDiv.dataset.appid,
      },
      "https://cf-widget-frame.cashfree.com/"
    );
  };

  iframeDiv.appendChild(iframe);

  const oldIframeDetails = document.getElementById("cf-iframe-details");

  if (oldIframeDetails) {
    oldIframeDetails.parentElement.removeChild(oldIframeDetails);
  }

  // dynamic iframes
  const iframeDetails = document.createElement("iframe");

  iframeDetails.src = "https://cf-widget-detailframe.cashfree.com/"; // hosted bundle of our UI
  iframeDetails.id = "cf-iframe-details";
  iframeDetails.loading = "eager";
  iframeDetails.style.width = "100%";
  iframeDetails.style.height = "100vh";
  iframeDetails.style.border = "none";
  iframeDetails.style.zIndex = "99999";
  iframeDetails.style.position = "fixed";
  iframeDetails.style.top = "0px";
  iframeDetails.style.left = "0px";
  iframeDetails.style.display = "none";

  iframeDiv.appendChild(iframeDetails);

  window.onmessage = function (e) {
    if (e.data.isModelOpen) {
      iframeDetails.style.display = "block";
      // const oldIframeDetails = document.getElementById("cf-iframe-details");

      // if (oldIframeDetails) {
      //   oldIframeDetails.parentElement.removeChild(oldIframeDetails);
      // }

      // // dynamic iframe
      // const iframeDetails = document.createElement("iframe");

      // iframeDetails.src = "https://cf-widget-detailframe.cashfree.com/"; // hosted bundle of our UI
      // iframeDetails.loading = "lazy";
      // iframeDetails.id = "cf-iframe-details";
      // iframeDetails.style.width = "100%";
      // iframeDetails.style.height = "100%";
      // iframeDetails.style.border = "none";
      // iframeDetails.style.zIndex = "99999";
      // iframeDetails.style.position = "fixed";
      // iframeDetails.style.top = "0px";
      // iframeDetails.style.left = "0px";

      iframeDetails.onload = () => {
        iframeDetails.contentWindow.postMessage(
          {
            opentab: e.data.opentab,
            amount: iframeDiv.dataset.amount,
            frameDataObj: frameDataObj,
          },
          "https://cf-widget-detailframe.cashfree.com/"
        );
      };

      iframeDiv.appendChild(iframeDetails);
    }

    if (e.data.isModelClose) {
      const oldIframeDetails = document.getElementById("cf-iframe-details");

      oldIframeDetails.style.display = "none";
    }
  };
});

// For Native JS and Shopify
const CF_Widget = function ({ amount, shopId }) {
  isWebappjs = true;
  let executed = false;

  function load() {
    if (executed) {
      return;
    }

    executed = true;

    // from Iframes
    const iframeDiv = document.getElementById("cashfree-widget");

    if (!iframeDiv) return;

    const oldIframe = document.getElementById("cf-iframe");

    if (oldIframe) {
      oldIframe.parentElement.removeChild(oldIframe);
    }

    // API calls
    const getData = async () => {
      const [response, widgetConfigResponse] = await Promise.all([
        fetch(
          `https://receiver.cashfree.com/pgnextgenconsumer/uiapi/external/merchant/widget/offer?shopId=${shopId}&amount=${amount}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        ),
        fetch(
          `http://localhost:3000/uiapi/external/merchant/widget/settings?shopId=${shopId}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        ),
      ]);

      const frameData = await response.json();
      const widgetConfig = await widgetConfigResponse.json();

      return [frameData, widgetConfig];
    };

    // dynamic iframes
    const iframe = document.createElement("iframe");

    iframe.src = "https://cf-widget-frame.cashfree.com/"; // hosted bundle of our UI
    iframe.id = "cf-iframe";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.loading = "eager";

    iframe.onload = async () => {
      [frameDataObj, widgetConfigObj] = await getData();

      if (
        frameDataObj.statusCode ||
        (frameDataObj.offerDetails.offers.length === 0 &&
          frameDataObj.payLaters.length === 0 &&
          frameDataObj.emiDetails.ccEMIPlans.length === 0 &&
          frameDataObj.emiDetails.dcEMIPlans.length === 0)
      ) {
        iframe.style.display = "none";
      }

      iframe.contentWindow.postMessage(
        {
          frameDataObj: frameDataObj,
          amount: amount,
          appId: "",
          widgetConfigObj: widgetConfigObj,
        },
        "https://cf-widget-frame.cashfree.com/"
      );
    };

    iframeDiv.appendChild(iframe);

    const oldIframeDetails = document.getElementById("cf-iframe-details");

    if (oldIframeDetails) {
      oldIframeDetails.parentElement.removeChild(oldIframeDetails);
    }

    // dynamic iframes
    const iframeDetails = document.createElement("iframe");

    iframeDetails.src = "https://cf-widget-detailframe.cashfree.com/"; // hosted bundle of our UI
    iframeDetails.id = "cf-iframe-details";
    iframeDetails.loading = "eager";
    iframeDetails.style.width = "100%";
    iframeDetails.style.height = "100vh";
    iframeDetails.style.border = "none";
    iframeDetails.style.zIndex = "99999";
    iframeDetails.style.position = "fixed";
    iframeDetails.style.top = "0px";
    iframeDetails.style.left = "0px";
    iframeDetails.style.display = "none";

    iframeDiv.appendChild(iframeDetails);

    window.onmessage = function (e) {
      if (e.data.isModelOpen) {
        iframeDetails.style.display = "block";

        iframeDetails.onload = () => {
          iframeDetails.contentWindow.postMessage(
            {
              opentab: e.data.opentab,
              amount: amount,
              frameDataObj: frameDataObj,
            },
            "https://cf-widget-detailframe.cashfree.com/"
          );
        };

        iframeDiv.appendChild(iframeDetails);
      }

      if (e.data.isModelClose) {
        const oldIframeDetails = document.getElementById("cf-iframe-details");

        oldIframeDetails.style.display = "none";
      }
    };
  }

  return {
    load,
  };
};

window["CF_Widget"] = CF_Widget;
