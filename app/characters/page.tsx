import type { Metadata } from "next";
import PageLayout from "../components/PageLayout";

export const metadata: Metadata = {
  title: "Characters",
};
import CharacterList from "./CharacterList";
import { getCharacters } from "../lib/data";

export default async function CharactersPage() {
  const characters = await getCharacters();

  return (
    <PageLayout title="Umas">
      <CharacterList characters={characters} />
    </PageLayout>
  );
}
