const signUpFullName = document.getElementById("signUpFullName");
const signUpUserName = document.getElementById("signUpUserName");
const signUpEmail = document.getElementById("signUpEmail");
const signUpPassword = document.getElementById("signUpPassword");
const signUpRePassword = document.getElementById("signUpRePassword");

const signUpBtn = document.getElementById("signUpBtn");

const fullNameRegex = /^[a-z,',-]+(\s)[a-z,',-]+$/;
const userNameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const passRegex = /^[A-Za-z]\w{7,14}$/;


function validate(regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.parentElement.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.parentElement.nextElementSibling.classList.remove("d-none");
  }
}
signUpFullName.addEventListener("input", () => {
  validate(fullNameRegex, signUpFullName);
});
signUpUserName.addEventListener("input", () => {
  validate(userNameRegex, signUpUserName);
});
signUpEmail.addEventListener("input", () => {
  validate(emailRegex, signUpEmail);
});
signUpPassword.addEventListener("input", () => {
  validate(passRegex, signUpPassword);
});
signUpRePassword.addEventListener("input", rePassValid);
function rePassValid() {
  if (signUpPassword.value == signUpRePassword.value) {
    signUpRePassword.classList.add("is-valid");
    signUpRePassword.classList.remove("is-invalid");
    signUpRePassword.parentElement.nextElementSibling.classList.add("d-none");
  } else {
    signUpRePassword.classList.add("is-invalid");
    signUpRePassword.classList.remove("is-valid");
    signUpRePassword.parentElement.nextElementSibling.classList.remove(
      "d-none"
    );
  }
}
let formAlert = document.getElementById("formAlert");
signUpBtn.addEventListener("click", addNewUser);

let users = [];
if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
}
function addNewUser() {
  let user = {
    fullName: signUpFullName.value,
    userName: signUpUserName.value,
    userEmail: signUpEmail.value,
    userPassword: signUpPassword.value,
  };

  if (
    validate(fullNameRegex, signUpFullName) &&
    validate(userNameRegex, signUpUserName) &&
    validate(emailRegex, signUpEmail) &&
    validate(passRegex, signUpPassword) &&
    signUpPassword.value == signUpRePassword.value &&
    signUpRePassword.value != null
  ) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    formAlert.classList.add("d-none");
    clear();
    location.replace("login.html");
  } else {
    formAlert.classList.remove("d-none");
  }
}
console.log(users);
function clear() {
  signUpFullName.value = "";
  signUpUserName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
  signUpRePassword.value = "";
  signUpFullName.classList.remove("is-valid");
  signUpUserName.classList.remove("is-valid");
  signUpEmail.classList.remove("is-valid");
  signUpPassword.classList.remove("is-valid");
  signUpRePassword.classList.remove("is-valid");
}
//^======================================================================>SIGN IN
