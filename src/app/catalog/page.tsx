"use client";

import {
  Category,
  CategoryProducts,
  Product,
  SubCategory,
} from "@/shared/types/types";
import { getCollectionAndDocuments } from "@/utils/firebase/firebase.utils";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { StyledImage, StyledProduct } from "./page.styled";
import PriceFilter from "@/shared/price-filter/PriceFilter";
import { useSearchParams } from "next/navigation";

const Catalog = () => {
  const [selectedCategories, setSelectedCategories] = useState<Number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<CategoryProducts[]>(
    []
  );
  const [value, setValue] = useState<number[]>([0, 1000]);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    setSelectedCategories([id ? parseInt(id) : 0]);
  }, [id]);

  useEffect(() => {
    getCollectionAndDocuments("categories").then((data) => {
      setCategories(data as Category[]);
    });

    getCollectionAndDocuments("sub-categories").then((data) => {
      setSubCategories(data as SubCategory[]);
    });

    getCollectionAndDocuments("products-by-categories").then((data) => {
      setCategoryProducts(data as CategoryProducts[]);
    });
  }, []);

  return (
    <Box style={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <SimpleTreeView>
            {categories.map((c) => (
              <TreeItem
                key={c.id}
                itemId={c.id.toString()}
                label={c.name}
                onClick={() =>
                  setSelectedCategories([
                    c.id,
                    ...subCategories
                      .filter((sc) => sc.categoryId === c.id)
                      .map((sc) => sc.id),
                  ])
                }
              >
                {subCategories
                  .filter((sc) => sc.categoryId === c.id)
                  .map((sc) => (
                    <TreeItem
                      key={sc.id}
                      itemId={sc.id.toString()}
                      label={sc.name}
                      onClick={() => setSelectedCategories([sc.id])}
                    />
                  ))}
              </TreeItem>
            ))}
          </SimpleTreeView>
          <PriceFilter value={value} setValue={setValue} min={0} max={1000} />
        </Grid>
        <Grid item xs={8}>
          {selectedCategories.length > 0 &&
            categoryProducts
              .filter((cp) =>
                selectedCategories.some((id) => id === cp.categoryId)
              )
              .flatMap((c) => c.products)
              .reduce((accumulator: Product[], product) => {
                if (!accumulator.some((x) => product.id === x.id)) {
                  accumulator.push(product);
                }
                return accumulator;
              }, [])
              .map((p) => (
                <StyledProduct key={p.id}>
                  <StyledImage src={p.image} alt={p.model} />
                  <p>{p.name}</p>
                </StyledProduct>
              ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Catalog;
