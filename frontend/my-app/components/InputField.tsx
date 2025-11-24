"use client";

interface InputProps {
  label: string;
  type?: string;
  value: any;
  onChange: (e: any) => void;
  step?: string;
  required?: boolean;
}

export default function InputField({ label, type = "text", value, onChange, step, required }: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        step={step}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
    </div>
  );
}
