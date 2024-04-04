"use client";

import CategoryOverview from "@/widgets/category-overview/CategoryOverview";
const categories = {
  additives: "Присадки",
  cleaners: "Очисники, Промивки",
  sealant: "Герметик, Змазка",
  conditioner: "Очищення кондиціонера",
};

export default function Home() {
  return (
    <>
      home page
      <CategoryOverview name={categories.additives} products={[51, 52, 53]} />
      <CategoryOverview name={categories.cleaners} products={[51, 52, 53]} />
      <CategoryOverview name={categories.sealant} products={[51, 52, 53]} />
      <CategoryOverview name={categories.conditioner} products={[51, 52, 53]} />
    </>
  );
}
