const createSlug = (title) => {
  if (!title) {
    return null;
  }
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(" ")
      .join("-") + Math.floor(Math.random() * 1000)
  );
};

export default createSlug;
