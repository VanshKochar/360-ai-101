import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "360 AI 101 | Master the AI Revolution",
  description: "Learn everything about 360 AI, stay updated with the latest tech news, and grab short tricks to boost your productivity. Specially designed for young adults.",
  keywords: ["AI course", "ChatGPT", "Claude", "Gemini", "NotebookLLM", "Lovable", "Antigravity", "AI prompt engineering", "Tech news", "Productivity hacks"],
  authors: [{ name: "360 AI 101" }],
  openGraph: {
    title: "360 AI 101 | Master the AI Revolution",
    description: "Learn everything about 360 AI, stay updated with the latest tech news, and grab short tricks to boost your productivity.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "360 AI 101 | Master the AI Revolution",
    description: "Learn everything about 360 AI, stay updated with the latest tech news, and grab short tricks to boost your productivity.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
