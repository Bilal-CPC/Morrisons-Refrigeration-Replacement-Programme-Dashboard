import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Morrisons Refrigeration Transition Programme | CPC Systems',
  description:
    'A live programme management platform giving Morrisons complete visibility of progress, risk, spend, compliance and delivery performance across the national refrigeration replacement programme.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
