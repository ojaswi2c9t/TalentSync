import type { Metadata } from "next";
import localFont from "next/font/local";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";

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
  title: "TalentSync",
  description: "Interview coding platform",
  icons: {
    icon: "/favicon.ico", // Must be served from public/
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SignedIn>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 px-4 sm:px-6 lg:px-8">{children}</main>
                <footer className="mt-8 py-6 border-t text-center text-sm text-muted-foreground bg-background">
                  <div className="max-w-2xl mx-auto">
                    <h2 className="font-semibold text-lg mb-2">About TalentSync</h2>
                    <p>
                      TalentSync is a modern interview coding platform designed to help teams assess candidates efficiently and effectively.
                      Our mission is to streamline the technical interview process with real-time collaboration and powerful tools.
                    </p>
                    <div className="mt-4">
                      <a
                        href="mailto:support@talentsync.com"
                        className="underline text-primary hover:text-primary/80"
                      >
                        Contact Us: ojaswigahoi@talentsync.com
                      </a>
                    </div>
                  </div>
                </footer>
              </div>
            </SignedIn>

            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
