import "./globals.css"

import Layout from "@/components/layouts/Layout"
import Toaster from "@/components/ui/Toaster"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="relative h-full w-full overflow-auto text-base">
      <body className="relative h-full w-full overflow-auto antialiased">
        <Layout>{children}</Layout>
        <Toaster />
      </body>
    </html>
  )
}
