import React from "react";
import { JobState } from "../../types";
import SummaryCardItem from "@/components/SummaryCardItem";
import { FaRegMessage, FaScrewdriverWrench } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";

interface StepThreeProps {
  job: JobState;
}

const StepThree: React.FC<StepThreeProps> = ({ job }) => (
  <>
    <div className="space-y-2">
      <SummaryCardItem
        icon={<FaScrewdriverWrench className="w-5 h-5 text-gray-500" />}
        title={job.name}
      />
      <SummaryCardItem
        icon={<FaRegMessage className="w-5 h-5 text-gray-500" />}
        title={"Model"}
        subtitle={job.baseModel}
      />
      <SummaryCardItem
        icon={<FiSettings className="w-5 h-5 text-gray-500" />}
        title={"Configuration"}
        subtitle={`Epochs: ${job.epochs} • Eval Epochs: ${job.evaluationEpochs} • Warmup Epochs: ${job.warmupEpochs} • Learning rate:${job.learningRate}`}
      />
    </div>
  </>
);

export default StepThree;
