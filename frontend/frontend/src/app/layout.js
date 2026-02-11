import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <nav className="bg-white border-b px-4 py-3">
          <h1 className="text-2xl font-bold text-center">Ticket Dashboard</h1>
        </nav>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
