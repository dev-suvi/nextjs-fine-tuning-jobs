import TextInput from "@/components/UI/TextInput";
import { CreateJobInput } from "@/lib/validation";
import React from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

interface StepTwoProps {
  register: UseFormRegister<CreateJobInput>;
  errors: Partial<Record<keyof CreateJobInput, { message?: string }>>;
  watch: UseFormWatch<CreateJobInput>;
}

const StepTwo: React.FC<StepTwoProps> = ({ register, errors, watch }) => {
  const epochs = watch("epochs");
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <TextInput
          label="Training Epochs"
          id="epochs"
          type="number"
          inputClassName="w-32"
          {...register("epochs", { valueAsNumber: true })}
          error={errors.epochs?.message}
          min={0}
        />
        <TextInput
          label="Evaluation Epochs"
          id="evaluationEpochs"
          type="number"
          inputClassName="w-32"
          {...register("evaluationEpochs", { valueAsNumber: true })}
          error={errors.evaluationEpochs?.message}
          min={0}
          max={epochs}
        />
        <TextInput
          label="Warm-up Epochs"
          id="warmupEpochs"
          type="number"
          inputClassName="w-32"
          {...register("warmupEpochs", { valueAsNumber: true })}
          error={errors.warmupEpochs?.message}
          min={0}
          max={epochs}
        />
        <TextInput
          label="Learning Rate"
          id="learningRate"
          step={0.0001}
          {...register("learningRate", { valueAsNumber: true })}
          error={errors.learningRate?.message}
          min={0}
          max={1}
        />
      </div>
    </>
  );
};

export default StepTwo;
