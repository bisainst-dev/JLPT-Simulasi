import React from "react";

interface FuriganaTextProps {
  text: string;
  className?: string;
}

export const FuriganaText: React.FC<FuriganaTextProps> = ({ text, className = "" }) => {
  return (
    <span
      className={`inline-block leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};
