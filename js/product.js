let navUser = document.getElementById("navUser")
if (localStorage.getItem("online") || sessionStorage.getItem("online")) {
  document.querySelector(".signout").classList.remove("hidden")
  navUser.innerText = sessionStorage.getItem("online")
  document.querySelector(".user span").style.display = "none"
  // login / profile
  let loginBtn = document.querySelector(".user")
  loginBtn.addEventListener("click", () => {
    location.assign("#")
  })
} else {
  navUser.innerText = "Guest"
  document.querySelector(".user span").style.display = "inline"
  let loginBtn = document.querySelector(".user")
  loginBtn.addEventListener("click", () => {
    location.assign("login.html")
  })
}
// signout
document.querySelector(".signout").addEventListener("click", () => {
  sessionStorage.removeItem("online")
  localStorage.removeItem("online")
  location.assign("../html/login.html")
})


let product = sessionStorage.getItem("product")
let productCard = document.querySelector(".product-details")
let productImg = document.querySelector(".prdImg")
let productDetails = document.querySelectorAll(".product-details h2, .product-details p")
let productDetailsKey = document.querySelector(".product-details-p .key")
let productDetailsValue = document.querySelector(".product-details-p .value")
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
    // fetch/get api items
    let products = []
    if (!localStorage.getItem("products")) {
      const response = await fetch("../data.json");
      const data = await response.json();
      products = data.products
      localStorage.setItem("products", JSON.stringify(products));
    } else {
      products = JSON.parse(localStorage.getItem("products"))
    }

    let filter = products.filter(obj =>
      Object.values(obj).includes(val)
    );
    let product = filter[0]

    // product details
    for (let key in product) {
      let p1 = document.createElement("p")
      let p2 = document.createElement("p")
      if (key == "name" || key == "image" || key == "discount") {
      } else {
        if (key == "price") {
          p2.innerHTML = ": " + `${product[key]} LE`
        } else {
          p2.innerHTML = ": " + `${product[key]}`
        }

        p1.innerHTML = `${key}`
        productDetailsKey.appendChild(p1)
        productDetailsValue.appendChild(p2)
      }
    }
    productDetails[0].innerHTML = product.name
    productImg.src = ` ../${product.image}`



    // add to cart page
    let btnCart = document.querySelectorAll(".btn-cart")
    btnCart.forEach(item => item.addEventListener("click", function () {
      let cart = this.parentElement.querySelector("h2").innerText
      let cartNumber = document.querySelector(".cart-number")
      let cartN = sessionStorage.getItem("CartN")

      // fot notifications
      let test = document.querySelector(".notif-cont")
      let notif = document.createElement("div")
      notif.className = "order-msg w-50 h-20 rounded-l-2xl relative top-0 -right-500 bg-main/70 text-white transform transition-all duration-300 z-50 flex justify-center items-center shadow-xl"
      if (!allCart.includes(cart)) {
        notif.innerText = "Item added!"
      } else {
        notif.innerText = "Already in cart!"
        notif.classList.remove("bg-main/50")
        notif.classList.add("bg-red-500/50")
      }
      test.appendChild(notif)
      setTimeout(() => {
        notif.classList.add("right-0")
      }, 10)
      setTimeout(() => {
        notif.classList.remove("right-0")
        setTimeout(() => {
          notif.classList.add("hidden")
        }, 300)
      }, 3000)
      setTimeout(() => {
        notif.remove()
      }, 4000)
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
