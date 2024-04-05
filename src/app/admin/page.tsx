"use client";

import { Category, SubCategory } from "@/shared/types/types";
import {
  getCollectionAndDocuments,
  signOutUser,
} from "@/utils/firebase/firebase.utils";
import ProtectedRoute from "@/widgets/protected-route/ProtectedRoute";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

const Page = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  useEffect(() => {
    getCollectionAndDocuments("categories").then((data) => {
      setCategories(data.map((d) => d as Category));
    });

    getCollectionAndDocuments("sub-categories").then((data) => {
      setSubCategories(data.map((d) => d as SubCategory));
    });
  }, []);

  const signOut = async () => {
    await signOutUser();
  };

  return (
    <ProtectedRoute>
      admin <Button onClick={signOut}>Log out</Button>
      <SimpleTreeView>
        {categories.map((c) => (
          <TreeItem key={c.id} itemId={c.id.toString()} label={c.name}>
            {subCategories
              .filter((sc) => sc.categoryId === c.id)
              .map((sc) => (
                <TreeItem
                  key={sc.id}
                  itemId={sc.id.toString()}
                  label={sc.name}
                />
              ))}
          </TreeItem>
        ))}
      </SimpleTreeView>
    </ProtectedRoute>
  );
};

export default Page;
