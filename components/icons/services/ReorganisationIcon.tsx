import type { SVGProps } from "react";

export function ReorganisationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="currentColor" aria-hidden focusable="false" {...props}>
      <rect className="reveal-part [--i:0]" data-motion="drop" x="1.07" y="75.89" width="35.86" height="22" />
      <rect className="reveal-part [--i:1]" data-motion="drop" x="42.07" y="75.89" width="35.86" height="22" />
      <rect className="reveal-part [--i:2]" data-motion="drop" x="83.07" y="75.89" width="35.86" height="22" />
      <rect className="reveal-part [--i:3]" data-motion="drop" x="42.07" y="49" width="35.86" height="22" />
      <rect className="reveal-part [--i:5]" data-motion="drop" x="42.07" y="22.11" width="35.86" height="22" />
      <rect className="reveal-part [--i:4]" data-motion="drop" x="83.07" y="49" width="35.86" height="22" />
    </svg>
  );
}
