import React from "react";
import styles from './CopyButton.module.css';

interface CopyButtonProps {
  textToCopy: string;
}

// Use React.FC<Type> to type functional component
const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => alert(`Copied to clipboard: ${textToCopy}`))
      .catch(error => console.error('Error copying to clipboard:', error));
  };

  return (
    <button className={styles.button} onClick={handleCopyToClipboard}>
      Copy key
    </button>
  );
};

export default CopyButton;
