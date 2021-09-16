import React from 'react';


export function CopyToClipboard({ text, ...rest }) {
  if (!process.browser || !window || !window.navigator.clipboard || !window.navigator.clipboard.writeText) return null;

  return (
    <button
      className="conv-btn"
      onClick={() =>
        window.navigator.clipboard.writeText(text).then(
          () => true,
          () => false,
        )
      }
      {...rest}
    >copy to clipboard</button>
  );
}