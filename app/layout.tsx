import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BrickBase — Every builder floor in Faridabad',
  description:
    "300+ buildings. 900+ floors. All of Faridabad's builder floors, right in your phone. Scroll, shortlist, visit only what you love.",
  metadataBase: new URL('https://brickbase.co.in'),
  openGraph: {
    title: 'BrickBase — Every builder floor in Faridabad',
    description:
      "300+ buildings. 900+ floors. Scroll, shortlist, visit only what you love.",
    url: 'https://brickbase.co.in',
    siteName: 'BrickBase',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
