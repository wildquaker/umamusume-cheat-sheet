import type { Metadata } from "next";
import PageLayout from "../components/PageLayout";

export const metadata: Metadata = {
  title: "Skills",
};
import SkillList from "./SkillList";
import { getSkills } from "../lib/data";

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <PageLayout title="Skills">
      <SkillList skills={skills} />
    </PageLayout>
  );
}
