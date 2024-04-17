import { Popover, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledContent, Wrapper } from "./CategoryPicker.module";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { getCollectionAndDocuments } from "@/utils/firebase/firebase.utils";
import { Category } from "@/shared/types/types";
import { useRouter } from "next/navigation";

const CategoryPicker = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const router = useRouter();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getCollectionAndDocuments("categories").then((data) => {
      setCategories(data as Category[]);
    });
  }, []);

  return (
    <>
      <Typography variant="h6" onClick={handleClick}>
        Каталог
      </Typography>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <StyledContent>
          <Wrapper>
            <SimpleTreeView>
              {categories.map((c) => (
                <TreeItem
                  key={c.id}
                  itemId={c.id.toString()}
                  label={c.name}
                  onClick={() => {
                    router.push(`/catalog/?id=${c.id}`);
                    handleClose();
                  }}
                ></TreeItem>
              ))}
            </SimpleTreeView>
          </Wrapper>
        </StyledContent>
      </Popover>
    </>
  );
};

export default CategoryPicker;
