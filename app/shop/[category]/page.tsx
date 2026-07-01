import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts } from "@/lib/db/queries";
import {
  CATEGORY_PAGES,
  getCategoryPage,
} from "@/lib/category-pages";
import { CategoryLanding } from "@/components/shop/category-landing";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORY_PAGES.map((page) => ({ category: page.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const config = getCategoryPage(category);
  if (!config) return {};

  return {
    title: config.title,
    description: config.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const config = getCategoryPage(category);
  if (!config) notFound();

  const products = (await getAllProducts()).filter(
    (product) => product.category === config.category,
  );

  return <CategoryLanding config={config} products={products} />;
}
