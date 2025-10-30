import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { QueryProvider } from "~/components/providers/QueryProvider";
import { MuiProvider } from "~/components/providers/MuiProvider";

export const metadata: Metadata = {
  title: "Kanban Task Board - Mind Luster",
  description: "A beautiful Kanban-style task management dashboard",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={geist.className}>
        <QueryProvider>
          <MuiProvider>{children}</MuiProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
