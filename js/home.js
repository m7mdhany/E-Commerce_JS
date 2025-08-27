let navUser = document.getElementById("navUser")
if (localStorage.getItem("online") || sessionStorage.getItem("online")) {
  document.querySelector(".signout").classList.remove("hidden")
  if (localStorage.getItem("online")) {
    navUser.innerText = localStorage.getItem("online")
  } else {
    navUser.innerText = sessionStorage.getItem("online")
  }
} else {
  navUser.innerText = "Guest"
}
if (!sessionStorage.getItem("trueCart")) {
  sessionStorage.setItem("CartN", 0)
}
sessionStorage.setItem("trueCart", true)
let cartNumber = document.querySelector(".cart-number")
if (sessionStorage.getItem("CartN") > 0) {
  cartNumber.innerText = sessionStorage.getItem("CartN")
}
// scroller
let goUp = document.querySelector(".goUp")
goUp.addEventListener("click", function () {
  document.getElementById("body").scrollIntoView({ behavior: "smooth" });
});

// categories
let catLinks = document.querySelectorAll(".cat-link")
catLinks.forEach((item, i) => item.addEventListener("click", () => {
  let cat = document.querySelectorAll(".cat-link h3")[i].innerText
  console.log(cat);
  sessionStorage.setItem("cat", cat)
  location.assign("html/products.html")
}))

let allCart = []
if (sessionStorage.getItem("cat")) {
  allCart = [...sessionStorage.getItem("cat").split(",")]
}

// new arrivals cards
let arrivalsContainer = document.querySelector(".arrivals-container")

// offer cards
let offerContainer = document.querySelector(".offer-container")

// main f
async function getData(val1 = undefined, val2 = undefined) {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    products = data.products

    // new arrivals
    arrivalsContainer.innerHTML = ``
    let filter = products.filter((obj, i) => {
      for (let i = 0; i < val1.length; i++) {
        if (Object.values(obj).includes(val1[i])) {
          return obj
        }
      }
    });
    for (let i = 0; i < filter.length; i++) {
      arrivalsContainer.innerHTML += `
        <div
            class="arrival-card /shadow-md border-gray-500 flex flex-col max-h-96 h-96 min-h-96 items-center w-full relative cursor-pointer">
            <p class="z-5 font-bold text-white absolute text-2xl text-shadow-lg top-0 left-0 -rotate-45">
              NEW!
            </p>
            <div class=" w-3/4 overflow-hidden grow h-100 mt-5 rounded-t-2xl border-x-1 border-t-1 border-secondary">
              <img class="object-cover h-full m-auto" src="../${filter[i].image}" alt="">
            </div>
            <div class="w-full flex flex-col items-center bg-white shadow-lg">
              <h3 class="text-center font-bold rounded-2xl text-xl h-13 flex items-center p-2">${filter[i].name}</h3>
              <span class="w-fit text-center bg-main text-xl p-1 text-secondary font-bold absolute right-0 top-60">
              ${filter[i].price} LE</span>
              <button class="btn-cart bg-secondary hover:bg-main font-bold py-2 cursor-pointer w-full text-white">
                Add to cart</button>
            </div>
            <div class="h-20 w-full absolute overflow-hidden ">
              <div class="w-15 h-30 bg-main absolute -top-10 -left-5 rotate-45 flex">
              </div>
            </div>
          </div>
          `
    }

    // limited offers
    offerContainer.innerHTML = ``
    filter = products.filter((obj, i) => {
      for (let i = 0; i < val2.length; i++) {
        if (Object.values(obj).includes(val2[i])) {
          return obj
        }
      }
    });
    for (let i = 0; i < filter.length; i++) {
      offerContainer.innerHTML += `
          <div
            class="offer-card   rounded-md /shadow-md border-gray-500 flex flex-col max-h-96 h-96 min-h-96 items-center w-full relative  cursor-pointer">
            <p class="z-5 font-bold text-red-600 absolute text-2xl text-shadow-lg top-0 -left-5 -rotate-45">
              LIMITED!
            </p>
            <div class=" w-3/4 overflow-hidden grow h-100 mt-5 rounded-t-2xl border-x-1 border-t-1 border-secondary">
              <img class="object-cover h-full m-auto" src="../${filter[i].image}" alt="">
            </div>
            <div class="w-full flex flex-col items-center  bg-white shadow-2xl">
              <h3 class="text-center font-bold rounded-2xl h-13 flex items-center text-md ">${filter[i].name}</h3>
              <div class="absolute  top-60 flex w-5/6">
                <p class="timer p-1 w-full grow text-main font-bold text-center bg-white px-2">
                  00:00:00</p>
                <span class="w-fit text-center bg-main p-1 text-red-600 line-through font-bold whitespace-nowrap ">
                ${filter[i].price} LE</span>
                <span class="w-fit text-center bg-main p-1 text-white font-bold whitespace-nowrap">
                ${filter[i].price - (filter[i].price * filter[i].discount)}  LE</span>
              </div>
              <button class="btn-cart bg-secondary hover:bg-main font-bold py-2 cursor-pointer w-full text-white">
                Add to cart</button>
            </div>
            <div class="h-20 w-full absolute overflow-hidden ">
              <div class="w-15 h-30 bg-main absolute -top-10 -left-5 rotate-45 flex">
              </div>
            </div>
          </div>
          `
    }

    let timer = document.querySelectorAll(".timer")
    // offers timer
    console.log(timer);
    timer.forEach(element => {
      let sec = Math.floor((Math.random() * (6000 - 2000 + 1)) + 2000)
      startCountdown(sec, element);
    });

    function startCountdown(totalSeconds, element) {
      let timerElement = element
      let counter = totalSeconds;

      function formatTime(sec) {
        const hours = Math.floor(sec / 3600);
        const minutes = Math.floor((sec % 3600) / 60);
        const seconds = sec % 60;
        return (
          String(hours).padStart(2, "0") + ":" +
          String(minutes).padStart(2, "0") + ":" +
          String(seconds).padStart(2, "0")
        );
      }

      timerElement.innerText = formatTime(counter);

      const interval = setInterval(() => {
        counter--;
        timerElement.innerText = formatTime(counter);

        if (counter <= 0) {
          clearInterval(interval);
          timerElement.innerText = "00:00:00";
        }
      }, 1000);
    }


    let allCards = document.querySelectorAll(".offer-card img, .arrival-card img");
    let oneCard = document.querySelectorAll(".offer-card h3 , .arrival-card h3")
    console.log(allCards);
    allCards.forEach((item, i) => item.addEventListener("click", function () {
      let card = oneCard[i].innerHTML
      sessionStorage.setItem("product", card)
      location.assign("html/product.html")
    }))






    // add to cart page

    let btnCart = document.querySelectorAll(".btn-cart")
    btnCart.forEach(item => item.addEventListener("click", function () {
      let test = document.querySelector(".notif-cont")
      let cart = this.parentElement.parentElement.querySelector("h3").innerText
      let cartNumber = document.querySelector(".cart-number")
      let cartN = sessionStorage.getItem("CartN")


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
  }

};

getData(["Apple 17 pro MAX", "PlayStation 5 Pro", "Sharp Front Load Washing Machine", "Sonai Blender"], ["Milk Shake Strawberry", "Lemon", "Tornado TST-700 Toaster maker", "Tornado TCME-100D-PRO Coffe machine"])
