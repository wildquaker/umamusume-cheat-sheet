import { promises as fs } from "fs";
import path from "path";
import type { Character, Skill, Scenario, RaceScenario, Link } from "./types";

export async function loadData<T>(filename: string): Promise<T> {
  const filePath = path.join(process.cwd(), "app/data", `${filename}.json`);
  const fileContent = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContent) as T;
}

export async function getCharacters(): Promise<Character[]> {
  return loadData<Character[]>("characters");
}

export async function getSkills(): Promise<Skill[]> {
  return loadData<Skill[]>("skills");
}

export async function getBuilds(): Promise<Scenario[]> {
  return loadData<Scenario[]>("builds");
}

export async function getRaces(): Promise<RaceScenario[]> {
  return loadData<RaceScenario[]>("races");
}

export async function getLinks(): Promise<Link[]> {
  return loadData<Link[]>("links");
}
