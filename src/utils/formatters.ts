export const formatPopulation = (population: number): string => {
  return new Intl.NumberFormat('en-US').format(population);
};

export const formatArea = (area: number): string => {
  return `${new Intl.NumberFormat('en-US').format(area)} km²`;
};

export const formatPercent = (value: number, total: number): string => {
  const percent = (value / total) * 100;
  return `${percent.toFixed(1)}%`;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
