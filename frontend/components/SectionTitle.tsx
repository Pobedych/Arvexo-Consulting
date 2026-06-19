type SectionTitleProps = {
  eyebrow?: string;
  counter?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function SectionTitle({ eyebrow, counter, title, subtitle, align = "left", dark = false }: SectionTitleProps) {
  const textMuted = dark ? "text-white/50" : "text-faint";
  const textMain  = dark ? "text-white" : "text-ink";
  const textBody  = dark ? "text-white/60" : "text-muted";

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {(eyebrow || counter) ? (
        <p className={`mono-label mb-4 ${textMuted}`}>
          {counter ? <span className="text-accent">{counter}</span> : null}
          {counter && eyebrow ? " " : null}
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-[2.75rem] ${textMain}`}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-5 text-base leading-8 sm:text-lg ${textBody}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}
