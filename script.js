let display = document.querySelector(".display");
let copy_btn = document.querySelector(".copy_btn");
let copy_msg = document.querySelector(".copy_msg");
let password_length = document.querySelector(".password_length");
let slider = document.querySelector(".slider");
let uppercase = document.querySelector("#uppercase");
let lowercase = document.querySelector("#lowercase");
let number = document.querySelector("#number");
let symbol = document.querySelector("#symbol");
let strength = document.querySelector("#strength");
let generate_password = document.querySelector("#password_generator");
let allcheckbox = document.querySelectorAll("input[type=checkbox] ");
let symbolstr = "~!@#$%^&*()_+}{:?></.,;'][=-`+-*/"


password = "";
passwordnumber = 10;
checkcount = 1;

function handleSlider() {
  slider.value = passwordnumber;
  password_length.innerText = passwordnumber;
}
handleSlider();

slider.addEventListener("input", (num) => {
  (passwordnumber = num.target.value),
   handleSlider();
});

async function copycontaint() {
  try {
    await navigator.clipboard.writeText(display.value);
    copy_msg.innerHTML = "Copied";
  } catch {
    copy_msg.innerHTML = "Faild To copy";
  }

  setTimeout(() => {
    copy_msg.innerHTML = "";
  }, 2000);
}

copy_btn.addEventListener("click", () => {
  console.log("Fnc me jaa rahe hai");
  if (display.value) copycontaint();
});

function getRanInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRannum() {
  return getRanInt(0, 9);
}

function generateuppercase() {
  return String.fromCharCode(getRanInt(65, 90));
}

function generatelowercase() {
  return String.fromCharCode(getRanInt(97, 122));
}

function generatesymbol(){
   return symbolstr.charAt(generateRannum(0,symbolstr.length))
}


console.log(generatesymbol())
console.log(generatelowercase());
console.log(generateuppercase());
console.log(generateRannum());


