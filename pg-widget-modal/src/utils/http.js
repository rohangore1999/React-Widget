import axios from "axios";
import _get from "lodash/get";

// Utils
import { getBaseURL } from "./common";

const instance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function beforeRequest(config) {
    return config;
  },
  function afterRequest(error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function successResponse(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger

    return response.data;
  },
  function errorResponse(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const message = _get(error, "response.data.message");
    const statusCode = _get(error, "response.status");

    const { LEGACY_APP: legacyUrl, NODE_ENV: env } = process.env;

    if ((env !== "development" && statusCode === 401) || message === "") {
      window.location = legacyUrl;
      return;
    }

    if (statusCode >= 500) {
      console.error("Something went wrong. Try again after some time.");
    } else if (message !== "resource not found") {
      console.error(message);
    }

    return Promise.reject(error.response.data);
  }
);

export default instance;
