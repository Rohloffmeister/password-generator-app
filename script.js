let includeUppercase = true;
let includeLowercase = false;
let includeNumbers = false;
let includeSymbols = false;
let characterLength = 10;

const strengthStatus = document.getElementById("strength-status");
const strengthBars = document.getElementsByClassName("bar");
const includeUppercaseCheckbox = document.getElementById("include-uppercase");
const includeLowercaseCheckbox = document.getElementById("include-lowercase");
const includeNumbersCheckbox = document.getElementById("include-numbers");
const includeSymbolsCheckbox = document.getElementById("include-symbols");
const slider = document.getElementById("character-length");
const passwordResult = document.getElementById("result");
const sliderValueContainer = document.getElementById("slider-value");


slider.addEventListener("input", function () {
  sliderValueContainer.innerHTML = this.value;
  calculateStrength();
  const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;

  slider.style.background = `linear-gradient(to right, var(--light-neon-green) ${value}%, var(--dark-gray) ${value}%)`;
});

document.addEventListener("DOMContentLoaded", function () {

  calculateStrength();
  console.log(randomSymbol());
});

document.querySelector(".options").addEventListener("change", function (event) {
  if (event.target.type === "checkbox") {
    if (
    !includeLowercaseCheckbox.checked &&
    !includeUppercaseCheckbox.checked)
    {
      event.target === includeLowercaseCheckbox ?
      includeUppercaseCheckbox.checked = true :
      includeLowercaseCheckbox.checked = true;
    }
    calculateStrength();
  }

  calculateStrength();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let formData = new FormData(form);

  includeUppercase = formData.get("include-uppercase");
  includeLowercase = formData.get("include-lowercase");
  includeNumbers = formData.get("include-numbers");
  includeSymbols = formData.get("include-symbols");
  characterLength = parseInt(formData.get("character-length"));

  createPassword();
});
function calculateStrength() {
  let strength = slider.value;
  strength = includeUppercaseCheckbox.checked ? strength *= 1.1 : strength;
  strength = includeLowercaseCheckbox.checked ? strength *= 1.1 : strength;
  strength = includeNumbersCheckbox.checked ? strength *= 1.1 : strength;
  strength = includeSymbolsCheckbox.checked ? strength *= 1.1 : strength;
  strength = Math.floor(strength);
  console.log(strength);

  if (strength > 20) {
    //STRONG
    strengthStatus.innerHTML = "STRONG";
    removeColorClasses(strengthBars);
    strengthBars.item(0).classList.add("back-green");
    strengthBars.item(1).classList.add("back-green");
    strengthBars.item(2).classList.add("back-green");
    strengthBars.item(3).classList.add("back-green");
  } else if (strength > 15) {
    //MEDIUM
    strengthStatus.innerHTML = "MEDIUM";
    removeColorClasses(strengthBars);
    strengthBars.item(0).classList.add("back-yellow");
    strengthBars.item(1).classList.add("back-yellow");
    strengthBars.item(2).classList.add("back-yellow");
  } else if (strength > 8) {
    //WEAK
    strengthStatus.innerHTML = "WEAK";

    removeColorClasses(strengthBars);
    strengthBars.item(0).classList.add("back-orange");
    strengthBars.item(1).classList.add("back-orange");
  } else {
    // TOO WEAK!
    strengthStatus.innerHTML = "TOO WEAK!";
    removeColorClasses(strengthBars);
    strengthBars.item(0).classList.add("back-red");
  }
}

function removeColorClasses(e) {
  for (let item of e) {
    item.classList.remove("back-green");
    item.classList.remove("back-yellow");
    item.classList.remove("back-orange");
    item.classList.remove("back-red");
  }
}

function createPassword() {
  let password = "";
  let functionList = [];
  let checkBoxCount = 0;

  if (includeLowercase) {
    checkBoxCount++;
    functionList.push(() => randomLetter(true));
  }
  if (includeUppercase) {
    checkBoxCount++;
    functionList.push(() => randomLetter(false));
  }
  if (includeNumbers) {
    checkBoxCount++;
    functionList.push(randomNumber);
  }
  if (includeSymbols) {
    checkBoxCount++;
    functionList.push(randomSymbol);
  }

  if (checkBoxCount === 0) {
    return "Bitte wähle mindestens eine Zeichenart aus.";
  }

  for (let i = 0; i < characterLength; i++) {
    const randomIndex = Math.floor(Math.random() * functionList.length);
    password += functionList[randomIndex]();
  }
  passwordResult.value = password;
}

function randomLetter(lowercase) {
  const letters = lowercase ?
  "abcdefghijklmnopqrstuvwxyz" :
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
}

function randomNumber() {
  return Math.floor(Math.random() * 10).toString();
}

function randomSymbol() {
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.?";
  return symbols[Math.floor(Math.random() * symbols.length)];
}