import "./globals.css";

export const metadata = {
  title: "Transloft - Modern Logistics Solutions",
  description: "Revolutionizing freight and cargo management with smart solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-white min-h-screen'>
        {children}
      </body>
    </html>
  );
}
