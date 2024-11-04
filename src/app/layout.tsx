import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import "@/styles/texts.css";
import "@/styles/buttons.css";
import "@/styles/layout.css";
import FinancialModelProvider from "@/providers/financial-model-provider";
import SocietalModelProvider from "@/providers/societal-model-provider";
import EnvironmentalModelProvider from "@/providers/environmental-model-provider";
import ModelResultProvider from "@/providers/model-result-provider";
import RioModelProvider from "@/providers/rio-model-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cost Benefit Model",
  description: "Cost benefit model beyond financials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <EnvironmentalModelProvider>
          <SocietalModelProvider>
            <FinancialModelProvider>
              <RioModelProvider>
                <ModelResultProvider>{children}</ModelResultProvider>
              </RioModelProvider>
            </FinancialModelProvider>
          </SocietalModelProvider>
        </EnvironmentalModelProvider>
      </body>
    </html>
  );
}
