"use client";

import CategoryOverview from "@/widgets/category-overview/CategoryOverview";
import Grid from "@mui/material/Grid";

const categories = {
  additives: "Присадки",
  cleaners: "Очисники, Промивки",
  sealant: "Герметик, Змазка",
  conditioner: "Очищення кондиціонера",
};

export default function Home() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <CategoryOverview
            name={categories.additives}
            products={[51, 52, 53]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CategoryOverview
            name={categories.cleaners}
            products={[51, 52, 53]}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <CategoryOverview name={categories.sealant} products={[51, 52, 53]} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CategoryOverview
            name={categories.conditioner}
            products={[51, 52, 53]}
          />
        </Grid>
      </Grid>
    </>
  );
}
