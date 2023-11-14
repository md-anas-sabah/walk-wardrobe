"use client";

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [commonLoader, setCommonLoader] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(Cookies.get("token"));
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      // const getCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      setUser(userData);
      // setCartItems(getCartItems);
    } else {
      setIsAuthUser(false);
      setUser({});
    }
  }, [Cookies]);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        commonLoader,
        setCommonLoader,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
