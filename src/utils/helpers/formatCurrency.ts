function formatCurrency(amount: number): string {
  return amount.toLocaleString('ru-RU', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default formatCurrency;
