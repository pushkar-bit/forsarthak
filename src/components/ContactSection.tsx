import { SectionShell } from "./SectionShell";
import { Button } from "./Button";

export function ContactSection() {
  return (
    <SectionShell id="contact" label="Contact">
      <div className="flex flex-col">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0a0a0a] tracking-tight max-w-[28ch]">
          Looking for an AI/LLM product or product engineering intern?
        </h2>
        <p className="text-base sm:text-lg text-[#3a3a3a] max-w-[56ch] mt-4 mb-8 leading-relaxed">
          I'm open to internship roles where the work runs from the problem statement to the shipped product. The fastest way to reach me is email.
        </p>

        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <Button
            variant="filled"
            href="mailto:pushkar.jain2024@nst.rishihood.edu.in"
          >
            pushkar.jain2024@nst.rishihood.edu.in
          </Button>
          <Button
            variant="ghost"
            href="https://linkedin.com/in/pushkarjainn"
          >
            LinkedIn
          </Button>
          <Button
            variant="ghost"
            href="https://github.com/pushkar-bit"
          >
            GitHub
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
