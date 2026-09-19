import { SectionShell } from "./SectionShell";
import { EntryRow } from "./EntryRow";

export function BeyondSection() {
  return (
    <SectionShell id="about" label="Beyond the code">
      <div className="flex flex-col">
        <EntryRow
          title="Founder & President, ICHOR Run Club"
          date="Jun 2026 – present"
          org="Rishihood University"
        >
          <div className="space-y-3">
            <p>
              Founded the club and grew it to a 500+ member community within the first month, building the brand identity, constitution, and operating model from zero to university registration with a five-person founding team.
            </p>
            <p>
              Created and delivered RU-Rox, a flagship obstacle race run with Rishihood University and ARAMBH Orientation. Every bib for the first edition sold out; managed race format, logistics, and registration.
            </p>
          </div>
        </EntryRow>

        <EntryRow
          title="Growth & Development Head, Arthakram Consulting Club"
          org="Arthakram Consulting Club"
        >
          <p>
            Led club strategy, leadership initiatives, and structured problem-solving frameworks. Elsewhere: champion at LSSC Declamation, Interschool JAM, and MUN debate, plus technical and leadership roles across hackathons and E-Summits.
          </p>
        </EntryRow>

        <EntryRow
          title="B.Tech in Computer Science"
          date="Expected Jan 2028"
          org="Newton School of Technology, Rishihood University · GPA 7.0/10.0"
        />
      </div>
    </SectionShell>
  );
}
