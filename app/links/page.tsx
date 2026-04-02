export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import PageLayout from "../components/PageLayout";

export const metadata: Metadata = {
  title: "Links",
};
import { getLinks } from "../lib/data";
import type { Link as LinkData } from "../lib/types";
import { ExternalLinkIcon } from "../components/Icons";

export default async function LinksPage() {
  const links = await getLinks();

  return (
    <PageLayout title="Links">
      <div className="space-y-6">
        <div className="prose prose-invert max-w-none">
          <p className="text-neutral-400">
            Useful external resources for guides, tier lists, and tools.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {links.map((link: LinkData, index: number) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-pink-500/50 hover:bg-neutral-800/50 transition-all group"
            >
              <span className="font-medium text-neutral-200 group-hover:text-white transition-colors">
                {link.text}
              </span>
              <ExternalLinkIcon className="text-neutral-500 group-hover:text-pink-400 transition-colors shrink-0 ml-4" />
            </a>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
