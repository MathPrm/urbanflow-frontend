"use client";

interface StatusMessageProps {
  message: string;
}

export default function StatusMessage({ message }: StatusMessageProps) {
  return (
    <div className="bg-page rounded-2xl p-8 shadow-md text-center text-text-tertiary mt-6 border border-quinary-200">
      <p className="font-lato text-sm">
        {message}
      </p>
    </div>
  );
}