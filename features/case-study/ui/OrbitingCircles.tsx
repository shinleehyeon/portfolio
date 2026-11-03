"use client";

import { Children, type HTMLAttributes, type ReactNode } from "react";

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  reverse?: boolean;
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
  children?: ReactNode;
}) {
  const calculatedDuration = duration / speed;
  const count = Children.count(children);

  return (
    <>
      {path ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="orbit-path" aria-hidden>
          <circle cx="50%" cy="50%" r={radius} fill="none" />
        </svg>
      ) : null}
      {Children.map(children, (child, index) => {
        const angle = (360 / count) * index;
        return (
          <div
            style={{
              ["--duration" as string]: calculatedDuration,
              ["--radius" as string]: radius,
              ["--angle" as string]: angle,
              ["--icon-size" as string]: `${iconSize}px`,
            }}
            className={`orbit-item${reverse ? " is-reverse" : ""}${className ? ` ${className}` : ""}`}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
