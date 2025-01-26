export const bikeCategories = [
  "Mountain",
  "Road",
  "Hybrid",
  "Electric",
] as const;
export const categoryMessage = (categories: string[]): string =>
  `catagories can be only ${categories.join(", ")}`;
