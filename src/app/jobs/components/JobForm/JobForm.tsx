"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/UI/Button";

import { useCreateJob } from "@/lib/hooks";
import { CreateJobInput, createJobSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { FormStep, JobState } from "../../types";

interface JobFormSteps {
  step: FormStep;
  setStep: () => void;
  buttonText: string;
}

const FORM_STEPS = {
  SETUP: 1,
  CONFIGURE: 2,
  REVIEW: 3,
} as const;

const DEFAULT_VALUES: CreateJobInput = {
  name: "",
  baseModel: "",
  epochs: 1,
  evaluationEpochs: 1,
  warmupEpochs: 1,
  learningRate: 0.01,
};

const JobForm: React.FC<JobFormSteps> = ({ step, setStep, buttonText }) => {
  const router = useRouter();
  const [jobPreview, setJobPreview] = useState<JobState>({
    ...DEFAULT_VALUES,
    evaluationEpochs: 0,
    warmupEpochs: 0,
  });

  const createJobMutation = useCreateJob();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<CreateJobInput>({
    resolver: zodResolver(createJobSchema),
    mode: "all",
    defaultValues: DEFAULT_VALUES,
  });

  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    const fieldsToValidate: (keyof CreateJobInput)[] =
      step === FORM_STEPS.SETUP
        ? ["name", "baseModel"]
        : step === FORM_STEPS.CONFIGURE
        ? ["epochs", "evaluationEpochs", "warmupEpochs", "learningRate"]
        : [];

    return await trigger(fieldsToValidate);
  }, [step, trigger]);

  const handleNext = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const isValid = await validateCurrentStep();
    if (!isValid) return;

    if (step === FORM_STEPS.CONFIGURE) {
      const values = watch();
      setJobPreview(values);
    }

    setStep();
  };

  const renderStep = () => {
    switch (step) {
      case FORM_STEPS.SETUP:
        return <StepOne register={register} errors={errors} />;
      case FORM_STEPS.CONFIGURE:
        return <StepTwo register={register} errors={errors} watch={watch} />;
      case FORM_STEPS.REVIEW:
        return <StepThree job={jobPreview} />;
      default:
        return null;
    }
  };

  const onSubmit = async (data: CreateJobInput) => {
    try {
      await createJobMutation.mutateAsync(data);
      router.push("/");
    } catch (error) {
      console.error("Job creation failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {renderStep()}
      <div className="flex mt-6">
        {step !== FORM_STEPS.REVIEW ? (
          <Button type="button" onClick={handleNext} disabled={isSubmitting}>
            {buttonText}
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </form>
  );
};

export default JobForm;
