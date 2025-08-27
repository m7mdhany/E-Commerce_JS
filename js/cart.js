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
  document.querySelector(".login-warning").style.display = "none"
} else {
  navUser.innerText = "Guest"
  document.querySelector(".user span").style.display = "inline"
  let loginBtn = document.querySelector(".user")
  loginBtn.addEventListener("click", () => {
    location.assign("login.html")
  })
  document.querySelector(".login-warning").style.display = "block"
}

let cartNumber = document.querySelector(".cart-number")
if (sessionStorage.getItem("CartN") > 0) {
  cartNumber.innerText = sessionStorage.getItem("CartN")
}

// signout
document.querySelector(".signout").addEventListener("click", () => {
  sessionStorage.removeItem("online")
  localStorage.removeItem("online")
  location.assign("../html/login.html")
})

let cartContainer = document.querySelector(".cart-container")
async function getData(val = undefined, key) {
  try {
    const response = await fetch("../data.json");
    const data = await response.json();
    products = data.products
    let filter = val.flatMap(v =>
      products.filter(obj => Object.values(obj).includes(v))
    );
    let product = filter
    if (!sessionStorage.getItem("cart")) {
      let btnPlace = document.querySelector(".btn-place")
      btnPlace.disabled = true
      btnPlace.style.backgroundColor = "grey"
      cartContainer.innerHTML = `
      <div class="flex h-full w-full flex-col">
      <p class="text-6xl  flex items-center justify-center h-full text-secondary ">Cart is empty !</p>
      <a class="underline text-secondary text-xl w-fit" href="products.html" >←Continue Shopping</a>
      </div>
      `
    } else {
      cartContainer.innerHTML = ``
    }
    // order summary - items count
    let total = 0
    document.querySelector(".items-total").innerText = product.length
    for (let i = 0; i < product.length; i++) {
      cartContainer.innerHTML += `
              <div class=" cart-card /border-b min-h-20 h-20 grid grid-cols-15 justify-center pr-2 items-center gap-5 bg-gray-100">
                <div class="w-full h-20 col-span-3  p-1 cursor-pointer prod-item">
                  <img class="w-full object-contain object-top h-full bg-white  border-x-2" src="../${product[i].image}" alt="">
                </div>
                <h2 class="h-full flex items-center col-span-4">${product[i].name}</h2>
                <div class="col-span-4 flex flex-col justify-center items-center h-full">
                  <div class="flex col-span-4 gap-2">
                    <button class="cursor-pointer btn-cart-m bg-secondary text-white w-7 hover:bg-main ">-</button>
                    <div class="border px-2 cart-qu">1</div>
                    <button class="cursor-pointer btn-cart-p bg-secondary text-white w-7 hover:bg-main">+</button>
                  </div>
                </div>
                <div class=" col-span-2  flex justify-end gap-1">
                  <p class="text-center price">${product[i].price}</p><span>LE<span/>
                </div>
                <div class=" col-span-2  flex justify-end gap-1">
                  <p class="text-center total-price">${product[i].price}</p> <span>LE<span/>
                </div>
              </div>
      `
      // order summary
      total = total + product[i].price
      let priceSumTotal = document.querySelector(".total-sum-price")
      priceSumTotal.innerText = total
      let priceSumTotalFinal = document.querySelector(".total-sum-price-f")
      priceSumTotalFinal.innerText = total
      // items count
      document.querySelector(".items-total").innerText = product.length
    }
    let prodItems = document.querySelectorAll(".prod-item")
    for (let i = 0; i < prodItems.length; i++) {
      prodItems[i].addEventListener("click", function () {
        let card = this.parentElement.querySelector("h2").innerHTML
        sessionStorage.setItem("product", card)
        location.assign("product.html")
      })
    }
    // buttons - , +
    let btnInc = document.querySelectorAll(".btn-cart-m")
    let btnDec = document.querySelectorAll(".btn-cart-p")
    let cartQuantity = document.querySelectorAll(".cart-qu")
    for (let i = 0; i < btnInc.length; i++) {
      btnInc[i].addEventListener("click", function () {
        if (cartQuantity[i].innerText <= 1) {
          // remove item 
          if (cartQuantity[i].innerHTML == 0) {
            let valueToRemove = this.closest(".cart-card").querySelector("h2").innerText;
            let newCart = [...sessionStorage.getItem("cart").split(",")].filter(item => item !== valueToRemove)
            getData(newCart)
            sessionStorage.setItem("cart", newCart)
            let nn = sessionStorage.getItem("CartN")
            nn--
            sessionStorage.setItem("CartN", newCart.length)
            console.log("here");
            cartNumber.innerText = sessionStorage.getItem("CartN")
          }
          cartQuantity[i].innerText = 0
          this.innerHTML = "x"
          this.classList.remove("bg-secondary", "hover:bg-main")
          this.classList.add("bg-red-500")
        } else {
          cartQuantity[i].innerText--
          this.innerHTML = "-"
          this.classList.add("bg-secondary", "hover:bg-main")
          this.classList.remove("bg-red-500")
        }
        let total = this.closest(".cart-card").querySelector(".total-price")
        let price = this.closest(".cart-card").querySelector(".price")
        total.innerText = cartQuantity[i].innerText * price.innerText
        // order summary
        let priceSumTotal = document.querySelector(".total-sum-price")
        let priceSumTotalFinal = document.querySelector(".total-sum-price-f")
        let totals = document.querySelectorAll(".total-price")
        let sum = 0
        for (let i = 0; i < totals.length; i++) {
          sum += Number(totals[i].innerText)
        }
        priceSumTotal.innerText = sum
        priceSumTotalFinal.innerText = sum
      })
      btnDec[i].addEventListener('click', function () {
        cartQuantity[i].innerText++
        let total = this.closest(".cart-card").querySelector(".total-price")
        let price = this.closest(".cart-card").querySelector(".price")
        total.innerText = cartQuantity[i].innerText * price.innerText
        // order summary
        let priceSumTotal = document.querySelector(".total-sum-price")
        let priceSumTotalFinal = document.querySelector(".total-sum-price-f")
        let totals = document.querySelectorAll(".total-price")
        let sum = 0
        for (let i = 0; i < totals.length; i++) {
          sum += Number(totals[i].innerText)
        }
        priceSumTotal.innerText = sum
        priceSumTotalFinal.innerText = sum
        btnInc[i].innerHTML = "-"
        btnInc[i].classList.add("bg-secondary", "hover:bg-main")
        btnInc[i].classList.remove("bg-red-500")
      })
    }
  } catch (error) {
    console.error("Error fetching JSON:", error);
    // productCard.innerHTML = `ERROR 404`
  }
}

