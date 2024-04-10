import { Product } from "@/shared/types/types";
import {
  addCollectionAndDocuments,
  getCollectionAndDocuments,
} from "@/utils/firebase/firebase.utils";
import { useEffect, useState } from "react";

const useProductPreProcessing = async (updatedProduct: Product) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getCollectionAndDocuments("products").then((data) => {
      setProducts(data.map((d) => d as Product));
    });
  }, []);

  if (updatedProduct) {
    let start = performance.now();

    const prodToCat: any = {};

    for (const prod of products) {
      for (const cat of prod.categories) {
        if (prodToCat[cat]) {
          prodToCat[cat].push(prod);
        } else {
          prodToCat[cat] = [prod];
        }
      }
    }

    const productsByCategory = Object.keys(prodToCat).map((key) => {
      return { categoryId: Number(key), products: prodToCat[key] };
    });

    await addCollectionAndDocuments(
      "products-by-categories",
      productsByCategory,
      "categoryId"
    );

    let timeTaken = performance.now() - start;
    console.log("Total time taken : " + timeTaken + " milliseconds");
  }
};

export default useProductPreProcessing;
