"use client";

import React, { useMemo, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import JobForm from "../components/JobForm/JobForm";
import { FORM_STEPS, FormStep, StepConfig } from "../types";

const STEP_CONTENT: Record<FormStep, StepConfig> = {
  [FORM_STEPS.SETUP]: {
    heading: "Setup your run",
    buttonText: "Next: Configure",
  },
  [FORM_STEPS.CONFIGURE]: {
    heading: "Configure your run",
    subheading:
      "Adjust these parameters to control how your model learns, balances performance, and prevents overfitting during fine-tuning. See the docs for guidance on setting these parameters for optimal fine-tuning.",
    buttonText: "Next: Review Your Job",
  },
  [FORM_STEPS.REVIEW]: {
    heading: "Review Your Job",
    buttonText: "Start fine-tuning",
  },
};

const CreateJob: React.FC = () => {
  const [step, setStep] = useState<FormStep>(FORM_STEPS.SETUP);

  const currentStepConfig = useMemo(() => STEP_CONTENT[step], [step]);

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, FORM_STEPS.SETUP) as FormStep);
  };

  const onSetStep = () =>
    setStep((prev) => Math.min(prev + 1, FORM_STEPS.REVIEW) as FormStep);

  return (
    <>
      <div className="w-full flex justify-between items-start mb-6">
        <div className="flex flex-grow">
          {step > FORM_STEPS.SETUP && (
            <button
              onClick={handleBack}
              aria-label="Go back"
              className="mr-5 mt-2 cursor-pointer inline-flex"
            >
              <FaLongArrowAltLeft />
            </button>
          )}
          <div>
            <h1 className="text-2xl inline">{currentStepConfig.heading}</h1>
            {currentStepConfig.subheading && (
              <p className="pr-12 text-sm text-gray-500">
                {currentStepConfig.subheading}
              </p>
            )}
          </div>
        </div>
        <p className="w-16 text-gray-500">
          <span className="text-black">{step}</span> of 3
        </p>
      </div>
      <JobForm
        step={step}
        setStep={onSetStep}
        buttonText={currentStepConfig.buttonText}
      />
    </>
  );
};

export default CreateJob;
