function calculateTotalSales(products, taxRate) {
  const taotalSales = products.reduce(
    (acc, prd) => acc + prd.price * prd.quantity,
    0
  );
}
