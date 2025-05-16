import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import JobForm from "../components/JobForm/JobForm";
import { ApiErrorProvider } from "@/context/ApiErrorContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FORM_STEPS } from "../types";

const mutateAsyncMock = jest.fn().mockResolvedValue({ id: "job-123" });
const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock("@/lib/hooks", () => ({
  ...jest.requireActual("@/lib/hooks"),
  useModels: () => ({
    data: [{ id: "gpt-4", displayName: "GPT-4" }],
    isLoading: false,
    error: null,
  }),
  useCreateJob: () => ({
    mutateAsync: mutateAsyncMock,
  }),
}));

jest.mock("react-hook-form", () => {
  const actual = jest.requireActual("react-hook-form");
  return {
    ...actual,
    useForm: () => {
      const methods = actual.useForm();
      return {
        ...methods,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handleSubmit: (cb: any) => () =>
          cb({
            name: "job-valid",
            baseModel: "gpt-4",
            epochs: 3,
            evaluationEpochs: 1,
            warmupEpochs: 1,
            learningRate: 0.01,
          }),
      };
    },
  };
});

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <ApiErrorProvider>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </ApiErrorProvider>
  );
};

describe("JobForm Integration (submit and step flow)", () => {
  it("renders StepThree preview", () => {
    renderWithProviders(
      <JobForm
        step={FORM_STEPS.REVIEW}
        setStep={jest.fn()}
        buttonText="Start fine-tuning"
      />
    );

    expect(screen.getByText(/configuration/i)).toBeInTheDocument();
  });

  //TODO: throwing an erorr in console
  it.skip("calls useCreateJob and navigates on submit", async () => {
    renderWithProviders(
      <JobForm
        step={FORM_STEPS.REVIEW}
        setStep={jest.fn()}
        buttonText="Start fine-tuning"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /start fine-tuning/i }));

    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });

  it("handles error in onSubmit", async () => {
    mutateAsyncMock.mockRejectedValueOnce(new Error("create failed"));

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    renderWithProviders(
      <JobForm
        step={FORM_STEPS.REVIEW}
        setStep={jest.fn()}
        buttonText="Start fine-tuning"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /start fine-tuning/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Job creation failed:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
