console.log("loading ProductList");
const clearFilter = document.getElementById("clear");

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search");
  async function fetchProduct() {
    const res = await axios("https://fakestoreapi.com/products");
    return res.data;
  }

  async function populateProduct(flag, filteredData) {
    var product;
    if (!flag) {
      product = await fetchProduct();
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

      productLink.href = "productDetails.html";
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
      priceDiv.textContent = `&#8377; ${item.price}`;

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
    const allProduct = await fetchProduct();
    const filteredProduct = allProduct.filter(
      (item) =>
        item.price > Number(minPrice.value) &&
        item.price < Number(maxPrice.value)
    );
    productListItem.innerHTML = "";
    populateProduct(true, filteredProduct);
  });
  clearFilter.addEventListener('click',(ele) => {
    location.reload();
  });
});
