"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="my-16 max-w-6xl mx-auto px-[15px] sm:px-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.push("/")}
          aria-label="Go back"
          className="p-2 cursor-pointer"
        >
          <FaArrowLeft />
        </button>
        <div>
          <p className="text-sm text-gray-600">Fine-tuning</p>
          <h1 className="text-2xl font-bold text-black-100">
            Fine-tune a model
          </h1>
        </div>
      </div>

      <div className="p-6 bg-white rounded-md shadow-md border border-gray-300">
        {children}
      </div>
    </div>
  );
}
