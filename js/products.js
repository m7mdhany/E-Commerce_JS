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

let cardContainer = document.getElementById("cardContainer")
let card = document.getElementById("card")
let cartNumber = document.querySelector(".cart-number")
if (sessionStorage.getItem("CartN") > 0) {
  cartNumber.innerText = sessionStorage.getItem("CartN")
}
let allCart = []
if (sessionStorage.getItem("cart")) {
  allCart = [...sessionStorage.getItem("cart").split(",")]
}
window.addEventListener("load", function () {
  // sessionStorage.setItem("cat", "");
});
// add color for selected cat
let sideCats = document.querySelectorAll(".side-categories button")
let res = Array.from(sideCats).find(item => item.innerText === sessionStorage.getItem("cat"))
if (res) { res.parentElement.classList.add("bg-main", "w-[115%]") } else { sideCats[0].parentElement.classList.add("bg-main", "w-[115%]") }




// main f
let filter = []
let search = false
let filterRule = ""
// send search filter
let searchItems = []
async function getData() {
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

    // randomize array
    for (let i = products.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]]; // Swap
    }
    filter = products


    // cat filter
    // let filter = products.filter(obj =>
    //   Object.values(obj).includes(val))

    function allProducts(arr, i) {
      return `
              <div
                class="card max:h-96 h-96 transition duration-300 ease-in-out flex gap-1 flex-col bg-white shadow-sm rounded-lg overflow-hidden">
                <div class="flex flex-col grow px-3 pt-3">
                  <div class="grow max-h-70 h-50 w-full cursor-pointer overflow-hidden">
                    <img class=" object-top object-cover h-full w-full transform transition duration-1000 hover:scale-150 /hover:object-bottom hover:translate-y-5" src= ../${arr[i].image} alt = "" >
                  </div >
                  <div class="h-1/4 flex flex-col justify-around ">
                  <h2 class="p-name text-center font-bold">${arr[i].name}</h2>
                  <h3 class="price"><span class="font-bold">Price</span> : ${arr[i].price.toLocaleString()} LE</h3>
                  </div>
                </div >
                  <button class="btn-cart p-2 self-center w-full cursor-pointer text-white bg-secondary hover:bg-main transition-all duration-200">Add to cart</button>
              </div>
            `
    }
    // filtering on demand --------------------------------------------------------
    startFilter = function (val, key) {
      if (val != "") {
        val = sessionStorage.getItem("cat")
      }
      if (search == false) {
        document.querySelector(".item-search").value = ""
        filter = products.filter(obj => {
          if (!val) return true;
          return Object.values(obj).includes(val);
        });
      }

      if (filterRule == "sort") {
        if (key === "1") {
          filter.sort((a, b) => a.price - b.price);
        } else if (key === "2") {
          filter.sort((a, b) => b.price - a.price);
          console.log(filter);
        } else if (key === "3") {
          filter.sort((a, b) => a.name.localeCompare(b.name));
        } else if (key === "4") {
          filter.sort((a, b) => b.name.localeCompare(a.name));
        }
      } else if (search == true) {
        filter = key
      }

      // add products of filter-------------------------------------------------------
      cardContainer.innerHTML = ``
      document.querySelector(".results").innerHTML = `Total : <span class="text-sec font-bold" > ${filter.length} Results</span>`
      for (let i = 0; i < filter.length; i++) {
        cardContainer.innerHTML += allProducts(filter, i)
      }
      addToCart()

      // show more products button------------------------------------------------------
      if (filterRule != "sort") {
        let height = cardContainer.offsetHeight;
        let newH
        if (height > 800) {
          cardContainer.style.maxHeight = `${415 * 2}px`
          document.querySelector(".more-cards").style.display = "block"
        }
        document.querySelector(".more-cards").addEventListener("click", function () {
          newH = cardContainer.offsetHeight;
          cardContainer.style.maxHeight = `${cardContainer.offsetHeight + (403 * 3)}px`
          // disable button
          cardContainer.addEventListener("transitionend", () => {
            if (newH == cardContainer.offsetHeight) {
              document.querySelector(".more-cards").style.display = "none"
            }
          });
        })
      }
      if (filter.length == 0) {
        document.querySelector(".more-cards").style.display = "none"
        cardContainer.innerHTML = `<p class="text-2xl w-full color-grey-300">No search results!</p>`

      }

      // product card page---------------------------------------------------------
      let allCards = document.querySelectorAll(".card img")
      let oneCard = document.querySelectorAll(".card .p-name")
      allCards.forEach((item, i) => item.addEventListener("click", function () {
        let card = oneCard[i].innerHTML
        sessionStorage.setItem("product", card)
        location.assign("product.html")
      }))
    }
    startFilter("cat")


    // search filter on demand ----------------------------------------------------
    let searchFilter = document.querySelector(".item-search")
    let searchBtns = document.querySelectorAll(".search-btns")
    searchBtns = Array.from(searchBtns)
    searchBtns.forEach((btn) => {
      filterRule = "search"
      btn.addEventListener("click", function () {
        btn.classList.toggle("bg-main")
        let text = btn.innerText.toLowerCase()
        if (!searchItems.includes(text)) {
          searchItems.push(text)
        } else {
          searchItems = searchItems.filter(item => item !== text);
        }
        searchFilter.value = ""
      });
    });
    searchFilter.addEventListener("input", function () {
      search = true
      if (this.value.length < 1) { search = false }
      resetSideBar()
      sessionStorage.removeItem("cat")
      let value = this.value.toLowerCase().trim();
      let searchProduct = products.filter((obj) => {
        let keys = searchItems.length ? searchItems : Object.keys(obj);
        return keys.some((key) =>
          String(obj[key]).toLowerCase().includes(value)
        );
      });

      filterRule = "search"
      startFilter("cat", searchProduct)
    })

    //  sorting -----------------------------------------------------------------
    let sorter = document.querySelector(".sorter")
    sorter.addEventListener("change", function () {
      let items = []
      if (search == true) { items = filter } else { items = products }
      filterRule = "sort"

      startFilter("cat", sorter.value)
    })




    // add to cart page
    function addToCart() {
      let prodsBody = document.querySelector(".prds-body")
      // prodsBody.prepend(notifCont)
      let btnCart = document.querySelectorAll(".btn-cart")
      btnCart.forEach(item => item.addEventListener("click", function () {
        let cart = this.parentElement.querySelector(".p-name").innerText
        let cartNumber = document.querySelector(".cart-number")
        let cartN = sessionStorage.getItem("CartN")

        // for notification
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

        // add to cart
        if (!allCart.includes(cart)) {
          cartN++
          allCart.push(cart)
        }
        sessionStorage.setItem("cart", allCart)
        sessionStorage.setItem("CartN", cartN)
        cartNumber.innerText = sessionStorage.getItem("CartN")
      }))
    }




    // end
  } catch (error) {
    console.error("Error fetching JSON:", error);
    cardContainer.innerHTML = `ERROR 404`
  }
}
// cats filter


