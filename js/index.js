const navbar = document.querySelector("nav");
const mainHeader = document.getElementById("mainHeader");
const loginForm = document.getElementById("loginForm");
const inpMailMain = document.querySelector("#loginForm input[type='email']");
const inpPassMain = document.querySelector("#loginForm input[type='password']");
const logBtn = document.getElementById("loginBtn");
const signUpLink = document.querySelector("#loginForm a");
const signUpForm = document.getElementById("signUpForm");
const inpSignName = document.querySelector("#signUpForm input[type='text']");
const inpSignMail = document.querySelector("#signUpForm input[type='email']");
const inpSignPass = document.querySelector(
    "#signUpForm input[type='password']"
);
const signBtn = document.querySelector("#signUpForm button");
const signInLink = document.querySelector("#signUpForm a");
const log_logValP = document.querySelector("#loginForm .log-val");
const sign_logValP = document.querySelector("#signUpForm .log-val");
const welcomePage = document.getElementById("welcomePage");
// const logBtn = document.getElementById("loginBtn");
// console.log(inpSignName, inpSignMail, signInLink);
const arrOfInputs = [
    inpMailMain,
    inpPassMain,
    inpSignName,
    inpSignMail,
    inpSignPass,
];
let newMail = {
    nameSign: undefined,
    mailSign: undefined,
    passSign: undefined,
};
if (localStorage.getItem("newMail")) {
    newMail = JSON.parse(localStorage.getItem("newMail"));
} else {
    localStorage.setItem("newMail", JSON.stringify(newMail));
}
console.log("test change");

////////////////////////////////////////////////////
function getInputVal(...inputs) {
    let valueInpts = [];
    for (let index = 0; index < inputs.length; index++) {
        valueInpts[index] = inputs[index].value;
        // console.log(valueInpts[index]);
    }
    return valueInpts;
}
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputsMain = getInputVal(inpMailMain, inpPassMain);
    let isValid = {
        mail: false,
        pass: false,
    };
    if (inputsMain[0] == newMail.mailSign) {
        // console.log("your email true");
        isValid.mail = true;
    } else {
        // console.log("your email not true");
        isValid.mail = false;
    }
    if (inputsMain[1] == newMail.passSign) {
        // console.log("your pass true");
        isValid.pass = true;
    } else {
        isValid.pass = false;
        // console.log("your pass not true");
    }
    if (isValid.mail && isValid.pass) {
        log_logValP.classList.replace("text-danger", "text-success");
        console.log("all true");
        // go welcomePage
        welcomePage.children[0].children[0].innerHTML = `WELCOME ${newMail.nameSign}`;
        mainHeader.classList.replace("d-flex", "d-none");
        navbar.classList.remove("d-none");
        welcomePage.classList.replace("d-none", "d-flex");
    } else {
        log_logValP.innerHTML = "Falid";
        log_logValP.classList.replace("text-success", "text-danger");
        console.log("false");
        console.log(isValid);
    }
});
//submit
signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputs = getInputVal(inpSignName, inpSignMail, inpSignPass);
    console.log(inputs);

    if (inpSignMail.value == newMail.mailSign) {
        console.log(`this email is here ${inpSignMail.value}`);
        sign_logValP.innerHTML = "email already exists";
        sign_logValP.classList.replace("text-success", "text-danger");
    } else {
        if (!isValidTest.uName) {
            console.log("name False");
        }
        if (!isValidTest.email) {
            console.log("email False");
        }
        if (!isValidTest.pass) {
            console.log("pass False");
        }
        if (isValidTest.uName && isValidTest.email && isValidTest.pass) {
            newMail = {
                nameSign: inputs[0],
                mailSign: inputs[1],
                passSign: inputs[2],
            };
            localStorage.setItem("newMail", JSON.stringify(newMail));
            sign_logValP.classList.replace("text-danger", "text-success");
            console.log(newMail);
            sign_logValP.innerHTML = "success";
            clearInputs(inpSignName, inpSignMail, inpSignPass);
            loginForm.classList.remove("d-none");
            signUpForm.classList.add("d-none");
        }
    }
});
//----------------------------------------------
signUpLink.addEventListener("click", () => {
    loginForm.classList.add("d-none");
    signUpForm.classList.remove("d-none");
    sign_logValP.innerHTML = null;
});
signInLink.addEventListener("click", () => {
    loginForm.classList.remove("d-none");
    signUpForm.classList.add("d-none");
    log_logValP.innerHTML = null;
});
//validition part-----------------------------------------
let isValidTest = {
    uName: false,
    email: false,
    pass: false,
};
const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    pass: /^[a-zA-Z0-9!@#$%^&*]{6,20}$/,
    uName: /^[a-z]{3,12} [a-z]{3,12} ?([a-z]{3,12})? ?([a-z]{3,12})?$/i,
};
function validation(input) {
    let nameOfInput = input.name;
    return regex[nameOfInput].test(input.value);
}
for (let index = 2; index < arrOfInputs.length; index++) {
    arrOfInputs[index].addEventListener("input", function (e) {
        let inputTypeNow = e.target;
        console.log(validation(inputTypeNow));
        if (validation(inputTypeNow)) {
            inputTypeNow.classList.add("is-valid");
            inputTypeNow.classList.remove("is-invalid");
            isValidTest[inputTypeNow.name] = true;
            console.log("iam valid", isValidTest);
        } else {
            isValidTest[inputTypeNow.name] = false;
            inputTypeNow.classList.remove("is-valid");
            inputTypeNow.classList.add("is-invalid");
        }
        console.log(index);
    });
}
//--------------------------------------------------------------------
//clear Funciton
function clearInputs(...inputs) {
    for (let index = 0; index < inputs.length; index++) {
        inputs[index].value = null;
        inputs[index].classList.remove("is-valid");
    }
}
//----------------------------------------------------------------------
//navbar.children[0].children[2].children[0].children[0];
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("mouseup", () => {
    navbar.classList.add("d-none");
    welcomePage.classList.replace("d-flex", "d-none");
    mainHeader.classList.replace("d-none", "d-flex");
    log_logValP.innerHTML = null;
});
