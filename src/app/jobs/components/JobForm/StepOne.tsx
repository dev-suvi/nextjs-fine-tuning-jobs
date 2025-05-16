import React from "react";
import { UseFormRegister } from "react-hook-form";
import TextInput from "@/components/UI/TextInput";
import SelectInput from "@/components/UI/SelectInput";
import { CreateJobInput } from "@/lib/validation";
import { useModels } from "@/lib/hooks";

interface StepOneProps {
  register: UseFormRegister<CreateJobInput>;
  errors: Partial<Record<keyof CreateJobInput, { message?: string }>>;
}

const StepOne: React.FC<StepOneProps> = ({ register, errors }) => {
  const {
    data: models,
    error: modelsError,
    isLoading: isLoadingModels,
  } = useModels();

  return (
    <>
      <TextInput
        label="Name your job"
        id="name"
        placeholder="Enter job name"
        info="Can only contain lowercase alphanumeric characters and dashes."
        className="mb-8 w-full md:w-md"
        {...register("name")}
        error={errors.name?.message}
      />
      {isLoadingModels ? (
        <p>Loading models...</p>
      ) : modelsError instanceof Error ? (
        <p className="text-red-600 mb-4">{modelsError.message}</p>
      ) : (
        models?.length && (
          <SelectInput
            label="Select base model"
            id="baseModel"
            className="mb-8 w-full md:w-md"
            options={models.map((m) => ({ value: m.id, label: m.displayName }))}
            {...register("baseModel")}
            error={errors.baseModel?.message}
          />
        )
      )}
    </>
  );
};

export default StepOne;
