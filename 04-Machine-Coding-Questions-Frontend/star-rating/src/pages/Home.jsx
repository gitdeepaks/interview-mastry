import { useMemo, useState } from "react";
import Pagination from "../components/Pagination";
import { ShoppingCartState } from "../context/context";
import StarRating from "../components/StarRating";
import Filters from "../components/Filters";

const Home = () => {
  const [page, setpage] = useState(1);
  const {
    state: { products }, // Default empty array to avoid undefined
    filterState: { sort, byStock, byRating, searchQuery },
  } = ShoppingCartState();

  const filteredproduct = useMemo(() => {
    let filtertedProducts = products;
    if (sort) {
      filtertedProducts = filtertedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      filtertedProducts = filtertedProducts.filter((prod) => prod.inStock);
    }

    if (byRating) {
      filtertedProducts = filtertedProducts.filter(
        (prod) => prod.rating >= byRating
      );
    }

    if (searchQuery) {
      filtertedProducts = filtertedProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setpage(1);

    return filtertedProducts;
  }, [sort, byStock, byRating, searchQuery]);

  return (
    <div>
      <div className="py-9 flex">
        {/* filter */}
        <Filters />
        {/* Products */}
        {filteredproduct.length > 0 ? (
          <div className="products w-full">
            {filteredproduct?.slice(page * 10 - 10, page * 10).map((prod) => (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
                <hr />
                <span>$ {prod.price}</span>
                <StarRating rating={prod.rating} />
              </span>
            ))}
          </div>
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      {filteredproduct.length > 0 && (
        <Pagination products={filteredproduct} page={page} setPage={setpage} />
      )}
    </div>
  );
};

export default Home;
