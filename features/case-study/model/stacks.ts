export type StackIcon = {
  name: string;
  slug: string;
  color?: string;
  mono?: boolean;
};

const icon = (name: string, slug: string, extra?: Pick<StackIcon, "color" | "mono">): StackIcon => ({
  name,
  slug,
  ...extra,
});

export const PROJECT_STACKS: Record<string, StackIcon[]> = {
  slop: [
    icon("Next.js", "nextdotjs", { mono: true }),
    icon("NestJS", "nestjs"),
    icon("Prisma", "prisma"),
    icon("React", "react"),
    icon("Meilisearch", "meilisearch"),
    icon("TypeScript", "typescript"),
    icon("Redis", "redis"),
    icon("Amazon S3", "amazons3", { color: "569A31" }),
    icon("Chrome", "googlechrome", { color: "4285F4" }),
  ],
  scholub: [
    icon("React", "react"),
    icon("Vite", "vite"),
    icon("NestJS", "nestjs"),
    icon("Prisma", "prisma"),
    icon("FastAPI", "fastapi"),
    icon("TypeScript", "typescript"),
    icon("Tailwind CSS", "tailwindcss"),
    icon("Redis", "redis"),
  ],
  savequest: [
    icon("Expo", "expo", { mono: true }),
    icon("React", "react"),
    icon("NestJS", "nestjs"),
    icon("PostgreSQL", "postgresql"),
    icon("TypeScript", "typescript"),
    icon("TypeORM", "typeorm"),
    icon("Python", "python"),
  ],
  fresio: [
    icon("Expo", "expo", { mono: true }),
    icon("React", "react"),
    icon("FastAPI", "fastapi"),
    icon("PostgreSQL", "postgresql"),
    icon("Vite", "vite"),
    icon("Redis", "redis"),
    icon("Amazon S3", "amazons3", { color: "569A31" }),
  ],
  sipsiilban: [
    icon("Expo", "expo", { mono: true }),
    icon("FastAPI", "fastapi"),
    icon("Redis", "redis"),
    icon("React", "react"),
    icon("TypeScript", "typescript"),
  ],
  "seoul-bike": [
    icon("Next.js", "nextdotjs", { mono: true }),
    icon("MapLibre", "maplibre"),
    icon("Python", "python"),
    icon("TypeScript", "typescript"),
    icon("Tailwind CSS", "tailwindcss"),
  ],
  petclinic: [
    icon("AWS", "amazonwebservices", { color: "FF9900" }),
    icon("Terraform", "terraform"),
    icon("Docker", "docker"),
    icon("Spring", "spring"),
    icon("MySQL", "mysql"),
    icon("GitHub Actions", "githubactions"),
    icon("Grafana", "grafana"),
    icon("Prometheus", "prometheus"),
  ],
};
