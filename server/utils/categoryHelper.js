const autoCategory = (title) => {
  const text = title.toLowerCase();

  if (text.includes("zomato") || text.includes("swiggy") || text.includes("food") || text.includes("cafe")) return "Food";
  if (text.includes("uber") || text.includes("ola") || text.includes("bus") || text.includes("travel")) return "Travel";
  if (text.includes("amazon") || text.includes("flipkart") || text.includes("shopping")) return "Shopping";
  if (text.includes("rent") || text.includes("room")) return "Rent";
  if (text.includes("electricity") || text.includes("wifi") || text.includes("bill")) return "Bills";
  if (text.includes("college") || text.includes("course") || text.includes("book")) return "Education";

  return "Other";
};

module.exports = autoCategory;