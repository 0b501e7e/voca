import React from "react";
import styles from "./Page.module.css";

const DocumentationPage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Documentation</h1>
        <p className={styles.infoParagraph}>
          Explore detailed documentation about our project, including guides, API references, and more.
        </p>
      </header>
      <main>
        <section className={styles.infoSection}>
          <div className={styles.infoDiv}>
            <h2>Getting Started</h2>
            <p>Learn how to get started with our project, from initial setup to first deployment.</p>
          </div>
          <div className={styles.infoDiv}>
            <h2>API Reference</h2>
            <p>Detailed descriptions of APIs, including endpoints, request types, and response formats.</p>
          </div>
          <div className={styles.infoDiv}>
            <h2>Examples</h2>
            <p>Practical examples and code snippets to help you understand how to use our platform effectively.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DocumentationPage;
