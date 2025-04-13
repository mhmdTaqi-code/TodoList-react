import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { createContext, useState, useContext } from "react";

const tosot = createContext();

export const ToastProvider = ({ children }) => {
  const [opentost, setopentost] = useState(false);
  const [massge, setmassge] = useState("");
  const handleClicktosot = (newmassge) => {
    setmassge(newmassge);
    setopentost(true);
  };

  return (
    <>
      {/* tosot */}
      <div>
        <Snackbar
          open={opentost}
          autoHideDuration={3000} // يغلق تلقائيًا بعد 3 ثوانٍ
          onClose={() => {
            setopentost(false);
          }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => {
              setopentost(false);
            }}
            severity="success"
            variant="filled"
          >
            {massge}
          </Alert>
        </Snackbar>
      </div>
      <tosot.Provider
        value={{ opentost, setopentost, handleClicktosot, children }}
      >
        {children}
      </tosot.Provider>
    </>
  );
};

export const Usetostcontext = () => {
  return useContext(tosot);
};
