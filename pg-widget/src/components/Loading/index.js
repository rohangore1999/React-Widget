import React from "react";

function Loading() {
  return (
    <div className="animate-pulse flex flex-col space-y-3">
      <div className="bg-gray-300 h-2 rounded w-4/12"></div>
      <div className="bg-gray-300 h-2 rounded w-3/5"></div>
      <div className="bg-gray-300 h-2 rounded w-1/2"></div>
    </div>
  );
}

export default Loading;
