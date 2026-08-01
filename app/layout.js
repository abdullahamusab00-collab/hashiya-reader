export const metadata = {
  title: 'Hashiya Reader',
  description: 'Sequential Translation Tool',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#fafafa', color: '#111' }}>
        {children}
      </body>
    </html>
  );
}
