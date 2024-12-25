import { Link } from "react-router-dom";
import { ShoppingCartState } from "../context/context";

const HeaDer = () => {
  const {
    filterState: { searchQuery },
    filterDispatch,
  } = ShoppingCartState();

  return (
    <nav className="h-5 flex items-center justify-between">
      <Link to="/">
        <h2 className="text-2xl font-mono">Store</h2>
      </Link>
      <input
        type="text "
        placeholder="search the product..."
        value={searchQuery}
        onChange={(e) =>
          filterDispatch({
            type: "FILTER_BY_SEARCH",
            payload: e.target.value,
          })
        }
        className="p-2 rounded-lg border-none"
      />
      <Link to="/cart">
        <button className="px-4 py-2 rounded-md bg-blue-700 text-white">
          Cart (0)
        </button>
      </Link>
    </nav>
  );
};

export default HeaDer;
