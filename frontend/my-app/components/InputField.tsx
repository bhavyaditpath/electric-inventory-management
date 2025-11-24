"use client";

interface InputProps {
  label: string;
  type?: string;
  value: any;
  onChange: (e: any) => void;
}

export default function InputField({ label, type = "text", value, onChange }: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded-md focus:outline-blue-500"
      />
    </div>
  );
}
