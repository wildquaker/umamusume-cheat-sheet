import type { Metadata } from "next";
import PageLayout from "../components/PageLayout";

export const metadata: Metadata = {
  title: "Builds",
};
import { getBuilds } from "../lib/data";
import { InfoIcon, TrophyIcon, TrendingUpIcon } from "../components/Icons";

const cardImages: Record<string, string> = {
  "Speed": "/images/speed.png",
  "Stamina": "/images/stamina.png",
  "Power": "/images/power.png",
  "Wit": "/images/wit.png",
  "Speed/Power": "/images/speed_power.png",
  "Speed/Stamina": "/images/speed_stamina.png",
  "Speed/Pal": "/images/speed_pal.png",
  "Stamina/Pal": "/images/stamina_pal.png",
  "Power/Pal": "/images/power_pal.png",
  "Super Creek SSR Stamina Support Card": "/images/super_creek.png",
  "Mejiro McQueen SSR Stamina Support Card": "/images/mejiro_mcqueen.png",
  "Rice Shower SSR Power Support Card": "/images/rice_shower.png",
  "Riko Kashimoto SSR Pal Support Card": "/images/riko_kashimoto.png",
};

export default async function BuildsPage() {
  const buildsData = await getBuilds();

  return (
    <PageLayout title="Support Card Builds">
      <div className="space-y-8">
        <div className="prose prose-invert max-w-none">
          <p className="text-neutral-400">
            Recommended support card decks and target stats for different scenarios and distances.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          {buildsData.map((scenario: any, sIdx: number) => (
            <div key={sIdx} className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-neutral-800">
                <TrophyIcon className="text-pink-400" />
                <h2 className="text-2xl font-bold text-white">{scenario.Scenario}</h2>
              </div>

              <div className="grid gap-6">
                {scenario.builds.map((distanceGroup: any, dIdx: number) => (
                  <div key={dIdx} className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
                    <div className="p-4 bg-neutral-800/50 border-b border-neutral-800">
                      <h3 className="font-semibold text-lg text-white">{distanceGroup.Distance}</h3>
                    </div>

                    <div className="divide-y divide-neutral-800">
                      {distanceGroup.build.map((build: any, bIdx: number) => (
                        <div key={bIdx} className="p-4 space-y-4">
                          <div className="flex items-start gap-2 text-sm text-neutral-300 bg-neutral-950/30 p-2 rounded-lg">
                            <InfoIcon className="text-blue-400 mt-0.5" />
                            <span>
                              Inherit: <span className="text-white font-medium">{build.Inherit}</span>
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {build.Cards.map((card: string, cIdx: number) => (
                              <div key={cIdx} className="w-[66px] h-[66px] bg-neutral-800 rounded-lg overflow-hidden border border-neutral-700 relative group shrink-0">
                                {cardImages[card] ? (
                                  <img src={cardImages[card]} alt={card} className="w-full h-full object-cover" title={card} />
                                ) : (
                                  <div className="flex items-center justify-center flex-col h-full text-[10px] leading-tight text-center p-1 text-neutral-500 bg-neutral-800">
                                    {card}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUpIcon className="text-green-400" />
                              <span className="text-sm font-semibold text-neutral-200">Target Stats</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-sm">
                              {Object.entries(build["Target Stats"]).map(([stat, value]) => {
                                if (!value) return null;
                                return (
                                  <div key={stat} className="bg-neutral-800/50 rounded p-2 text-center border border-neutral-800">
                                    <div className="text-neutral-400 text-xs uppercase mb-1">{stat === "Misc" ? " " : stat}</div>
                                    <div className="font-mono text-white font-medium">{value as string}</div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {build.Note && (
                            <div className="text-sm text-neutral-400 italic border-l-2 border-neutral-700 pl-3 py-1">
                              {build.Note}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
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
