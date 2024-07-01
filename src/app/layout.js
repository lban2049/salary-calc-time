// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Inter } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/workforit.svg" />
        <title>WorkForIt</title>
      </head>
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <div className="flex flex-col min-h-screen">
          <header className="bg-background border-b px-4 md:px-6 flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <TimerIcon className="w-6 h-6" />
              <span className="text-lg font-semibold">WorkForIt</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium hover:underline"
                prefetch={false}
              >
                Home
              </Link>
              <Link
                href="/setting"
                className="text-sm font-medium hover:underline"
                prefetch={false}
              >
                Settings
              </Link>
            </nav>
          </header>
          {children}
          <footer className="bg-muted p-4 md:p-6 text-center text-muted-foreground">
            <p>&copy; 2024 WorkForIt. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function TimerIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="14" y1="2" y2="2" />
      <line x1="12" x2="15" y1="14" y2="11" />
      <circle cx="12" cy="14" r="8" />
    </svg>
  )
}
