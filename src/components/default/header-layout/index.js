import React from "react";
import { AppProvider } from "../../../Context/appContext";
import Header from "../default-layout/header";

function HeaderLayout({ children }) {
  return (
    <div>
      <AppProvider>
        <Header />
        <div className="w-2/3 flex justify-center m-auto pt-30  mt-14">
          {children}
        </div>
      </AppProvider>
    </div>
  );
}

export default HeaderLayout;
