import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | NeoRadar",
};

export default function PrivacyPage() {
  const markdown = fs.readFileSync(path.join(process.cwd(), "src/content/PRIVACY.md"), "utf-8");

  return (
    <main className="min-h-screen w-full bg-blue-100 dark:bg-black">
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
        <Link href="/" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
          ← Back
        </Link>
        <article className="prose prose-neutral dark:prose-invert mt-6 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