if (!sessionStorage.getItem("cart")) {
  sessionStorage.setItem("cart", "")
}
getData([...sessionStorage.getItem("cart").split(",")])





let btnPlace = document.querySelector(".btn-place")
let orderMsg = document.querySelector(".order-msg")
btnPlace.addEventListener("click", function () {

  let notif = document.createElement("div")
  notif.className = "order-msg  h-50 w-100 bg-secondary/100 rounded-md text-white fixed top-2/4 text-5xl  scale-0 opacity-0 transition left-1/2 transform -translate-x-1/2 -translate-y-1/2 duration-300 z-50 flex justify-center items-center shadow-2xl border-main border-4"
  notif.innerText = "Order Placed!"

  let cartBody = document.querySelector(".cart-body")
  cartBody.prepend(notif)

  setTimeout(() => {
    notif.classList.remove("opacity-0", "scale-0")
  }, 10)
  setTimeout(() => {
    notif.classList.remove("opacity-1", "scale-100")
    notif.classList.add("opacity-0", "scale-0")
  }, 4000)

  setTimeout(() => {
    notif.remove()
  }, 5000)

  remove()
  document.querySelector(".cart-clear").classList.add("hidden")

})

document.querySelector(".cart-clear").addEventListener("click", function () {
  this.classList.add("hidden")
  remove()
})

function remove() {
  let btnPlace = document.querySelector(".btn-place")
  btnPlace.disabled = true
  btnPlace.style.backgroundColor = "grey"
  sessionStorage.removeItem("CartN")
  sessionStorage.setItem("cart", "")
  document.querySelector(".total-sum-price").innerHTML = 0
  document.querySelector(".total-sum-price-f").innerHTML = 0
  document.querySelector(".items-total").innerText = 0
  document.querySelector(".cart-number").innerText = ""
  document.querySelector(".cart-container").innerHTML = `
      <div class="flex h-full w-full flex-col">
      <p class="text-6xl  flex items-center justify-center h-full text-secondary ">Cart is empty !</p>
      <a class="underline text-secondary text-xl w-fit" href="products.html" > ← Continue Shopping</a>
      </div>
      `
}

// scroll
let goUp = document.querySelector(".goUp")
goUp.addEventListener("click", function () {
  document.getElementById("body").scrollIntoView({ behavior: "smooth" });
});