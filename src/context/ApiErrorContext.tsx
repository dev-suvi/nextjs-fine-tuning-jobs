"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ApiErrorContextValue {
  error: string | null;
  setError: (message: string | null) => void;
}

const ApiErrorContext = createContext<ApiErrorContextValue | undefined>(
  undefined
);

export function ApiErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  return (
    <ApiErrorContext.Provider value={{ error, setError }}>
      {children}
    </ApiErrorContext.Provider>
  );
}

export function useApiError() {
  const context = useContext(ApiErrorContext);
  if (!context)
    throw new Error("useApiError must be used within ApiErrorProvider");
  return context;
}
