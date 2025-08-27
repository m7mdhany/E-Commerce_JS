let sliders = document.querySelectorAll(".slider")
let sliderContainer = document.querySelector(".slider-container")
// 
let slidesDelay = 10
let slidesSpeed = 200
let slidesHold = 4500
let slidesReset = 4000
let sliderHold = 6000
let restartDelay = 1300
let sliderTransition = "transform 1.2s ease-in-out"
let slidesTransition = "transform 1.5s ease-in-out"
let slidesLeaveTransition = "transform 1s ease-in-out"

let currentIndex = 1
let slideCount = sliders.length
let slideWidth = 100

let firstClone = sliders[0].cloneNode(true)
let lastClone = sliders[sliders.length - 1].cloneNode(true)

firstClone.id = "first-clone"
lastClone.id = "last-clone"

sliderContainer.appendChild(firstClone)
sliderContainer.prepend(lastClone)

sliderContainer.style.transform = `translateX(-${slideWidth * currentIndex}%)`

function moveToIndex(index) {
  sliderContainer.style.transition = sliderTransition
  sliderContainer.style.transform = `translateX(-${slideWidth * index}%)`
  startSlide(currentIndex)
  updateIndicators()
}

let sliderSlice = document.querySelectorAll(".slider")
let sectionIndex = 1

let timeOuts = []

function startSlide(cIndex) {
  let t01 = setTimeout(() => {
    sliderSlice[cIndex].querySelectorAll(".sliderSection").forEach((element, i) => {
      let t02 = setTimeout(
        function () {
          element.style.transition = slidesTransition;
          element.style.transform = "translateX(0)";
          if (i == sliderSlice[cIndex].querySelectorAll(".sliderSection").length - 1) {
            let t03 = setTimeout(() => {
              next(cIndex);
            }, slidesHold);
            timeOuts.push(t03);
          }
        }, i * slidesSpeed - slidesSpeed * 0.7);
      timeOuts.push(t02);
    });
  }, slidesDelay);
  timeOuts.push(t01);

  function next(cIndex) {
    sliderSlice[cIndex].querySelectorAll(".sliderSection").forEach((element, i) => {
      let t04 = setTimeout(
        function () {
          element.style.transition = slidesLeaveTransition
          element.style.transform = "translateX(-2000px)";
          if (i == sliderSlice[cIndex].querySelectorAll(".sliderSection").length - 1) {
            let t05 = setTimeout(() => {
              resetSlider(cIndex)
            }, slidesReset)
            timeOuts.push(t05)
          }
        }, i * slidesSpeed * 1)
      timeOuts.push(t04)
    });
  }
}

function resetSlider(cIndex) {
  sliderSlice[cIndex].querySelectorAll(".sliderSection").forEach((element, i) => {
    element.style.transition = "none"
    element.style.transform = "translateX(1500px)";
  })

}


function sliderTime() {
  if (currentIndex >= slideCount + 1) return
  currentIndex++
  moveToIndex(currentIndex)
}

let sliderTimer = setInterval(() => {
  sliderTime()
}, sliderHold)

startSlide(currentIndex)

// Infinite engine ---------------------------------------------------------------- 
sliderContainer.addEventListener("transitionend", () => {
  if (sliderContainer.children[currentIndex].id === "first-clone") {
    startSlide(1)
    startSlide(currentIndex)
    let t06 = setTimeout(() => {
      sliderContainer.style.transition = "none"
      document.querySelectorAll(".slider").forEach((element, i) => {
        element.style.transition = "all"
      })
      currentIndex = 1
      sliderContainer.style.transform = `translateX(-${slideWidth * currentIndex}%)`
      updateIndicators()
    }, restartDelay)
  }

  if (sliderContainer.children[currentIndex].id === "last-clone") {
    sliderContainer.style.transition = "none"
    currentIndex = slideCount
    sliderContainer.style.transform = `translateX(-${slideWidth * currentIndex}%)`
    startSlide(currentIndex)
    updateIndicators()
  }
})
// ---------------------------------------------------------------------------------
// indicators
let indicatorsContainer = document.querySelector(".indicators")
let indicators = []
let indicator = document.querySelectorAll(".indicators div")[0]
let sliderSections = document.querySelectorAll(".sliderSection")

function clearAllTimeouts() {
  timeOuts.forEach(id => clearTimeout(id));
}

for (let i = 0; i < slideCount; i++) {
  let indi = document.createElement("div")
  indi.classList.add("w-5", "h-5", "bg-gray-400", "cursor-pointer")
  if (i + 1 === currentIndex) {
    indi.classList.add("bg-main")
    indi.classList.remove("bg-gray-400")
  }
  indi.addEventListener('click', () => {
    for (let i = 0; i < sliderSections.length; i++) {
      sliderSections[i].style.transition = `none`
      sliderSections[i].style.transform = `translateX(1500px)`
    }
    clearAllTimeouts();
    clearInterval(sliderTimer)
    sliderTimer = setInterval(() => { sliderTime() }, sliderHold)
    currentIndex = i + 1
    moveToIndex(currentIndex)
    updateIndicators()
  })
  indicatorsContainer.appendChild(indi)
  indicators.push(indi)
}

function updateIndicators() {
  indicators.forEach((indi, idx) => {
    indi.classList.toggle('bg-main', idx + 1 === currentIndex)
    indi.classList.toggle('bg-gray-400', idx + 1 != currentIndex)
  })
}
// slider navigation
let slidBtn = document.querySelectorAll(".go-slide")
let slidBtn2 = document.querySelectorAll(".go-slider")

for (let i = 0; i < slidBtn.length; i++) {
  slidBtn[i].addEventListener("click", () => {
    clearAllTimeouts()
    clearInterval(sliderTimer)
    sliderTimer = setInterval(() => { sliderTime() }, sliderHold)
    if (i === 0) {
      if (currentIndex > 0) {
        resetSlider(currentIndex)
        currentIndex--
        moveToIndex(currentIndex)
      }
    } else {
      if (currentIndex < slideCount + 1) {
        resetSlider(currentIndex)
        currentIndex++
        moveToIndex(currentIndex)
      }
    }
  })
}
for (let i = 0; i < slidBtn2.length; i++) {
  slidBtn2[i].addEventListener("click", () => {
    clearAllTimeouts()
    clearInterval(sliderTimer)
    sliderTimer = setInterval(() => { sliderTime() }, sliderHold)
    resetSlider(currentIndex)
    if (i === 0) {
      if (currentIndex > 0) {
        currentIndex--
        moveToIndex(currentIndex)
      }
    } else {
      if (currentIndex < slideCount + 1) {
        currentIndex++
        moveToIndex(currentIndex)
      }
    }
  })
}
