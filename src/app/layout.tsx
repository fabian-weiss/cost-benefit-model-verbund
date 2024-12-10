import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import "@/styles/texts.css";
import "@/styles/buttons.css";
import "@/styles/layout.css";
import "@/styles/table.css";
import FinancialModelProvider from "@/providers/financial-model-provider";
import SocietalModelProvider from "@/providers/societal-model-provider";
import EnvironmentalModelProvider from "@/providers/environmental-model-provider";
import ModelResultProvider from "@/providers/model-result-provider";
import RioModelProvider from "@/providers/rio-model-provider";
import CommentProvider from "@/providers/comment-provider";
import DescriptionDialogProvider from "@/providers/description-dialog-provider";
import OverviewProvider from "@/providers/overview-provider";

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
        <OverviewProvider>
          <EnvironmentalModelProvider>
            <SocietalModelProvider>
              <FinancialModelProvider>
                <RioModelProvider>
                  <ModelResultProvider>
                    <CommentProvider>
                      <DescriptionDialogProvider>
                        {children}
                      </DescriptionDialogProvider>
                    </CommentProvider>
                  </ModelResultProvider>
                </RioModelProvider>
              </FinancialModelProvider>
            </SocietalModelProvider>
          </EnvironmentalModelProvider>
        </OverviewProvider>
      </body>
    </html>
  );
}
