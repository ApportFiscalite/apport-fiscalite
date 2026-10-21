import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  children: ReactNode;
  subtitle?: ReactNode;
  className?: string;
};

export function SectionHeading({ id, children, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2 id={id} className="reveal-up text-display font-black text-(--heading)">
        {children}
      </h2>
      {subtitle && <p className="reveal-up mt-12 text-lead lg:mt-9">{subtitle}</p>}
    </div>
  );
}
