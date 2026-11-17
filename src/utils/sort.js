 
export const parseSort = (sort) => ({
  field: sort.replace(/^-/, ""),
  dir: sort.startsWith("-") ? "desc" : "asc",
});
