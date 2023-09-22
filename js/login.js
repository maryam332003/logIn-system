const logInEmail = document.getElementById("logInEmail");
const logInPassword = document.getElementById("logInPassword");
const logInBtn = document.getElementById("logInBtn");
const logInAlert = document.getElementById("logInAlert");
let message = document.getElementById("message");
logInBtn.addEventListener("click", logInFun);

usersArray = JSON.parse(localStorage.getItem("users"));
console.log(usersArray);

function displayMessage(text, color) {
  message.innerHTML = text;
  message.classList.remove("text-danger", "text-success");
  message.classList.add(color, "fw-semibold");
}

function logInFun() {
  const getUserEmail = usersArray.find(
    (user) => user.userEmail === logInEmail.value
  );
  const getUserPass = usersArray.find(
    (user) => user.userPassword === logInPassword.value
  );
  if (
    usersArray.find((user) => user.userEmail === logInEmail.value) &&
    usersArray.find((user) => user.userPassword === logInPassword.value)
  ) {
    let name = getUserEmail.userName;
    localStorage.setItem("userName",name)
    location.replace("crud.html");
  } else if (logInEmail.value == "" || logInPassword.value == "") {
    displayMessage("All inputs are required", "text-danger");
  } else if (
    usersArray.find((user) => user.userEmail != logInEmail.value) ||
    usersArray.find((user) => user.userPassword != logInPassword.value)
  ) {
    displayMessage(
      "This account is not found. Sign up, please!",
      "text-danger"
    );
  }
}
