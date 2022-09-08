import React from 'react';

export function CopyToClipboard({ text, ...rest }) {
  return (
    <button
      className="conv-btn"
      disabled={!process.browser || !window || !window.navigator.clipboard || !window.navigator.clipboard.writeText}
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