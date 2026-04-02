"use client";

import { useState } from "react";
import type { RaceScenario, RaceRoute, YearGroup, Race } from "../lib/types";
import { CalendarIcon, FlagIcon } from "../components/Icons";

export default function RacesContent({
  scenarios,
}: {
  scenarios: RaceScenario[];
}) {
  const [activeScenario, setActiveScenario] = useState(0);
  const [activeRoute, setActiveRoute] = useState(0);

  const currentScenario = scenarios[activeScenario];
  const currentRoute = currentScenario?.routes[activeRoute];

  const handleScenarioChange = (index: number) => {
    setActiveScenario(index);
    setActiveRoute(0);
  };

  if (!scenarios.length) {
    return <p className="text-neutral-500">No race data available.</p>;
  }

  return (
    <div className="space-y-6">
      {/* Scenario Tabs */}
      <div className="flex flex-wrap gap-2">
        {scenarios.map((scenario, index) => (
          <button
            key={scenario.scenario}
            onClick={() => handleScenarioChange(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeScenario === index
                ? "bg-pink-500/20 text-pink-300 border border-pink-500/40 shadow-lg shadow-pink-500/10"
                : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-700 hover:text-neutral-300"
            }`}
          >
            {scenario.scenario}
          </button>
        ))}
      </div>

      {/* Route Selector */}
      {currentScenario && currentScenario.routes.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {currentScenario.routes.map((route, index) => (
            <button
              key={route.name}
              onClick={() => setActiveRoute(index)}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                activeRoute === index
                  ? "bg-yellow-500/15 text-yellow-300 border border-yellow-500/30"
                  : "bg-neutral-900/50 text-neutral-500 border border-neutral-800/50 hover:border-neutral-700 hover:text-neutral-400"
              }`}
            >
              <FlagIcon className="w-3.5 h-3.5" />
              {route.name}
            </button>
          ))}
        </div>
      )}

      {/* Race Cards Grid */}
      {currentRoute && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentRoute.agenda.map((yearGroup: YearGroup, index: number) => (
            <div
              key={`${activeScenario}-${activeRoute}-${index}`}
              className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden animate-zoom-fade"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="p-4 bg-neutral-800/50 border-b border-neutral-800 flex items-center gap-3">
                <CalendarIcon className="text-pink-400" />
                <h3 className="font-semibold text-lg text-white">
                  {yearGroup.year}
                </h3>
                <span className="ml-auto text-xs text-neutral-500 font-mono bg-neutral-950 px-2 py-0.5 rounded">
                  {yearGroup.races.length} races
                </span>
              </div>
              <div className="p-4 space-y-1">
                {yearGroup.races.map((race: Race, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center group hover:bg-neutral-800/50 p-2 rounded-lg transition-colors -mx-2"
                  >
                    <span className="font-medium text-neutral-200 group-hover:text-pink-300 transition-colors">
                      {race.name}
                    </span>
                    <span className="text-sm text-neutral-500 font-mono whitespace-nowrap bg-neutral-950 px-2 py-1 rounded ml-3">
                      {race.turn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
