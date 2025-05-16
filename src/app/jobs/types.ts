export interface JobState {
  name: string;
  baseModel: string;
  epochs: number;
  evaluationEpochs: number;
  warmupEpochs: number;
  learningRate: number;
}

export const FORM_STEPS = {
  SETUP: 1,
  CONFIGURE: 2,
  REVIEW: 3,
} as const;

export interface StepConfig {
  heading: string;
  buttonText: string;
  subheading?: string;
}

export type FormStep = (typeof FORM_STEPS)[keyof typeof FORM_STEPS];
