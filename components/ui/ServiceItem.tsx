import { serviceIcons } from "@/components/icons/services";
import type { Service } from "@/content/site";

export function ServiceItem({ icon, title, description }: Service) {
  const Icon = serviceIcons[icon];

  return (
    <article className="grid grid-cols-[--spacing(69)_1fr] gap-x-22 gap-y-14 lg:grid-cols-[--spacing(120)_1fr] lg:gap-x-42.5 lg:gap-y-4">
      <div className="flex h-0 items-center self-center">
        <Icon className="reveal-icon size-69 shrink-0 text-chair lg:size-120" />
      </div>
      <h3 className="reveal-up text-h3 font-bold text-chair">{title}</h3>
      <p className="reveal-up col-start-2 max-w-312 pl-3.5 text-body lg:ml-191 lg:max-w-735 lg:pl-0">{description}</p>
    </article>
  );
}
