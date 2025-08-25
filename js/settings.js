let btnPlace = document.querySelector(".btn-place")
let orderMsg = document.querySelector(".order-msg")
btnPlace.addEventListener("click", function () {

  let notif = document.createElement("div")
  notif.className = "order-msg w-2/4 h-1/4 bg-secondary text-white fixed top-2/4 text-5xl scale-0 opacity-0 transition left-1/2 transform -translate-x-1/2 -translate-y-1/2 duration-300 z-50 flex justify-center items-center shadow-2xl border-main border-4"
  notif.innerText = "Order Placed!"

  let cartBody = document.querySelector(".cart-body")
  cartBody.appendChild(notif)

  setTimeout(() => {
    notif.classList.remove("opacity-0", "scale-0")
    notif.classList.add("opacity-1", "scale-1")
  }, 10)
  setTimeout(() => {
    notif.classList.remove("opacity-1", "scale-1")
    notif.classList.add("opacity-0", "scale-0")
  }, 2000)

  setTimeout(() => {
    notif.remove()
  }, 3000)
  sessionStorage.removeItem("CartN")
  sessionStorage.setItem("cart", "")
  document.querySelector(".total-sum-price").innerHTML = 0
  document.querySelector(".total-sum-price-f").innerHTML = 0
  document.querySelector(".items-total").innerText = 0
  document.querySelector(".cart-number").innerText = ""
  document.querySelector(".cart-container").innerHTML = `
      <div class="flex h-full w-full flex-col">
      <p class="text-6xl  flex items-center justify-center h-full text-secondary ">Cart is empty !</p>
      <a class="underline text-secondary text-xl" href="products.html" >Continue Shopping!</a>
      </div>
      `
})