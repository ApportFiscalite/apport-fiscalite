import type { SVGProps } from "react";

export function PlanificationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path className="reveal-part [--i:1]" data-motion="rise" d="M50.64,84.89c-.86,0-1.71-.01-2.57-.03l.56-21.99c12.71.33,25.01-2.48,32.94-7.51l11.78,18.58c-11.06,7.01-26.5,10.95-42.71,10.95Z" />
      <rect className="reveal-part [--i:0]" data-motion="rise" x="5.8" y="90.25" width="40.89" height="22" />
      <path className="reveal-part [--i:2]" data-motion="rise" d="M85.14,51.71l-11.47-18.77c9.47-5.78,18.36-20.63,18.54-25.19l21.98.9c-.54,13.34-14.67,34.27-29.06,43.06Z" />
    </svg>
  );
}
