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

    default:
      return state;
  }
};
