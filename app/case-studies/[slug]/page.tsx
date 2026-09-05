import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyTemplate } from "@/features/case-study/ui/CaseStudyTemplate";
import { CASE_STUDY_SLUGS, caseStudyPath, getCaseStudy } from "@/features/case-study/model/registry";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCaseStudy(slug);
  if (!entry) return {};
  const path = caseStudyPath(entry.slug);
  return {
    title: entry.seo.title,
    description: entry.seo.description,
    openGraph: {
      title: entry.seo.title,
      description: entry.seo.description,
      images: [entry.seo.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: entry.seo.title,
      description: entry.seo.description,
      images: [entry.seo.image],
    },
    alternates: { canonical: path },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const entry = getCaseStudy(slug);
  if (!entry) notFound();
  return <CaseStudyTemplate copy={entry.copy} />;
}
