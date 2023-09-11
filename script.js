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
let generate_password = document.querySelector("#generate_password");
let allcheckbox = document.querySelectorAll("input[type=checkbox] ");
let symbolstr = "~!@#$%^&*()_+}{:?></.,;'][=-`+-*/"


let password = ""
let checkcount = 0;
let passworddisplay = 10;
handelSlider()

function handelSlider(){
    slider.value = passworddisplay;
    password_length.innerText = passworddisplay ;
}

slider.addEventListener("input",(num)=>{
 passworddisplay = num.target.value,
 password_length.innerHTML = passworddisplay
})

function ranInt(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}

function generateRandnum(){
   return ranInt(0,9) 
}

function generateUppercase(){
    return String.fromCharCode(ranInt(65,90))
}

function generateLowercase(){
    return String.fromCodePoint(ranInt(97,122))
}

function generateSymbol(){
    return symbolstr.charAt(ranInt(0,symbolstr.length))
}

async function copycontaint(){
    try {
        await navigator.clipboard.writeText(display.value);
            copy_msg.innerHTML="Copied"
    } catch (error) {
            copy_msg.innerHTML="Failed to copy"
    }

    setTimeout(() => {
        copy_msg.innerHTML= "";
    }, 2000);
}

copy_btn.addEventListener("click",function(){
    if(display.value)
     copycontaint()
})

function strengthcolor(color){
    strength.style.backgroundColor = color
}

function calcStrngth(){
    let hasupper = false;
    let haslower = false;
    let hasnum= false;
    let hassym= false;
    if (uppercase.checked) hasupper = true;
    if (lowercase.checked) haslower = true;
    if (number.checked) hasnum = true;
    if (symbol.checked) hassym = true;
    if(haslower && hasupper && hasnum && hassym && passworddisplay >=8){
        strengthcolor("	#008000")
    }
    else if ((haslower ||hasupper) && (hasnum || hassym) && passworddisplay >= 6){
        strengthcolor("#FFFF00")
    }
    else{
        strengthcolor("#880808")
    }

}
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


allcheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change',function handleCheckBoxChange(){
        checkcount = 0;
        allcheckbox.forEach( (checkbox) => {
            if(checkbox.checked)
                checkcount++;
        });
    
        //special condition
        if(passworddisplay < checkcount ) {
            passworddisplay = checkcount;
            handelSlider();
        }
    });
})

generate_password.addEventListener("click",function(){

    if(checkcount == 0)return;
     
    if(passworddisplay>checkcount){
        checkcount = passworddisplay
    }
     password= ""
     let funcArr = [];

     if(uppercase.checked)
         funcArr.push(generateUppercase);
 
     if(lowercase.checked)
         funcArr.push(generateLowercase);
 
     if(number.checked)
         funcArr.push(generateRandnum);
 
     if(symbol.checked)
         funcArr.push(generateSymbol);
 
     //compulsory addition
     for(let i=0; i<funcArr.length; i++) {
         password += funcArr[i]();
     }
     console.log("COmpulsory adddition done");
 
     //remaining adddition
     for(let i=0; i<passworddisplay-funcArr.length; i++) {
         let randIndex = ranInt(0 , funcArr.length);
         console.log("randIndex" + randIndex);
         password += funcArr[randIndex]();
     }
     console.log("Remaining adddition done");
     //shuffle the password
     password = shufflePassword(Array.from(password));
     console.log("Shuffling done");
     //show in UI
     display.value = password;
     console.log("UI adddition done");
     //calculate strength
     calcStrngth();
 });

    








console.log(generateSymbol())
console.log(generateLowercase())
console.log(generateUppercase())
console.log(generateRandnum())


