import type { SVGProps } from "react";

export function IntegrationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="currentColor" aria-hidden focusable="false" {...props}>
      <rect className="reveal-part [--i:0]" data-motion="slide-in-left" x="4.46" y="49" width="40.89" height="22" />
      <rect className="reveal-part [--i:0]" data-motion="slide-in-right" x="74.65" y="49" width="40.89" height="22" />
      <path className="reveal-part [--i:1]" data-motion="grow" d="M84,42.53c-4.97-7.25-14.13-11.41-24.48-11.14-9.8.26-18.6,4.48-22.43,10.74l-18.78-11.46c7.73-12.66,23.3-20.81,40.62-21.27,17.83-.48,34,7.26,43.21,20.69l-18.14,12.44Z" />
      <path className="reveal-part [--i:2]" data-motion="grow" d="M60.48,110.63c-.51,0-1.03,0-1.54-.02-17.33-.46-32.89-8.61-40.62-21.27l18.78-11.47c3.83,6.27,12.63,10.48,22.43,10.74,10.34.28,19.51-3.89,24.48-11.14l18.14,12.44c-8.94,13.04-24.43,20.71-41.66,20.71Z" />
    </svg>
  );
}
