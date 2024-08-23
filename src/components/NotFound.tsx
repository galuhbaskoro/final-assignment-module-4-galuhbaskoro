import React from "react";

const NotFound: React.FC = () => {
  return(
    <div className="flex flex-row w-full px-5 py-5 justify-items-center">
      <div className="flex flex-wrap flex-row w-full p-8 justify-center bg-white border border-gray-200 rounded-lg shadow-md z-50">
        <h1 className="text-3xl text-center">EROR 404</h1>
      </div>
    </div>
  );
};

export default NotFound;
