import { promises as fs } from 'fs';
import path from 'path';

export async function loadData(filename: string) {
  const filePath = path.join(process.cwd(), 'app/data', `${filename}.json`);
  const fileContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export async function getCharacters() {
  return loadData('characters');
}

export async function getSkills() {
  return loadData('skills');
}

export async function getBuilds() {
  return loadData('builds');
}

export async function getRaces() {
  return loadData('races');
}

export async function getLinks() {
  return loadData('links');
}
