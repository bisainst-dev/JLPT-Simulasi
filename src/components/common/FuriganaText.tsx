'use client';

import React from 'react';

interface FuriganaTextProps {
  text?: string | null;
  className?: string;
  showFurigana?: boolean;
}

/**
 * Parses custom bracket syntax: [漢字|かんじ]
 * and converts to HTML5 <ruby>漢字<rt>かんじ</rt></ruby>
 * Also handles standard linebreaks and text.
 */
export default function FuriganaText({
  text,
  className = '',
  showFurigana = true,
}: FuriganaTextProps) {
  if (!text) return null;

  // Pattern matches [Kanji|Reading] or [漢字|かんじ]
  const pattern = /\[([^|\]]+)\|([^\]]+)\]/g;

  if (!showFurigana) {
    // Strip ruby, display only base kanji
    const cleanText = text.replace(pattern, '$1');
    return <span className={className}>{cleanText}</span>;
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex, match.index)}
        </span>
      );
    }

    const kanji = match[1];
    const ruby = match[2];

    parts.push(
      <ruby
        key={`ruby-${match.index}`}
        className="inline-flex flex-col items-center leading-tight mx-[1px]"
      >
        <span className="text-base">{kanji}</span>
        <rt className="text-[10px] text-maroon-700 font-medium select-none transform -translate-y-[2px]">
          {ruby}
        </rt>
      </ruby>
    );

    lastIndex = pattern.lastIndex;
  }

  // Add remaining trailing text
  if (lastIndex < text.length) {
    parts.push(
      <span key={`text-end-${lastIndex}`}>
        {text.substring(lastIndex)}
      </span>
    );
  }

  return (
    <span className={`inline-block leading-relaxed ${className}`}>
      {parts.map((p, idx) => (
        <React.Fragment key={idx}>{p}</React.Fragment>
      ))}
    </span>
  );
}
