import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "./components/PageLayout";

export const metadata: Metadata = {
  title: "Home",
};
import { UserIcon, BookIcon, ClubIcon, FlagIcon, LinkIcon, InfoIcon, ArrowRightIcon } from "./components/Icons";

export default function Home() {
  return (
    <PageLayout title="Welcome">
      <div className="space-y-8">
        <div className="rounded-xl overflow-hidden border border-neutral-800 shadow-2xl relative">
          <img src="/images/home_art.webp" alt="Umamusume Home Art" className="w-full h-auto object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Your Personal Training Guide</h2>
            <p className="text-neutral-300 max-w-2xl">Everything you need to raise champion Uma Musume - from skill recommendations to support card builds.</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Quick Access</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/characters" className="group flex items-center gap-4 p-4 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-pink-500/50 hover:bg-neutral-800/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:bg-pink-500/20 transition-colors">
                <UserIcon />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white group-hover:text-pink-400 transition-colors">Characters</h4>
                <p className="text-sm text-neutral-400 truncate">View all Uma guides</p>
              </div>
              <ArrowRightIcon className="text-neutral-600 group-hover:text-pink-400 transition-colors" />
            </Link>

            <Link href="/skills" className="group flex items-center gap-4 p-4 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-blue-500/50 hover:bg-neutral-800/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                <BookIcon />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">Skills</h4>
                <p className="text-sm text-neutral-400 truncate">Skill recommendations</p>
              </div>
              <ArrowRightIcon className="text-neutral-600 group-hover:text-blue-400 transition-colors" />
            </Link>

            <Link href="/builds" className="group flex items-center gap-4 p-4 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-green-500/50 hover:bg-neutral-800/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500/20 transition-colors">
                <ClubIcon />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white group-hover:text-green-400 transition-colors">Builds</h4>
                <p className="text-sm text-neutral-400 truncate">Support card decks</p>
              </div>
              <ArrowRightIcon className="text-neutral-600 group-hover:text-green-400 transition-colors" />
            </Link>

            <Link href="/races" className="group flex items-center gap-4 p-4 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-yellow-500/50 hover:bg-neutral-800/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 group-hover:bg-yellow-500/20 transition-colors">
                <FlagIcon />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white group-hover:text-yellow-400 transition-colors">Races</h4>
                <p className="text-sm text-neutral-400 truncate">Key race schedule</p>
              </div>
              <ArrowRightIcon className="text-neutral-600 group-hover:text-yellow-400 transition-colors" />
            </Link>

            <Link href="/links" className="group flex items-center gap-4 p-4 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-purple-500/50 hover:bg-neutral-800/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                <LinkIcon />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white group-hover:text-purple-400 transition-colors">Links</h4>
                <p className="text-sm text-neutral-400 truncate">External resources</p>
              </div>
              <ArrowRightIcon className="text-neutral-600 group-hover:text-purple-400 transition-colors" />
            </Link>
          </div>
        </div>

        <div className="bg-neutral-900/50 rounded-xl border border-neutral-800 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
              <InfoIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">About This Guide</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                This cheat sheet is designed to help trainers quickly find the information they need for raising Uma Musume. Data is based on the Global version and community research. Use the navigation on the left to explore different sections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
