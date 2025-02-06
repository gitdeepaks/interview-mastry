import { useEffect, useState } from "react";
import "./App.css";
import { ProductCard } from "./components/ProductCard";

const pageSize = 10;

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setcurrentPage] = useState(0);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const data = await fetch("https://dummyjson.com/products?limit=500");
      const jsonData = await data.json();

      setProducts(jsonData.products);
    } catch (error) {
      setError(jsonData.products);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const numberOfPages = Math.ceil(totalProducts / pageSize);
  const start = currentPage * pageSize;

  const end = start + pageSize;

  function handlePageChange(n) {
    setcurrentPage(n);
  }

  function toNext() {
    if (currentPage !== numberOfPages - 1) {
      setcurrentPage((prev) => prev + 1);
    }
  }
  function toPrevPage() {
    if (currentPage !== 0) {
      setcurrentPage((prev) => prev - 1);
    }
  }

  if (!products.length || error) {
    return <div className="">No Products found</div>;
  } else
    return (
      <div className="content">
        <h1>Pagination</h1>

        <div className="products-container">
          {products.slice(start, end).map((p) => (
            <ProductCard key={p.id} image={p.thumbnail} title={p.title} />
          ))}
        </div>
        <div className="pagination-container">
          <span className="page-number" onClick={() => toPrevPage()}>
            ◀️
          </span>
          {[...Array(numberOfPages).keys()].map((number) => (
            <span
              className={
                "page-number" + (number === currentPage ? "active" : "")
              }
              key={number}
              onClick={(n) => handlePageChange(number)}
            >
              {number}
            </span>
          ))}
          <span className="page-number" onClick={() => toNext()}>
            ▶️
          </span>
        </div>
      </div>
    );
};

export default App;
