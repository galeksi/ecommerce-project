import { rest } from "msw";
import { setupServer } from "msw/node";
import { mockProducts } from "../mockData/mockProducts";
import { mockCategories } from "../mockData/mockCategories";
import { ProductUpdate } from "../../types/Product/ProductUpdate";
import { mockUsers } from "../mockData/mockUsers";
import { mockToken } from "../mockData/mockToken";

const baseUrl = "https://api.escuelajs.co/api/v1";

export const handlers = [
  rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
    return res(ctx.json(mockCategories));
  }),

  rest.get(`${baseUrl}/products`, (req, res, ctx) => {
    const newProducts = mockProducts.slice(1);
    return res(ctx.json(newProducts));
  }),

  rest.get(`${baseUrl}/users`, (req, res, ctx) => {
    return res(ctx.json(mockUsers));
  }),

  rest.get(`${baseUrl}/auth/profile`, (req, res, ctx) => {
    const authorization = req.headers.get("Authorization");
    const token = authorization?.substring(7);

    if (token && token === mockToken) {
      return res(ctx.json(mockUsers[2]));
    } else {
      return res(ctx.status(400));
    }
  }),

  rest.post(`${baseUrl}/auth/login`, async (req, res, ctx) => {
    let credentials = await req.json();

    if (
      credentials.email === mockUsers[2].email &&
      credentials.password === mockUsers[2].password
    ) {
      return res(ctx.json({ access_token: mockToken }));
    } else {
      return res(ctx.status(400));
    }
  }),

  rest.post(`${baseUrl}/products`, async (req, res, ctx) => {
    let newProduct = await req.json();
    newProduct.id = 4;
    newProduct.category = mockCategories[2];

    return res(ctx.json(newProduct));
  }),

  rest.put(`${baseUrl}/products/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    let updateData: ProductUpdate = await req.json();
    const oldProduct = mockProducts.find((p) => p.id === Number(id));

    if (
      oldProduct &&
      oldProduct.id === Number(id) &&
      updateData.title &&
      updateData.description
    ) {
      let productToUpdate = { ...oldProduct };
      productToUpdate.title = updateData.title;
      productToUpdate.description = updateData.description;

      return res(ctx.json(productToUpdate));
    } else {
      return res(ctx.status(400));
    }
  }),

  rest.delete(`${baseUrl}/products/:id`, (req, res, ctx) => {
    const { id } = req.params;

    if (mockProducts.find((p) => p.id === Number(id))) {
      return res(ctx.json(true));
    } else {
      return res(ctx.status(400));
    }
  }),
];

const server = setupServer(...handlers);

export default server;
