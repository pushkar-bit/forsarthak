import { FadeIn } from "./FadeIn";
import { Button } from "./Button";

export function HeroSection() {
  const stats = [
    {
      figure: "29,000+",
      label: "requests on biol, with zero paid acquisition",
    },
    {
      figure: "500+",
      label: "runners in the ICHOR community, first month",
    },
    {
      figure: "100",
      label: "users signed up on launch day",
    },
  ];

  return (
    <section className="relative w-full pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-24">
      <div className="max-w-[1120px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="flex flex-col">
          {/* Headline */}
          <FadeIn delay={0}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-tight leading-none max-w-[14ch] text-[#0a0a0a]">
              Products that ship, and then get used.
            </h1>
          </FadeIn>

          {/* Lede paragraph */}
          <FadeIn delay={0.08} className="mt-8 sm:mt-10">
            <p className="text-lg sm:text-xl md:text-[22px] leading-relaxed text-[#3a3a3a] max-w-[56ch]">
              I'm Pushkar — a product-minded full-stack and AI engineer. I take consumer products from the problem statement through the PRD, the architecture, and the launch, to real users on the other side.
            </p>
          </FadeIn>

          {/* Meta line */}
          <FadeIn delay={0.16} className="mt-6 sm:mt-8">
            <p className="text-xs sm:text-sm text-[#6a6a6a] leading-normal">
              Delhi, India · B.Tech Computer Science, Newton School of Technology · Open to AI/LLM product management and product engineering internships
            </p>
          </FadeIn>

          {/* Button row */}
          <FadeIn delay={0.24} className="mt-8 sm:mt-10">
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <Button
                variant="filled"
                href="mailto:pushkar.jain2024@nst.rishihood.edu.in"
              >
                Email me
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
          </FadeIn>

          {/* Stat row */}
          <FadeIn delay={0.32} className="mt-14 sm:mt-20">
            <div className="pt-8 border-t border-[rgba(0,0,0,0.1)] flex flex-wrap gap-8 sm:gap-12 md:gap-16">
              {stats.map((stat) => (
                <div key={stat.figure} className="flex flex-col min-w-[140px] flex-1">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0a0a0a]">
                    {stat.figure}
                  </span>
                  <span className="text-xs sm:text-sm text-[#6a6a6a] max-w-[22ch] mt-1.5 leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
