import { cn } from "@/lib/cn";

type CredentialsListProps = {
  items: readonly string[];
  className?: string;
};

export function CredentialsList({ items, className }: CredentialsListProps) {
  return (
    <ul
      role="list"
      className={cn(
        "space-y-[1.2em] rounded-tl-[1.25em] rounded-br-[1.5em] border border-sarcelle px-[1.39em] pt-[1.23em] pb-[1.4em] text-small text-sarcelle lg:pr-[0.6em] lg:pl-[2.94em]",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="reveal-up">
          {item}
        </li>
      ))}
    </ul>
  );
}