getData(sessionStorage.getItem("cat"))
let cartAdd = document.querySelectorAll("cartAdd")


// side bar cat
let sideBar = document.querySelectorAll(".side-categories div div")
sideBar.forEach((element, i) => {
  let target = document.querySelectorAll(".side-categories button")[i].innerHTML
  element.addEventListener("click", function () {
    sideBar.forEach((element) => {
      element.classList.remove("bg-main", "w-full", "w-[115%]")
    })
    this.classList.add("bg-main", "w-[115%]")
    lastElement = this
    if (target == "All Products") { target = "" }
    sessionStorage.setItem("cat", target)
    filterRule = "cat"
    search = false
    startFilter(target);
  })
})
function resetSideBar() {
  for (let i = 0; i < sideBar.length; i++) {
    sideBar[i].classList.remove("bg-main", "w-full", "w-[115%]")
  }
}

// scroller
let goUp = document.querySelector(".goUp")
goUp.addEventListener("click", function () {
  document.getElementById("body").scrollIntoView({ behavior: "smooth" });
});


// let btnCart = document.querySelectorAll(".btn-cart")
// for (btn of btnCart) {
//   btn.addEventListener("click", function () {
//     let notifCont = document.createElement("div")
//     let notif = document.createElement("div")
//     notif.className = "order-msg w-100 h-30 rounded-2xl  bg-main/50 text-white fixed top-2/4 text-5xl transition right-40 transform translate-x-1/2 /-translate-y-1/2 duration-300 z-50 flex justify-start pl-7 items-center shadow-2xl border-main border-4"
//     notif.innerText = "Order Placed!"

//     let prodsBody = document.querySelector(".prds-body")
//     prodsBody.prepend(notifCont)
//     notifCont.prepend(notif)


//   })
// }