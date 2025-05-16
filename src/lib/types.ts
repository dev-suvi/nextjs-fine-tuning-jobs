export interface Job {
  id: string;
  name: string;
  baseModel: string;
  epochs: number;
  evaluationEpochs: number;
  warmupEpochs: number;
  learningRate: number;
  createdAt: number;
  status: "Running" | "Completed" | "Failed";
}

export interface Model {
  id: string;
  displayName: string;
}

export interface JobsResponse {
  jobs: Job[];
  summary: {
    totalCompleted: number;
    totalRunning: number;
    totalFailed: number;
  };
}
