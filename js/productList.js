console.log("loading ProductList");
document.addEventListener("DOMContentLoaded", () => {
  async function fetchProduct() {
    const res = await axios("https://fakestoreapi.com/products");
    return res.data;
  }

  async function populateProduct() {
    const product = await fetchProduct();
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

      nameDiv.textContent=item.title.substring(0,15)+"..."
      priceDiv.textContent=`&#8377; ${item.price}`

      productLink.appendChild(imageDiv);
      productLink.appendChild(nameDiv);
      productLink.appendChild(priceDiv);

      productListItem.appendChild(productLink);
    });
  }
  populateProduct();
});
