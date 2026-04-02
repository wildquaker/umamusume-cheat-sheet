export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import PageLayout from "../components/PageLayout";

export const metadata: Metadata = {
  title: "Races",
};
import { getRaces } from "../lib/data";
import RacesContent from "./RacesContent";

export default async function RacesPage() {
  const scenarios = await getRaces();

  return (
    <PageLayout title="Races">
      <div className="space-y-6">
        <div className="prose prose-invert max-w-none">
          <p className="text-neutral-400">
            Key races to target for each scenario and route.
          </p>
        </div>
        <RacesContent scenarios={scenarios} />
      </div>
    </PageLayout>
  );
}
