"use client";

import React from "react";
import { useApiError } from "@/context/ApiErrorContext";
import ErrorBanner from "./ErrorBanner";

export default function GlobalErrorHandler() {
  const { error, setError } = useApiError();

  if (!error) return null;

  return <ErrorBanner message={error} onClose={() => setError(null)} />;
}
