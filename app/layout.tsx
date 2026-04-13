import { Provider } from "@/utils/provider";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <html lang="en">
               <body>
                    <Provider>{children}</Provider>
               </body>
          </html>
     );
}
