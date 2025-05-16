import { z } from "zod";

export const jobNameSchema = z
  .string()
  .min(3, "Job name must be at least 3 characters")
  .max(50, "Job name must be at most 50 characters")
  .regex(
    /^[a-zA-Z0-9-]+$/,
    "Job name can only contain alphanumeric characters and dashes"
  );

export const learningRateSchema = z
  .number()
  .min(0.0000001, "Learning rate must be greater than 0")
  .max(1, "Learning rate must be less than or equal to 1");

export const epochsSchema = z
  .number()
  .int("Must be an integer")
  .min(1, "Must be at least 1");

export const createJobSchema = z
  .object({
    name: jobNameSchema,
    baseModel: z.string().min(1, "Base model must be selected"),
    epochs: epochsSchema,
    evaluationEpochs: epochsSchema,
    warmupEpochs: epochsSchema,
    learningRate: learningRateSchema,
  })
  .refine((data) => data.evaluationEpochs <= data.epochs, {
    message: "Evaluation epochs must be less than or equal to training epochs",
    path: ["evaluationEpochs"],
  })
  .refine((data) => data.warmupEpochs <= data.epochs, {
    message: "Warm-up epochs must be less than or equal to training epochs",
    path: ["warmupEpochs"],
  })
  .refine((data) => data.evaluationEpochs + data.warmupEpochs <= data.epochs, {
    message:
      "Sum of evaluation epochs and warm-up epochs must not exceed total epochs",
    path: ["epochs"],
  });

export type CreateJobInput = z.infer<typeof createJobSchema>;
