import StarRating from "../components/StarRating";
import { ShoppingCartState } from "../context/context";

const Cart = () => {
  const {
    dispatch,
    state: { cart },
  } = ShoppingCartState();
  return (
    <div className="py-9 flex flex-col gap-5">
      <div className="text-2xl text-center">
        Subtotal: ${cart.reduce((acc, currVal) => acc + currVal.price, 0)}
      </div>

      {cart.map((prod) => {
        return (
          <span
            key={prod.id}
            className="flex h-36 items-center justify-between border-2 p-5"
          >
            <image
              className="h-full size-48"
              src={prod.thumbnail}
              alt={prod.title}
            />
            <div className="flex flex-col">
              <span>{prod.title}</span>
              <span>${prod.price}</span>
            </div>
            <StarRating rating={prod.rating} />

            <button
              disabled={!prod.inStock}
              className={`px-2 py-1 mt bg-blue-500 text-white rounded-md`}
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              Remove from cart
            </button>
          </span>
        );
      })}
    </div>
  );
};

export default Cart;
