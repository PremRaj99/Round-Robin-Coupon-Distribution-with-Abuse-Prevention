const searchSortFilter = async (query = {}, defaultSearchQuery = "email") => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = query.search?.trim() || "";
  const searchIndex = query.searchIndex || defaultSearchQuery;
  const sortField = query.sort?.trim() || "createdAt"; // Ensure a valid default sort field
  const sort = { [sortField]: -1 }; // Correctly assign sorting field

  const searchQuery = search
    ? { [searchIndex]: { $regex: search, $options: "i" } }
    : {}; // Avoid unnecessary regex when search is empty

  return { searchQuery, skip, limit, sort };
};

export default searchSortFilter;
