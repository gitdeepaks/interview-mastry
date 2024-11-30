function calculateTotalSales(products, taxRate) {
  const totalSales = products.reduce(
    (acc, prd) => acc + prd.price * prd.quantity,
    0
  );
  const taxAmount = (totalSales * taxRate) / 100;

  const totalSalesWithTax = totalSales + taxAmount;

  return parseFloat(totalSalesWithTax.toFixed(2));
}
