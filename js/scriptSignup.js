if (localStorage.getItem("online") || sessionStorage.getItem("online")) {
  location.replace("../index.html")
}

let logo = document.querySelector(".logo_bar")
logo.addEventListener("click", () => { location.assign("../index.html") })

let signUpForm = document.getElementById("signUp")
let formRegLink = document.getElementById("regForm")
let showPass = document.querySelectorAll(".passDiv i")

// sign up
let userPattern = /^[A-Za-z0-9_]{8,16}$/;
let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let passPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,16}$/

let username = document.getElementById("username")
let email = document.getElementById("email")
let password = document.getElementById("password")
let confirmPassword = document.getElementById("confirm_password")
let upSpans = document.querySelectorAll("#signUp .spans >span:first-child")
let inputs = [username, email, password, confirmPassword]
let upBtn = document.getElementById("upBtn")
let signupValid = [false, false, false, false]
upBtn.addEventListener("click", function () {
  if (username.value.length == 0) {
    upSpans[0].innerHTML = "Please fill this field"
    username.style.border = "red solid 2px"
    signupValid[0] = false
  } else if (!userPattern.test(username.value)) {
    upSpans[0].innerHTML = "invalid Username check ! "
    username.style.border = "red solid 2px"
    signupValid[0] = false
  } else if (localStorage.getItem(username.value)) {
    upSpans[0].innerHTML = "Username already used !"
    username.style.border = "red solid 2px"
  }
  else {
    signupValid[0] = true
  }
  if (email.value.length == 0) {
    upSpans[1].innerHTML = "Please fill this field"
    email.style.border = "red solid 2px"
    signupValid[1] = false
  } else if (!emailPattern.test(email.value)) {
    upSpans[1].innerHTML = "invalid email check !"
    email.style.border = "red solid 2px"
    signupValid[1] = false
  } else if (localStorage.getItem(email.value)) {
    upSpans[1].innerHTML = "Email already used !"
    email.style.border = "red solid 2px"
  }
  else {
    signupValid[1] = true
  }
  if (password.value.length == 0) {
    upSpans[2].innerHTML = "Please fill this field"
    password.style.border = "red solid 2px"
    signupValid[2] = false
  } else if (!passPattern.test(password.value)) {
    upSpans[2].innerHTML = "invalid password check !"
    password.style.border = "red solid 2px"
    signupValid[2] = false
  } else {
    signupValid[2] = true
  }
  if (confirmPassword.value.length == 0) {
    upSpans[3].innerHTML = "Please fill this field"
    confirmPassword.style.border = "red solid 2px"
    signupValid[3] = false
  } else if (password.value != confirmPassword.value) {
    upSpans[3].innerHTML = "Passwords don't match"
    confirmPassword.style.border = "red solid 2px"
    signupValid[3] = false
  } else {
    signupValid[3] = true
  }
  if (!signupValid.includes(false)) {
    let userData = {
      name: username.value,
      password: password.value,
      email: email.value,
      role: ""
    };
    localStorage.setItem(username.value, JSON.stringify(userData));
    localStorage.setItem(email.value, email.value);
    sessionStorage.setItem("online", username.value)
    signUpForm.remove()

    let text = "Account Created...".split("")
    console.log(text);
    let form = document.querySelector(".sup_form")
    form.innerHTML = ``
    form.className = "new-form "
    text.forEach((t, i) => {
      setTimeout(() => {
        form.innerHTML += t
        if (i = text.length) {
          setTimeout(() => {
            location.replace("../index.html")
          }, text.length * 200 + 500)
        }
      }, i * 200);
    });

    inputs.forEach(function (i) {
      i.value = ""
    })
  }
})

inputs.forEach(function (item, i) {
  item.addEventListener("input", function () {
    if (this.value.length == 0) {
      this.style.border = "red solid 2px"
    } else {
      this.style.border = "black solid 1px"
      upSpans[i].innerHTML = "*"
    }

  })
})

showPass[0].addEventListener("click", function () {
  if (password.type == "password") {
    password.type = "text"
    this.style.color = "#ff9800"
  } else {
    password.type = "password"
    this.style.color = "rgb(203, 203, 203)"
  }
})
showPass[1].addEventListener("click", function () {
  if (confirmPassword.type == "password") {
    confirmPassword.type = "text"
    this.style.color = "#ff9800"
  } else {
    confirmPassword.type = "password"
    this.style.color = "rgb(203, 203, 203)"
  }
})


formRegLink.addEventListener("click", function () {
  location.assign("login.html")
})

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    upBtn.click();
  }
});


