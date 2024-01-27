import React from "react";
import { useApi } from "../context/ApiContext";

const Product = () => {
  const { products, totalPages, page, selectedPageClick } = useApi();

  return (
    <div className="container">
      {products.length > 0 && (
        <div className="products">
          {products.map((item) => {
            return (
              <span className="prod__single" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {totalPages > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => selectedPageClick(page - 1)}
          >
            Prev
          </span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectedPageClick(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < totalPages ? "" : "pagination__disable"}
            onClick={() => selectedPageClick(page + 1)}
          >
            Next
          </span>
        </div>
      )}
    </div>
  );
};

export default Product;
