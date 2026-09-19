import { SectionShell } from "./SectionShell";
import { EntryRow } from "./EntryRow";

export function ExperienceSection() {
  const experiences = [
    {
      title: "Software Developer Intern",
      date: "May – Jun 2025",
      org: "Launched Global, remote",
      description:
        "Built a reusable, modular restaurant menu frontend template that let non-technical owners edit their menu content without touching core code, designed for rapid customisation and redeployment across client sites.",
    },
    {
      title: "Growth & Development Head",
      date: "Apr 2025",
      org: "Apollo MedSkills, Rishihood University",
      description:
        "Developed consumer engagement and conversion strategies for the Apollo MedSkills program, contributing to marketing, audience targeting, and strategic brand communication.",
    },
  ];

  return (
    <SectionShell id="experience" label="Experience">
      <div className="flex flex-col">
        {experiences.map((exp) => (
          <EntryRow
            key={exp.title}
            title={exp.title}
            date={exp.date}
            org={exp.org}
            asHeading="h2"
          >
            <p>{exp.description}</p>
          </EntryRow>
        ))}
      </div>
    </SectionShell>
  );
}
