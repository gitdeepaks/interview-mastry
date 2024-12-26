import { useMemo, useState } from "react";
import Pagination from "../components/Pagination";
import { ShoppingCartState } from "../context/context";
import StarRating from "../components/StarRating";
import Filters from "../components/Filters";

const Home = () => {
  const [page, setpage] = useState(1);
  const {
    state: { products, cart },
    dispatch,
    filterState: { sort, byStock, byRating, searchQuery },
  } = ShoppingCartState();

  console.log({ cart });

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
            {filteredproduct?.slice(page * 10 - 10, page * 10).map((prod) => {
              const inCart = cart.some((p) => p.id === prod.id);
              return (
                <span className="products__single" key={prod.id}>
                  <img src={prod.thumbnail} alt={prod.title} />
                  <span>{prod.title}</span>
                  <hr />
                  <span>$ {prod.price}</span>
                  <StarRating rating={prod.rating} />
                  <button
                    disabled={!prod.inStock}
                    className={`px-2 py-1 mt bg-blue-500 text-white rounded-md`}
                    onClick={() =>
                      dispatch({
                        type: inCart ? "REMOVE_FROM_CART" : "ADD_TO_CART",
                        payload: prod,
                      })
                    }
                  >
                    {prod.inStock
                      ? !inCart
                        ? "Add to Cart"
                        : "Remove from cart"
                      : "Out of Stock"}
                  </button>
                </span>
              );
            })}
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
