console.log("loading Product Details Page");
if (params["id"]) {
  axios.get(`https://fakestoreapi.com/products/${params.id}`).then((detailsOfProduct) => {
const res=detailsOfProduct.data
const productImg=document.getElementById('productImg')
const productName=document.getElementById('product-name')
const productPrice=document.getElementById('product-price')
const productDescription=document.getElementById('product-description')
productImg.src=res.image
productName.textContent=res.title
productPrice.textContent=`Rs${res.price}`
productDescription.textContent=res.description

console.log(res)
  });
}
