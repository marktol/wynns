"use client";

import {
  getCollectionAndDocuments,
  getDocumentById,
} from "@/utils/firebase/firebase.utils";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Category, Product } from "@/shared/types/types";
import { Button, Typography } from "@mui/material";
import MultipleSelectChip from "@/shared/select-categories/MultipleSelectChip";
import {
  StyledInput,
  StyledTextArea,
  StyledTextField,
  Wrapper,
} from "./page.styled";

const Page = () => {
  const [product, setProduct] = useState<Product>();

  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [availability, setAvailability] = useState<string>();
  const [model, setModel] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [categoryName, setCategoryName] = React.useState<
    (string | undefined)[]
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
        setDescription(product.description);
      }
    });
    getCollectionAndDocuments("sub-categories").then((data) => {
      const transformedData = data.map((doc) => ({
        id: doc.id,
        name: doc.name,
      }));
      console.log("transformedData : " + transformedData.length);
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

  const onSubmit = () => {
    const updatedProduct = {
      availability: availability,
      categories: categories,
      description: description,
      id: product?.id,
      image: product?.image,
      model: model,
      name: name,
      price: price,
    };
  };

  return (
    <div>
      {product && categoryName && (
        <Wrapper onSubmit={onSubmit}>
          <Typography variant="h6">{product.name}</Typography>
          <StyledTextField
            multiline
            label="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
          <StyledTextField
            multiline
            label="Цена"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            variant="outlined"
          />
          <StyledTextField
            multiline
            label="Наличие"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            variant="outlined"
          />
          <StyledTextField
            multiline
            label="Модель"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            variant="outlined"
          />
          <MultipleSelectChip
            names={allCategories.map((d) => d.name)}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
          />
          <Typography>{product.image}</Typography>
          <StyledTextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" variant="outlined">
            Сохранить
          </Button>
        </Wrapper>
      )}
    </div>
  );
};

export default Page;
