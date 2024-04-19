import React from "react";
import styles from './CopyButton.module.css';
<script src="https://kit.fontawesome.com/3b64478586.js" crossorigin="anonymous"></script>


interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert(`Copied to clipboard: ${textToCopy}`);
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  };

  return (
    <button className={styles.button} onClick={handleCopyToClipboard}>
      <i class="fa-regular fa-clipboard"></i>
    </button>
  );
};


export default CopyButton;
