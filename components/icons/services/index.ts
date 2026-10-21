import type { ComponentType, SVGProps } from "react";
import { PlanificationIcon } from "./PlanificationIcon";
import { ReorganisationIcon } from "./ReorganisationIcon";
import { IntegrationIcon } from "./IntegrationIcon";
import { VenteAchatIcon } from "./VenteAchatIcon";
import { RepreneuriatIcon } from "./RepreneuriatIcon";

export const serviceIcons = {
  planification: PlanificationIcon,
  reorganisation: ReorganisationIcon,
  integration: IntegrationIcon,
  "vente-achat": VenteAchatIcon,
  repreneuriat: RepreneuriatIcon,
} satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

export type ServiceIconKey = keyof typeof serviceIcons;
