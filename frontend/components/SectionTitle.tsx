type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionTitle({ eyebrow, title, subtitle, align = "left" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-5 text-base leading-8 text-muted sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}
