import React from "react";
import styles from "./BaseLayout.module.scss";
import Header from "../Header";
import Footer from "../Footer";

const BaseLayout = ({ children }) => {
  return (
    <div className={styles['page-container']}>
      <Header />
      <main className={styles.page}>
        
        <div >
            {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
