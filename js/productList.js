console.log("loading ProductList");
const clearFilter = document.getElementById("clear");

document.addEventListener("DOMContentLoaded", async () => {
  async function fetchCategories() {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    return await res.json();
  }
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  console.log("params", params);

  const searchButton = document.getElementById("search");
  const allProduct = await fetchProduct();

  async function fetchProduct() {
    if (params.category) {
      const res = await axios(
        `https://fakestoreapi.com/products/category/${params.category}`
      );
      return res.data;
    } else {
      const res = await axios("https://fakestoreapi.com/products");
      return res.data;
    }
  }

  async function populateProduct(flag, filteredData) {
    var product;
    if (!flag) {
      product = allProduct;
    } else {
      product = filteredData;
    }
    product.forEach(function (item) {
      const productListItem = document.getElementById("productListItem");

      const productLink = document.createElement("a");
      const imageDiv = document.createElement("div");
      const nameDiv = document.createElement("div");
      const priceDiv = document.createElement("div");
      const imgTag = document.createElement("img");

      productLink.href = `productDetails.html?id=${item.id}`;
      productLink.target = "_blank";
      productLink.classList.add(
        "product-item",
        "text-decoration-none",
        "d-inline-block"
      );

      imageDiv.classList.add("product-img");
      imgTag.src = item.image;
      imageDiv.appendChild(imgTag);

      nameDiv.classList.add("product-name", "text-center");
      priceDiv.classList.add("product-price", "text-center");

      nameDiv.textContent = item.title.substring(0, 15) + "...";
      priceDiv.textContent = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(item.price);

      productLink.appendChild(imageDiv);
      productLink.appendChild(nameDiv);
      productLink.appendChild(priceDiv);

      productListItem.appendChild(productLink);
    });
  }
  populateProduct(false);
  searchButton.addEventListener("click", async (e) => {
    const productListItem = document.getElementById("productListItem");

    const minPrice = document.getElementById("minPrice");
    const maxPrice = document.getElementById("maxPrice");
    const filteredProduct = allProduct.filter(
      (item) =>
        item.price > Number(minPrice.value) &&
        item.price < Number(maxPrice.value)
    );
    productListItem.innerHTML = "";
    populateProduct(true, filteredProduct);
  });
  clearFilter.addEventListener("click", (ele) => {
    location.reload();
  });

  let categories = await fetchCategories();
  categories.forEach((category) => {
    let categoryList = document.getElementById("categoryList");
    const linkForCategory = document.createElement("a");
    linkForCategory.href = `productList.html?category=${category}`;
    linkForCategory.classList.add("d-flex", "text-decoration-none");
    linkForCategory.textContent = category;

    categoryList.appendChild(linkForCategory);
  });
});
