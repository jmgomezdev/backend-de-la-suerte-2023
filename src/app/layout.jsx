import Providers from "../components/Providers";
import "../styles/global.css";
import "../styles/tailwind.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-gray-100">
        {" "}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
