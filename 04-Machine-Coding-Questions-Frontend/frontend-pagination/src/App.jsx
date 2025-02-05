import { useEffect, useState } from "react";
import "./App.css";
import { ProductCard } from "./components/ProductCard";

const pageSize = 10;

const App = () => {
  const [products, setProducts] = useState([]);

  async function fetchData() {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const jsonData = await data.json();

    setProducts(jsonData.products);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const numberOfPages = Math.ceil(totalProducts / pageSize);

  if (!products.length) {
    return <div className="">No Products found</div>;
  } else
    return (
      <div className="content">
        <h1>Pagination</h1>
        <div className="">{[...Array(10).keys()]}</div>
        <div className="products-container">
          {products.map((p) => (
            <ProductCard key={p.id} image={p.thumbnail} title={p.title} />
          ))}
        </div>
      </div>
    );
};

export default App;
