;(function() {
  "use strict"
  var availableLetters,
    commonWords,
    guessInput,
    guess,
    guessButton,
    lettersGuessed,
    lettersMatched,
    output,
    man,
    letters,
    lives,
    currentWord,
    numLettersMatched,
    messages,
    usedLetters

  function setup() {
    availableLetters = "abcdefghijklmnopqrstuvwxyz"
    lives = 6

    commonWords = [
      "the",
      "and",
      "you",
      "that",
      "was",
      "for",
      "are",
      "with",
      "his",
      "they",
      "this",
      "have",
      "from",
      "one",
      "had",
      "word",
      "but",
      "not",
      "what",
      "all",
      "were",
      "when",
      "your",
      "can",
      "said",
      "there",
      "use",
      "each",
      "which",
      "she",
      "how",
      "their",
      "will",
      "other",
      "about",
      "out",
      "many",
      "then",
      "them",
      "these",
      "some",
      "her",
      "would",
      "make",
      "like",
      "him",
      "into",
      "time",
      "has",
      "look",
      "two",
      "more",
      "write",
      "see",
      "number",
      "way",
      "could",
      "people",
      "than",
      "first",
      "water",
      "been",
      "call",
      "who",
      "oil",
      "its",
      "now",
      "find",
      "long",
      "down",
      "day",
      "did",
      "get",
      "come",
      "made",
      "may",
      "part"
    ]

    messages = {
      win: "You win!",
      lose: "Game over!",
      guessed: "already guessed, please try a different letter",
      validLetter: "Please enter a letter from A-Z"
    }

    lettersGuessed = lettersMatched = ""
    numLettersMatched = 0

    currentWord = commonWords[Math.floor(Math.random() * commonWords.length)]

    output = document.getElementById("output")
    man = document.getElementById("man")
    guessInput = document.getElementById("letter")

    man.innerHTML = `You have ${lives} lives remaining`
    output.innerHTML = ""

    document.getElementById("letter").value = ""

    guessButton = document.getElementById("guess")

    letters = document.getElementById("letters")
    letters.innerHTML = '<li class="current-word">Current word:</li>'

    var letter, i
    for (i = 0; i < currentWord.length; i++) {
      letter =
        '<li class="letter letter' +
        currentWord.charAt(i) +
        '">' +
        currentWord.charAt(i) +
        "</li>"
      letters.insertAdjacentHTML("beforeEnd", letter)
    }
  }

  function gameOver(win) {
    if (win) {
      output.innerHTML = messages.win
      output.classList.add("win")

      var giphyTwo = document.getElementById("gifTwo")
      giphyTwo.style.visibility = "visible"

      var sound1 = document.getElementById("winSound")
      sound1.play()
    } else {
      output.innerHTML = messages.lose
      output.classList.add("error")

      var giphy = document.getElementById("gif")
      giphy.style.visibility = "visible"

      var sound2 = document.getElementById("loseSound")
      sound2.play()
    }

    guessInput.value = ""
  }

  window.onload = setup()

  document.getElementById("restart").onclick = setup

  guessInput.onclick = function() {
    this.value = ""
  }

  document.getElementById("hangman").onsubmit = handleSubmit

  function handleSubmit(e) {
    if (e.preventDefault) e.preventDefault()
    output.innerHTML = ""
    output.classList.remove("error", "warning")
    guess = guessInput.value.toLowerCase()

    if (guess) {
      if (availableLetters.indexOf(guess) > -1) {
        if (
          (lettersMatched && lettersMatched.indexOf(guess) > -1) ||
          (lettersGuessed && lettersGuessed.indexOf(guess) > -1)
        ) {
          output.innerHTML = '"' + guess + '"' + messages.guessed
          output.classList.add("warning")
        } else if (currentWord.indexOf(guess) > -1) {
          var lettersToShow
          lettersToShow = document.querySelectorAll(".letter" + guess)

          for (var i = 0; i < lettersToShow.length; i++) {
            lettersToShow[i].classList.add("correct")
          }

          for (var j = 0; j < currentWord.length; j++) {
            if (currentWord.charAt(j) === guess) {
              numLettersMatched += 1
            }
          }

          lettersMatched += guess
          if (numLettersMatched === currentWord.length) {
            gameOver(true)
          }
        } else {
          lettersGuessed += guess
          lives--

          var error1 = document.getElementById("head")
          var error2 = document.getElementById("body")
          var error3 = document.getElementById("rightA")
          var error4 = document.getElementById("leftA")
          var error5 = document.getElementById("rightL")
          var error6 = document.getElementById("leftL")

          if (lives === 5) {
            error1.style.visibility = "visible"
          } else if (lives === 4) {
            error2.style.visibility = "visible"
          } else if (lives === 3) {
            error3.style.visibility = "visible"
          } else if (lives === 2) {
            error4.style.visibility = "visible"
          } else if (lives === 1) {
            error5.style.visibility = "visible"
          } else if (lives === 0) {
            error6.style.visibility = "visible"
            gameOver(false)
          } else {
            output.classList.add("error")
            output.innerHTML = messages.validLetter
          }

          var health = document.getElementById("health")

          if (lives === 5) {
            health.style.width = 83.3 + "%"
          } else if (lives === 4) {
            health.style.width = 66.64 + "%"
          } else if (lives === 3) {
            health.style.width = 49.98 + "%"
          } else if (lives === 2) {
            health.style.width = 33.32 + "%"
          } else if (lives === 1) {
            health.style.width = 16.66 + "%"
          } else if (lives === 0) {
            health.style.width = 0 + "%"
            gameOver(false)
          } else {
            output.classList.add("error")
            output.innerHTML = messages.validLetter
          }

          man.innerHTML = `You have ${lives} lives remaining.`
          copy()
          if (lives === 0) gameOver()
        }
      } else {
        output.classList.add("error")
        output.innerHTML = messages.validLetter
      }
    } else {
      output.classList.add("error")
      output.innerHTML = messages.validLetter
    }
    return false
  }

  function copy() {
    var usedLetters = []
    usedLetters.push(lettersGuessed)
    document.getElementById("usedLetters").innerHTML = usedLetters[0]
  }
})()
