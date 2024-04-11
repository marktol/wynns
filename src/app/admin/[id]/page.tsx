"use client";

import {
  getCollectionAndDocuments,
  getDocumentById,
} from "@/utils/firebase/firebase.utils";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import he from "he";
import { Category, Product, SubCategory } from "@/shared/types/types";
import { TextField } from "@mui/material";
import MultipleSelectChip from "@/shared/select-categories/MultipleSelectChip";
import { StyledInput, StyledTextField, Wrapper } from "./page.styled";

const Page = () => {
  const [product, setProduct] = useState<Product>();

  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [availability, setAvailability] = useState<string>();
  const [model, setModel] = useState<string>();
  const [categoryName, setCategoryName] = React.useState<
    (string | undefined)[] | undefined
  >([]);

  const { id } = useParams();

  useEffect(() => {
    getDocumentById("products", String(id)).then((el) => {
      if (el !== null) {
        const product = el as Product;
        setProduct(product);
        setName(product.name);
        setPrice(String(product.price));
        setAvailability(String(product.availability));
        setModel(product.model);
      }
    });
    getCollectionAndDocuments("sub-categories").then((data) => {
      const transformedData = data.map((doc) => ({
        id: doc.id,
        name: doc.name,
      }));
      setSubCategories(transformedData);
    });
    getCollectionAndDocuments("categories").then((data) => {
      setCategories(data.map((d) => d as Category));
    });
  }, []);

  useEffect(() => {
    if (product && subCategories.length > 0) {
      const allCat = [...categories, ...subCategories];
      setAllCategories(allCat);
      setCategoryName(
        product.categories.map((catId) => {
          const foundSub = allCat.find((sub) => sub.id === catId);
          return foundSub ? foundSub.name : "";
        })
      );
    }
  }, [product, subCategories]);

  const parseDescription = () => {
    if (product) return { __html: he.decode(product.description) };
  };

  return (
    <div>
      {product && categoryName && (
        <Wrapper>
          <h2>{product.name}</h2>
          <StyledInput>
            <StyledTextField
              multiline
              label="Название"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
            />
          </StyledInput>
          <StyledInput>
            <StyledTextField
              multiline
              label="Цена"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              variant="outlined"
            />
          </StyledInput>
          <StyledInput>
            <StyledTextField
              multiline
              label="Наличие"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              variant="outlined"
            />
          </StyledInput>
          <StyledInput>
            <StyledTextField
              multiline
              label="Модель"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              variant="outlined"
            />
          </StyledInput>
          <MultipleSelectChip
            names={subCategories.map((d) => d.name)}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
          />
          <h4>{product.image}</h4>
          <textarea value={product.description} />
          <div dangerouslySetInnerHTML={parseDescription()} />
        </Wrapper>
      )}
    </div>
  );
};

export default Page;
