const game = document.querySelector(".game")
const keyboardContainer = document.querySelector(".keyboard-container")
const request = document.querySelector(".request")
const live1 = document.querySelector(".live1")
const live2 = document.querySelector(".live2")
const live3 = document.querySelector(".live3")
const levelOne = document.querySelector(".level-one")
const levelTwo = document.querySelector(".level-two")
const levelThree = document.querySelector(".level-three")
const title = document.querySelector(".title")
const levelContainer = document.querySelector(".level-container")
const levels = document.querySelector(".levels")
const wall = document.querySelector(".wall")

let times = 0
let energy = 40
let boost = 0
let speed = 0
let power = -100
let lives = 3
let keyWidth = 10
let keyHeight = 35
let counter = 0
let englishNumbers = []
let persianNumbers = []
for (let i = 0; i <= 25; i++) {
  englishNumbers.push(i)
  persianNumbers.push(i)
}
let enAlphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
let PeAlphabet = [
  "ای",
  "بیی",
  "سیی",
  "دیی",
  "ایی",
  "اف",
  "جیی",
  "هچ",
  "آی",
  "جی",
  "کی",
  "ال",
  "ام",
  "ان",
  "او",
  "پی",
  "کیو",
  "آر",
  "اس",
  "تی",
  "یو",
  "ویی",
  "دبل یو",
  "اکس",
  "وای",
  "زی",
]

document.documentElement.style.setProperty("--full-height", window.innerHeight + "px")
document.documentElement.style.setProperty("--less-height", window.innerHeight / 1.1 + "px")

document.addEventListener("click", chooseLevel)
function chooseLevel() {
  document.removeEventListener("click", chooseLevel)
  let int = setInterval(function () {
    if (energy > 10) energy--
    if (energy < 11 && boost < 4) {
      moveTheLevel()
      boost++
    }
    if (energy === 15) {
      levelOne.classList.add("getReady")
      levelTwo.classList.add("getReady")
    }
    document.documentElement.style.setProperty("--energy", energy + "px")
    document.documentElement.style.setProperty("--boost", boost + "px")
    if (energy === 10 && boost === 3) clearInterval(int)
  }, 100)

  function moveTheLevel() {
    let int = setInterval(function () {
      levelOne.style.left = speed + "px"
      levelTwo.style.left = speed + "px"
      levelThree.style.bottom = power + "px"
      speed++
      power++
      if (power > window.innerHeight) {
        speed = -100
        power = -200
      }
      levelOne.onclick = function () {
        times++
        clearInterval(int)
        if (times === 1) title.innerHTML = "It Is Getting Slow!"
        if (times === 2) title.innerHTML = "One More Time!"
        if (times === 3) {
          title.innerHTML = "Got It!"
          setTimeout(function () {
            levels.style.display = "none"
            game.style.display = "flex"
            startGame()
          }, 2000)
        }
      }
    }, 50)
  }
}

window.addEventListener("resize", setupGame)
function setupGame() {
  levelContainer.style.height = window.innerHeight + "px"
  game.style.width = window.innerWidth / 1.1 + "px"
  game.style.height = window.innerHeight / 1.2 + "px"
}
setupGame()

function startGame() {
  title.innerHTML = "Alphabet Game"
  setTimeout(function () {
    let int = setInterval(spawnKeys, 300)
    request.innerHTML = "Get Ready"

    function spawnKeys() {
      if (counter < 26) {
        counter++
        const newKeys = document.createElement("div")
        newKeys.classList.add("keys")
        keyboardContainer.appendChild(newKeys)
      }

      if (counter === 11) request.innerHTML = "3"
      if (counter === 14) request.innerHTML = "2"
      if (counter === 17) request.innerHTML = "1"
      if (counter === 20) request.innerHTML = "Start!"

      if (counter === 26) {
        clearInterval(int)
        const allKeys = Array.from(document.querySelectorAll(".keyboard-container div"))
        allKeys.forEach((index) => {
          let random = Math.floor(Math.random() * englishNumbers.length)
          let randomIndex = englishNumbers[random]
          index.innerHTML = enAlphabet[randomIndex]
          englishNumbers.splice(random, 1)
        })

        createRequest()
        function createRequest() {
          if (persianNumbers.length === 0 && lives != 0) request.innerHTML = `You<br>Win!`
          let random = Math.floor(Math.random() * persianNumbers.length)
          let randomIndex = persianNumbers[random]
          request.innerHTML = PeAlphabet[randomIndex]
          persianNumbers.splice(random, 1)

          for (let i = 0; i < keyboardContainer.children.length; i++) {
            keyboardContainer.children[i].onclick = function () {
              keyboardContainer.children[i].classList.add("whenClick")
              setTimeout(function () {
                keyboardContainer.children[i].classList.remove("whenClick")
              }, 200)
              let englishLetter = keyboardContainer.children[i].textContent
              let englishPosition = enAlphabet.indexOf(englishLetter)
              let persianLetter = request.textContent
              let persianPosition = PeAlphabet.indexOf(persianLetter)

              if (englishPosition === persianPosition) createRequest()

              if (englishPosition != persianPosition) {
                setTimeout(function () {
                  lives--
                  game.classList.add("shake")
                  setTimeout(function () {
                    game.classList.remove("shake")
                  }, 2000)
                  if (lives === 2) live3.classList.add("gone")
                  if (lives === 1) live2.classList.add("gone")
                  if (lives === 0) {
                    live1.classList.add("gone")
                    wall.style.display = "block"
                    setTimeout(function () {
                      title.innerHTML = "You Lose!"
                      game.style.opacity = "0"
                      game.style.transition = "opacity 1s"
                    }, 2000)
                  }
                }, 500)
              }
            }
          }
        }
      }
    }
  }, 2000)
}
