// import { Product } from "../types/Product";

import { useEffect } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { fetchAllProductsAsync } from "../redux/reducers/productReducer";

const ProductList = () => {
  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(products);

  return <div>ProductList</div>;
};

export default ProductList;
