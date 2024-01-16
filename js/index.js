console.log("starting of index js");

async function fetchCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  return await res.json();
}

async function populateCategories() {
  const categories = await fetchCategories();
  console.log("categories", categories);
  categories.forEach(function (item) {
    const categoryList = document.getElementById("categoryList");
    const eachCategoryDiv = document.createElement("div");
    const linkTagOfCategory = document.createElement("a"); 

    eachCategoryDiv.classList.add(
      "category-item",
      "d-flex",
      "align-items-center",
      "justify-content-center"
    );
    linkTagOfCategory.textContent = item;
    linkTagOfCategory.href = `/productList.html?category=${item}`;
    eachCategoryDiv.appendChild(linkTagOfCategory);
    categoryList.appendChild(eachCategoryDiv);
  });
}
populateCategories();
