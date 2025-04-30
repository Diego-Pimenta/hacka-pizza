import { Toast } from "@/components/toast";
import "./globals.css";
import { Poppins, Oleo_Script } from "next/font/google";
import { AuthProvider } from "@/contexts/auth";

const poppis = Poppins({
  subsets: ["latin"],
  variable: "--font-poppis",
  weight: "400",
});
const oleoScript = Oleo_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-oleo",
});

export const metadata = {
  title: "Hacka-Pizza",
  description: "A melhor Pizzaria da cidade",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={`${poppis.className} ${oleoScript.variable}`}>
      <body>
        <AuthProvider>
          <Toast />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
