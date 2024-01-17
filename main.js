let lengthSlider = document.querySelector(".pass-length input"),
    options = document.querySelectorAll(".options input"),
    copyIcon = document.querySelector(".input-box span"),
    passwordInput = document.querySelector(".input-box input"),
    passIndicator = document.querySelector(".pass-indicator"),
    generateBtn = document.querySelector(".generate-btn");
 
    console.log(passIndicator);
const characters = { 
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "~!@#$%^&*(){}[]|<>?/"
}

const generatePassword = () => {
    let staticPasword = "",
        randomPasword = "",
        execludeDublicate = false,
        passLength = lengthSlider.value;

        options.forEach((option) => {
            if(option.checked){
                if(option.id !== "exc-dublicate" && option.id !== "spaces"){
                    staticPasword += characters[option.id]
                } else if(option.id === "spaces") {
                    staticPasword += `  ${staticPasword}  `
                } else {
                    execludeDublicate = true;
                }
            }
        });

        for(let i = 0; i < passLength; i++) {
            let randomChar = staticPasword[Math.floor(Math.random() * staticPasword.length)];

            if(execludeDublicate) {
                !randomPasword.includes(randomChar) | randomChar == " " ? randomPasword += randomChar : i--;
            } else {
                randomPasword += randomChar;
            }
        }
        passwordInput.value = randomPasword;
};

// Bu agar input range ni value si uzgarsa ostidagi yashil chiziq ham uzgaradi yani bunda 8 dan past qiymatda qizil, 14 da sariq...
// const updatePassIndicator = () => {
//     passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 14 ? "medium" : "strong"; 
// };

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    // updatePassIndicator();
}; 
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#4285f4"

    setTimeout(() => {
        copyIcon.innerText = "copied";
        copyIcon.style.fontSize = "8px";
        copyIcon.style.color = "#707070";
    }, 1000);
}

copyIcon.addEventListener('click', copyPassword);
lengthSlider.addEventListener('input', updateSlider );
generateBtn.addEventListener('click', generatePassword);