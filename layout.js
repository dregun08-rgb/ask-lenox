import './globals.css';

export const metadata = {
  title: 'Ask Lenox | Hillside at Lenox',
  description: 'Hillside at Lenox resident digital concierge',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
