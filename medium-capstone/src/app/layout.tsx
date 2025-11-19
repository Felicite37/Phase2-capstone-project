import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/navigation";
import "./globals.css";

const _geistSans = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medium - Read, Write, and Share Stories",
  description: "A publishing platform for storytellers and creators",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${_geistSans.variable} ${_geistMono.variable} bg-white font-sans text-gray-900`}
      >
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-gray-200 bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="font-bold text-gray-900">Medium</h3>
                <p className="mt-2 text-sm text-gray-600">
                  A platform for writers and readers
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Product</h4>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="/explore" className="hover:text-blue-600">
                      Explore
                    </a>
                  </li>
                  <li>
                    <a href="/write" className="hover:text-blue-600">
                      Write
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Company</h4>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="/about" className="hover:text-blue-600">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Legal</h4>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
              <p>&copy; 2025 Medium. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
