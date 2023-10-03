import { Product } from "../types/Product/Product";

export const paginationLoader = (
  data: Product[],
  currentPage: number,
  itemsPerPage: number
) => {
  const itemOffset = (currentPage - 1) * itemsPerPage;
  const endOffset = itemOffset + itemsPerPage;
  const itemsToView = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  return {
    items: itemsToView,
    pageCount: pageCount,
  };
};
