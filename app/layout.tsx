import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { ModalProvider } from "@/components/modal-provider";
import { cn } from "@/lib/utils";

const NotoSans = Noto_Sans({
  variable: "--font-noto-sans",
  weight: "100",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Speekasy | A modern, real-time chat app",
  description: "Designed for communities, collaboration, and connection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            `${NotoSans.variable} antialiased`,
            "bg-white dark:bg-slate-900"
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
