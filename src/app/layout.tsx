import "./globals.css";
import Header from "../components/Header";
import { Provider } from "./provider";
import { ApiErrorProvider } from "@/context/ApiErrorContext";

export const metadata = {
  title: "AI Fine-Tuning Jobs",
  description: "Manage AI model fine-tuning jobs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <ApiErrorProvider>
          <Provider>
            <Header />
            <main>{children}</main>
          </Provider>
        </ApiErrorProvider>
      </body>
    </html>
  );
}
