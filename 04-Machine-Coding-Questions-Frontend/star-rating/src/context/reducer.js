export const shoppingCartReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT":
      return {
        ...state,
        products: action.payload, // Ensure correct spelling of 'products'
      };

    default:
      return state;
  }
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_STOCK":
      return { ...state, byStock: JSON.parse(action.payload) };
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "CLEAR_FILTERS":
      return { byStock: false, byRating: 0, searchQuery: "" };
    case "ADD_TO_CART":
      console.log("Adding to Cart:", action.payload);

      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      console.log("Removing from Cart:", action.payload);

      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
    case "CHANGE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.id === action.payload.id ? { ...c, qty: action.payload.qty } : c
        ),
      };

    default:
      return state;
  }
};
