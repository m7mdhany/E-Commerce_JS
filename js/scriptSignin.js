if (localStorage.getItem("online") || sessionStorage.getItem("online")) {
  location.replace("http://127.0.0.1:5500/home.html")
}


let signInForm = document.getElementById("signIn")
let signUpForm = document.getElementById("signUp")
let formSignLink = document.getElementById("signForm")
let formRegLink = document.getElementById("regForm")
// localStorage.clear()


let logo = document.querySelector(".logo_bar")
logo.addEventListener("click", () => { location.assign("../index.html") })

// sign in
let userUsername = document.getElementById("userUsername")
let userPassword = document.getElementById("userPassword")
let signBtn = document.getElementById("signBtn")
let signSpan = document.querySelectorAll("#signIn span")
let showPass = document.querySelectorAll(".passDiv i")
let signValid = [false, false]
signBtn.addEventListener("click", function () {
  if (userUsername.value.length == 0) {
    signSpan[0].innerHTML = "please add Username"
    userUsername.style.border = "solid red 2px"
    signValid[0] = false
  } else {
    signValid[0] = true
  }
  if (userPassword.value.length == 0) {
    signSpan[1].innerHTML = "please add Password"
    userPassword.style.border = "solid red 2px"
    signValid[0] = false
  } else {
    signValid[1] = true
  }

  if (!signValid.includes(false)) {
    let storedUser = JSON.parse(localStorage.getItem(userUsername.value));
    if (storedUser && storedUser.password == userPassword.value) {
      if (remember.checked == true) {
        localStorage.setItem("online", userUsername.value)
        sessionStorage.removeItem("online");
      } else {
        sessionStorage.setItem("online", userUsername.value)
        localStorage.removeItem("online");
      }
      location.replace("../index.html")
    } else {
      signSpan[0].innerHTML = "Invalid Username or Password"
    }
  }

})

userUsername.addEventListener("input", function () {
  if (this.value.length == 0) {
    this.style.border = "solid red 2px"
  } else {
    this.style.border = "solid black 1px"
    document.querySelectorAll("#signIn span")[0].innerHTML = ""

  }
})

userPassword.addEventListener("input", function () {
  if (this.value.length == 0) {
    this.style.border = "solid red 2px"
  } else {
    this.style.border = "solid black 1px"
    document.querySelectorAll("#signIn span")[1].innerHTML = ""

  }
})

showPass[0].addEventListener("click", function () {
  if (userPassword.type == "password") {
    userPassword.type = "text"
    this.style.color = "#ff9800"
  } else {
    userPassword.type = "password"
    this.style.color = "rgb(203, 203, 203)"
  }
})


formSignLink.addEventListener("click", function () {
  location.assign("signup.html")
})

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    signBtn.click();
  }
});