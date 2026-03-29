"use client";

import { useState } from "react";
import { SearchIcon } from "../components/Icons";
import type { Skill } from "../lib/types";

export default function SkillList({ skills }: { skills: Skill[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [styleFilter, setStyleFilter] = useState("All");
  const [distanceFilter, setDistanceFilter] = useState("All");

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.Skill.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === "All" || skill.Rating === ratingFilter;
    const matchesStyle = styleFilter === "All" || skill.Style === styleFilter;
    const matchesDistance = distanceFilter === "All" || skill.Distance === distanceFilter;
    return matchesSearch && matchesRating && matchesStyle && matchesDistance;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setRatingFilter("All");
    setStyleFilter("All");
    setDistanceFilter("All");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Skills Database</h1>
          <p className="text-neutral-400">Recommended skills categorized by rating, style, and distance.</p>
        </div>
        <div className="text-sm text-neutral-500 shrink-0">Total Skills: {skills.length}</div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="text-neutral-500" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search skills..."
          aria-label="Search skills"
          className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-colors"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-neutral-500">
          {filteredSkills.length} / {skills.length}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="rating-filter" className="text-sm text-neutral-400">Rating:</label>
          <select id="rating-filter" value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-pink-500/50">
            <option value="All">All</option>
            <option value="Best">Best</option>
            <option value="Good">Good</option>
            <option value="Situational">Situational</option>
            <option value="Excess">Excess</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="style-filter" className="text-sm text-neutral-400">Style:</label>
          <select id="style-filter" value={styleFilter} onChange={(e) => setStyleFilter(e.target.value)} className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-pink-500/50">
            <option value="All">All</option>
            <option value="Front Runner">Front Runner</option>
            <option value="Pace Chaser">Pace Chaser</option>
            <option value="Late Surger">Late Surger</option>
            <option value="End Closer">End Closer</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="distance-filter" className="text-sm text-neutral-400">Distance:</label>
          <select id="distance-filter" value={distanceFilter} onChange={(e) => setDistanceFilter(e.target.value)} className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-pink-500/50">
            <option value="All">All</option>
            <option value="Sprint">Sprint</option>
            <option value="Mile">Mile</option>
            <option value="Medium">Medium</option>
            <option value="Long">Long</option>
          </select>
        </div>
        <button type="button" onClick={resetFilters} className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-300 hover:text-white text-sm transition-colors focus:outline-none focus:border-pink-500/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
          Reset
        </button>
      </div>

      <div className="overflow-x-auto bg-neutral-900 rounded-xl border border-neutral-800">
        <table className="w-full text-left">
          <thead className="bg-neutral-800/50 text-neutral-300 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Skill</th>
              <th className="px-4 py-3 font-semibold">Rating</th>
              <th className="px-4 py-3 font-semibold">Style</th>
              <th className="px-4 py-3 font-semibold">Distance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {filteredSkills.map((skill: Skill, index: number) => (
              <tr key={index} className="hover:bg-neutral-800/30 transition-colors">
                <td className="px-4 py-3 text-white">{skill.Skill}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      skill.Rating === "Best" ? "bg-yellow-500/20 text-yellow-400" :
                      skill.Rating === "Good" ? "bg-blue-500/20 text-blue-400" :
                      skill.Rating === "Situational" ? "bg-purple-500/20 text-purple-400" :
                      "bg-neutral-500/20 text-neutral-400"
                    }`}
                  >
                    {skill.Rating}
                  </span>
                </td>
                <td className="px-4 py-3 text-neutral-300">{skill.Style}</td>
                <td className="px-4 py-3 text-neutral-300">{skill.Distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <div className="text-neutral-500 text-lg">No skills found matching your search or filters.</div>
        </div>
      )}
    </div>
  );
}
