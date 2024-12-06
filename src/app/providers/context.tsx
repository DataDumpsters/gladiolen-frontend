"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface AppContextProps {
  basename: string;
}

const AppContext = createContext<AppContextProps | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const contextValue = { basename: "/dashboards/admin" };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
