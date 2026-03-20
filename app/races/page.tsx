import type { Metadata } from "next";
import PageLayout from "../components/PageLayout";

export const metadata: Metadata = {
  title: "Races",
};
import { getRaces } from "../lib/data";
import { CalendarIcon } from "../components/Icons";

export default async function RacesPage() {
  const races = await getRaces();

  return (
    <PageLayout title="Races">
      <div className="space-y-8">
        <div className="prose prose-invert max-w-none">
          <p className="text-neutral-400">Key races to target for the "URA Finale" scenario.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {races.map((yearGroup: any, index: number) => (
            <div key={index} className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
              <div className="p-4 bg-neutral-800/50 border-b border-neutral-800 flex items-center gap-3">
                <CalendarIcon className="text-pink-400" />
                <h3 className="font-semibold text-lg text-white">{yearGroup.year}</h3>
              </div>
              <div className="p-4 space-y-3">
                {yearGroup.races.map((race: any, i: number) => (
                  <div key={i} className="flex justify-between items-start group hover:bg-neutral-800/50 p-2 rounded-lg transition-colors -mx-2">
                    <div className="space-y-0.5">
                      <span className="font-medium text-neutral-200 block group-hover:text-pink-300 transition-colors">{race.name}</span>
                      {race.note && <span className="text-xs text-neutral-500 block">{race.note}</span>}
                    </div>
                    <span className="text-sm text-neutral-500 font-mono whitespace-nowrap bg-neutral-950 px-2 py-1 rounded">
                      {race.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
