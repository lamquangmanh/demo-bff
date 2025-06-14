export interface CreateProductRequest {
  name: string;
  url: string;
  description?: string;
  icon?: string;
}

export interface UpdateProductRequest extends CreateProductRequest {
  productId: string;
}

export interface DeleteProductRequest {
  productId: string;
}
