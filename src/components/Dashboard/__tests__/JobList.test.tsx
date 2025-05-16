import { render, screen, fireEvent } from "@testing-library/react";
import JobList from "../JobList";
import { Job } from "@/lib/types";

const mockJobs: Job[] = [
  {
    id: "job-1",
    name: "Test Job 1",
    status: "Running",
    createdAt: new Date("2025-05-17T10:00:00Z").getTime(),
    baseModel: "",
    epochs: 0,
    evaluationEpochs: 0,
    warmupEpochs: 0,
    learningRate: 0,
  },
  {
    id: "job-2",
    name: "Test Job 2",
    status: "Completed",
    createdAt: new Date("2025-05-17T11:30:00Z").getTime(),
    baseModel: "",
    epochs: 0,
    evaluationEpochs: 0,
    warmupEpochs: 0,
    learningRate: 0,
  },
];

describe("JobList", () => {
  it("renders all jobs with correct info", () => {
    const mockDelete = jest.fn();
    render(<JobList jobs={mockJobs} onDelete={mockDelete} />);

    // Job names
    expect(screen.getByText("Test Job 1")).toBeInTheDocument();
    expect(screen.getByText("Test Job 2")).toBeInTheDocument();

    // Status pills
    expect(screen.getByText("Running")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();

    // Dates rendered inside <NoSSR>, so just check presence of element
    const dateElements = screen.getAllByText(
      (content, el) =>
        el?.tagName.toLowerCase() === "div" && content.includes("2025")
    );
    expect(dateElements.length).toBeGreaterThan(0);
  });

  it("calls onDelete with correct job ID when button is clicked", () => {
    const mockDelete = jest.fn();
    render(<JobList jobs={mockJobs} onDelete={mockDelete} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);
    expect(mockDelete).toHaveBeenCalledWith("job-1");

    fireEvent.click(buttons[1]);
    expect(mockDelete).toHaveBeenCalledWith("job-2");

    expect(mockDelete).toHaveBeenCalledTimes(2);
  });
});
