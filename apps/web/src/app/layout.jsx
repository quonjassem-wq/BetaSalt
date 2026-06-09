import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../components/ThemeProvider";
import InspectGuard from "../components/InspectGuard";

export const metadata = {
  title: "Salt Executor",
  description: "The next generation Roblox executor. 100% UNC. Free forever.",
  icons: { icon: "/image.png" },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body { margin: 0; background: #050505; color: white; font-family: 'Space Grotesk', sans-serif; }
          ::selection { background: rgba(239,68,68,0.3); color: white; }
          :root {
            --bg: #050505;
            --bg2: #0a0a0a;
            --surface: rgba(14,14,14,0.85);
            --surface2: rgba(22,22,22,0.6);
            --accent: #ef4444;
            --accent-rgb: 239,68,68;
            --accent-glow: rgba(239,68,68,0.18);
            --border: rgba(255,255,255,0.07);
            --text: #ffffff;
            --muted: #6b7280;
            --orb1: rgba(239,68,68,0.12);
            --orb2: rgba(127,29,29,0.1);
            --gradient: linear-gradient(135deg,#ef4444,#dc2626);
          }
        `}</style>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <InspectGuard />
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
