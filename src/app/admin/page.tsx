"use client";

import {
  Category,
  CategoryProducts,
  Product,
  SubCategory,
} from "@/shared/types/types";
import {
  getCollectionAndDocuments,
  signOutUser,
} from "@/utils/firebase/firebase.utils";
import ProtectedRoute from "@/widgets/protected-route/ProtectedRoute";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { StyledImage, StyledProduct } from "./page.module";
import EditIcon from "@mui/icons-material/Edit";

const Page = () => {
  const [selectedCategories, setSelectedCategories] = useState<Number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<CategoryProducts[]>(
    []
  );

  useEffect(() => {
    getCollectionAndDocuments("categories").then((data) => {
      setCategories(data.map((d) => d as Category));
    });

    getCollectionAndDocuments("sub-categories").then((data) => {
      setSubCategories(data.map((d) => d as SubCategory));
    });

    getCollectionAndDocuments("products-by-categories").then((data) => {
      setCategoryProducts(data.map((d) => d as CategoryProducts));
    });
  }, []);

  const signOut = async () => {
    await signOutUser();
  };

  const handleEditClick = (id: number) => {};

  return (
    <ProtectedRoute>
      <Button style={{ alignSelf: "flex-end" }} onClick={signOut}>
        Вийти
      </Button>

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
                    <div
                      onClick={() => {
                        handleEditClick(p.id);
                      }}
                    >
                      <EditIcon />
                    </div>
                    <StyledImage src={p.image} alt={p.model} />
                    <p>{p.name}</p>
                  </StyledProduct>
                ))}
          </Grid>
        </Grid>
      </Box>
    </ProtectedRoute>
  );
};

export default Page;
