const btn = document.querySelector('#btn');
const options = document.querySelectorAll('.pass');

const char = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '/', '?']

let randStr = ""

function password() {
    for (let option of options) {
        for (let i = 1; i < 9; i++) {
          let rand = Math.floor(Math.random() * 76);
          let randChar = char[rand].toString();
          randStr += randChar;
        }
        option.innerHTML = `<p>${randStr}</p>`;
        randStr = "";
    }
}

btn.addEventListener("click", password)
