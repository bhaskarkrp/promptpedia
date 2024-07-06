import Loader from "@components/Loader";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { ReactNode, Suspense } from "react";

export const metadata = {
  title: "Promptpedia",
  description: "Discover and share AI Prompt",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main" key="main">
            <div className="gradient" key="gradient" />
          </div>

          <main className="app" key="app">
            <Suspense fallback={<Loader />}>
              <Nav key="nav" />
              {children}
            </Suspense>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
