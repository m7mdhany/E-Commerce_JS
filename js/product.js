let product = sessionStorage.getItem("product")
let productCard = document.querySelector(".product-details")
let productImg = document.querySelector(".prdImg")
let productDetails = document.querySelectorAll(".product-details h2, .product-details p")
let cartNumber = document.querySelector(".cart-number")
if (sessionStorage.getItem("CartN") > 0) {
  cartNumber.innerText = sessionStorage.getItem("CartN")
}
let allCart = []
if (sessionStorage.getItem("cart")) {
  allCart = [...sessionStorage.getItem("cart").split(",")]
}

async function getData(val = undefined, key) {
  try {
    const response = await fetch("../data.json");
    const data = await response.json();
    products = data.products
    let filter = products.filter(obj =>
      Object.values(obj).includes(val)
    );
    let product = filter[0]

    productDetails[0].innerHTML = product.name
    productDetails[1].innerHTML = "Price : " + product.price + " LE"
    productDetails[2].innerHTML = "Stock : " + product.stock
    productDetails[3].innerHTML = "Category : " + product.category
    productDetails[4].innerHTML = "SubCategory : " + product.subcategory
    productImg.src = ` ../${product.image}`



    // add to cart page

    let btnCart = document.querySelectorAll(".btn-cart")
    btnCart.forEach(item => item.addEventListener("click", function () {
      let cart = this.parentElement.querySelector("h2").innerText
      let cartNumber = document.querySelector(".cart-number")
      let cartN = sessionStorage.getItem("CartN")
      if (!allCart.includes(cart)) {
        cartN++
        allCart.push(cart)
        console.log(allCart);
      }
      sessionStorage.setItem("cart", allCart)
      sessionStorage.setItem("CartN", cartN)
      cartNumber.innerText = sessionStorage.getItem("CartN")
    }))



  } catch (error) {
    console.error("Error fetching JSON:", error);
    productCard.innerHTML = `ERROR 404`
  }
}


getData(product)
