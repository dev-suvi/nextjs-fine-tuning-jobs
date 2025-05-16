// /components/TextInput.tsx
import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  info?: string;
  error?: string;
  className?: string;
  type?: string;
  inputClassName?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  info,
  error,
  type = "text",
  className,
  inputClassName,
  ...props
}) => {
  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium mb-2" htmlFor={props.id}>
        {label}
      </label>
      <input
        {...props}
        type={type}
        className={`${
          inputClassName ? inputClassName : `w-full`
        } rounded-md border px-3 py-2 focus:outline-none focus:ring-2 text-sm ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-indigo-500"
        }`}
      />
      {info && <p className="text-gray-500 text-xs py-2">{info}</p>}
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
