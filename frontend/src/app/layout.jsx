import "./globals.css";

export const metadata = {
  title: "Hacka-Pizza",
  description: "A melhor Pizzaria da cidade",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
