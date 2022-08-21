export interface ServiceResponse<T extends any> {
  data?: T;
  loading?: boolean;
  error?: {
    reason: string;
  };
}

export interface ArticleBase {
  id: string;
}

export interface ProductArticle extends ArticleBase {
  amountRequired: number;
}

export interface Article extends ArticleBase {
  name: string;
  amountInStock: number;
}

export interface Product {
  id?: string;
  name: string;
  articles: ProductArticle[];
}
