import React, { createContext, useContext, useEffect, useState } from "react";

const ApiContext = createContext();

export const useApi = () => {
  return useContext(ApiContext);
};

export const ApiProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const productData = async () => {
    const data = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const result = await data.json();
    if (result && result.products) {
      setProducts(result.products);
      setTotalPages(result.total / 10);
    }
  };

  useEffect(() => {
    productData();
  }, [page]);

  const selectedPageClick = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        products,
        totalPages,
        page,
        selectedPageClick,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
