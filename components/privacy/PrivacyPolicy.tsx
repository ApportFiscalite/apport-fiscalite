import { type PrivacyParagraph, privacyPolicy } from "@/content/privacy";

const headingClass = "text-cta font-bold text-(--policy-heading,var(--color-sarcelle))";

const paragraphText = (paragraph: PrivacyParagraph) =>
  typeof paragraph === "string" ? paragraph : paragraph.map((part) => (typeof part === "string" ? part : part.text)).join("");

function Paragraph({ paragraph }: { paragraph: PrivacyParagraph }) {
  if (typeof paragraph === "string") return paragraph;
  return paragraph.map((part, index) =>
    typeof part === "string" ? (
      part
    ) : (
      <span key={index} lang={part.lang}>
        {part.text}
      </span>
    ),
  );
}

type PrivacyPolicyProps = {
  idPrefix: string;
};

export function PrivacyPolicy({ idPrefix }: PrivacyPolicyProps) {
  const { lastUpdated, sections, officer } = privacyPolicy;
  const officerId = `${idPrefix}-responsable`;

  return (
    <>
      <p className="mt-24 text-small lg:mt-32">
        {lastUpdated.label} <time dateTime={lastUpdated.dateTime}>{lastUpdated.text}</time>
      </p>
      {sections.map((section, index) => {
        const headingId = `${idPrefix}-section-${index}`;
        return (
          <section key={section.heading} aria-labelledby={headingId} className="mt-56 lg:mt-72">
            <h2 id={headingId} className={headingClass}>
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraphText(paragraph)} className="mt-16 lg:mt-20">
                <Paragraph paragraph={paragraph} />
              </p>
            ))}
          </section>
        );
      })}
      <section
        aria-labelledby={officerId}
        className="mt-56 rounded-card rounded-bl-none border border-(--policy-border,var(--color-sarcelle)) px-24 py-28 lg:mt-72 lg:px-40 lg:py-40"
      >
        <h2 id={officerId} className={headingClass}>
          {officer.heading}
        </h2>
        <p className="mt-16 lg:mt-20">{officer.name}</p>
        <p>
          {officer.emailLabel}{" "}
          <a
            href={`mailto:${officer.email}`}
            className="underline-shift font-bold text-(--policy-link,var(--color-sapin)) wrap-anywhere focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--policy-link,var(--color-sapin))"
          >
            {officer.email}
          </a>
        </p>
      </section>
    </>
  );
}
