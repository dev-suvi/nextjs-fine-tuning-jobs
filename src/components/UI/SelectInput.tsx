// /components/SelectInput.tsx
import React from "react";

interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  error,
  className,
  ...props
}) => {
  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium mb-2" htmlFor={props.id}>
        {label}
      </label>
      <select
        {...props}
        className={`w-full rounded-md border px-3 py-2 bg-white focus:outline-none focus:ring-2 text-sm ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-indigo-500"
        }`}
      >
        <option value="">Select an option</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectInput;
