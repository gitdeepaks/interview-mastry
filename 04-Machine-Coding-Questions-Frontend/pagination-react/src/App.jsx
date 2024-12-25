import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [pages, setpages] = useState(1);
  const [totalPages, settotalPages] = useState(0);

  console.log(totalPages);

  const fetchData = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${pages * 10 - 10}`
    );

    const data = await response.json();
    if (data && data.products) {
      setProducts(data.products);
      settotalPages(Math.ceil(data.total / 10));
    }
  };

  // console.log(products);

  useEffect(() => {
    fetchData();
  }, [pages]);

  function selectPageHandler(selectedPage) {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== pages
    ) {
      setpages(selectedPage);
    }
  }

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((product) => {
            return (
              <span className="products__single" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <span
                  style={{
                    color: "green",
                  }}
                >
                  {product.title}
                </span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={pages > 1 ? "" : "pagination_disabled"}
            onClick={() => selectPageHandler(pages - 1)}
          >
            ⏮️
          </span>
          {Number.isInteger(totalPages) &&
            totalPages > 0 &&
            [...Array(totalPages)].map((_, i) => (
              <span
                className={pages === i + 1 ? "pagination_selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            ))}

          <span
            onClick={() => selectPageHandler(pages + 1)}
            className={pages < totalPages ? "" : "pagination_disabled"}
          >
            ⏭️
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
