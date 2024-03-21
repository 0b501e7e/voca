import React from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import type { Metadata } from "next";

// These styles apply to every route in the application
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "VOCCA",
  description: "Zak Smith & Senan Warnock",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
