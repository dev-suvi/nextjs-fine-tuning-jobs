import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import JobForm from "../components/JobForm/JobForm";
import { ApiErrorProvider } from "@/context/ApiErrorContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FORM_STEPS } from "../types";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@/lib/hooks", () => ({
  ...jest.requireActual("@/lib/hooks"),
  useModels: () => ({
    data: [{ id: "gpt-4", displayName: "GPT-4" }],
    isLoading: false,
    error: null,
  }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <ApiErrorProvider>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </ApiErrorProvider>
  );
};

describe("JobForm Validation", () => {
  it("shows validation error on invalid StepOne job name", async () => {
    renderWithProviders(
      <JobForm step={FORM_STEPS.SETUP} setStep={jest.fn()} buttonText="Next" />
    );

    const input = screen.getByLabelText(/name your job/i);
    fireEvent.change(input, { target: { value: "!!invalid" } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(
        screen.getByText(/can only contain alphanumeric/i)
      ).toBeInTheDocument();
    });
  });
});
