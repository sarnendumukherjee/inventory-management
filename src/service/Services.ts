// This file was generated with the following app.
// https://postman-to-code.netlify.app/
import axios from "axios";
const request = axios.create({
  baseURL: "http://localhost:7000",
});

export const ArticlesListArticles = () =>
  request.get("http://localhost:7000/articles/");

//Request types
export type ArticlesAddArticleRequestBody = {
  name: string;
  amountInStock: number;
};

export const ArticlesAddArticle = (data: ArticlesAddArticleRequestBody) =>
  request.post("http://localhost:7000/articles/", data);

export const ArticlesGetArticle = () =>
  request.get("http://localhost:7000/articles/ARTICLE_ID_HERE");

//Request types
type ArticlesPatchArticleRequestBody = {
  id: string;
  name: string;
  amountInStock: number;
};

export const ArticlesPatchArticle = (data: ArticlesPatchArticleRequestBody) => {
  const articleToPatch: ArticlesPatchArticleRequestBody = {
    id: data.id,
    name: data.name,
    amountInStock: Number.isInteger(data.amountInStock)
      ? data.amountInStock
      : Number.parseInt(data.amountInStock as unknown as string),
  };
  return request.patch(
    `http://localhost:7000/articles/${data.id}`,
    articleToPatch
  );
};

export const ArticlesDeleteArticle = (articleId: string) =>
  request.delete(`http://localhost:7000/articles/${articleId}`);

//Request types
type ArticlesBulkPatchArticlesRequestBody = (
  | { id: string; amountInStock: number }
  | { id: string; amountToSubtract: number }
)[];

export const ArticlesBulkPatchArticles = (
  data: ArticlesBulkPatchArticlesRequestBody
) => request.patch("http://localhost:7000/articles/", data);

export const ProductsListProducts = () =>
  request.get("http://localhost:7000/products/");

//Request types
type ProductsAddProductRequestBody = {
  name: string;
  articles: { id: string; amountRequired: number }[];
};

export const ProductsAddProduct = (data: ProductsAddProductRequestBody) =>
  request.post("http://localhost:7000/products/", data);

export const ProductsGetProduct = () =>
  request.get("http://localhost:7000/products/PRODUCT_ID_HERE");

//Request types
type ProductsPatchProductRequestBody = {
  name: string;
  articles: { id: string; amountRequired: number }[];
};

export const ProductsPatchProduct = (data: ProductsPatchProductRequestBody) =>
  request.patch("http://localhost:7000/products/PRODUCT_ID_HERE", data);

export const ProductsDeleteProduct = () =>
  request.delete("http://localhost:7000/products/PRODUCT_ID_HERE");

export const SalesListSales = () => request.get("http://localhost:7000/sales/");

//Request types
type SalesAddSaleRequestBody = { productId: string; amountSold: number };

export const SalesAddSale = (data: SalesAddSaleRequestBody) =>
  request.post("http://localhost:7000/sales/", data);

export const SalesGetSale = () =>
  request.get("http://localhost:7000/sales/SALE_ID_HERE");

//Request types
type SalesPatchSaleRequestBody = { amountSold: number };

export const SalesPatchSale = (data: SalesPatchSaleRequestBody) =>
  request.patch("http://localhost:7000/sales/SALE_ID_HERE", data);

export const SalesDeleteSale = () =>
  request.delete("http://localhost:7000/sales/SALE_ID_HERE");
