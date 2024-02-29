import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-secondary ">
      <main className="flex-grow p-4">{children}</main>
      <footer className="p-4 bg-blue-600 text-primary">
        <p>
          &copy; 2024 Photo Gallery App for Making Science • Sweeft by Ilia
          Pachulia
        </p>
      </footer>
    </div>
  );
}

export default Layout;
