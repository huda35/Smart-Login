var userInput = document.getElementById("userInput");
var emailInput = document.getElementById("emailInput");
var passInput = document.getElementById("passInput");
var Emails = [];
var usernameInputLogin = document.getElementById('usernameInput');
var passwordInputLogin = document.getElementById('passwordInput');
var welcomeContent = document.getElementById('content')
var currentUsername;
var alert = document.getElementById("alert");

document.forms[0]?.addEventListener('submit', function (e) {
  e.preventDefault();
})

if (localStorage.getItem("Emails") != null) {
  Emails = JSON.parse(localStorage.getItem("Emails"));
}

function createEmail() {
  if (checkEmptyInputs() == true) {
    getALert("All inputs are reguired", "red");
  } else {
    var Email = {
      username: userInput.value,
      email: emailInput.value.toLowerCase(),
      password: passInput.value
    }
    if (checkEmails() == true) {
      getALert("email already exist", "red")
    } else {
      Emails.push(Email);
      localStorage.setItem("Emails", JSON.stringify(Emails));
      getALert("Success", "green");
      clearForm();
    }
  }
}


document.getElementById('signUpBtn')?.addEventListener('click', function () {
  if (validateEmail() == true) {
    createEmail();
  }
})

function checkEmptyInputs() {
  if (userInput.value == "" || passInput.value == "" || emailInput.value == "") {
    return true;
  }
}
function getALert(text, textColor) {
  alert.innerHTML = text;
  alert.classList.replace('d-none', 'd-block');
  alert.style.color = textColor;
}
function clearForm() {
  userInput.value = "";
  passInput.value = "";
  emailInput.value = "";
}

function checkEmails() {
  for (var i = 0; i < Emails.length; i++) {
    if (emailInput.value == Emails[i].email) {
      return true;
    } else {
      return false;
    }
  }
}

function checkEmailExist() {
  for (var i = 0; i < Emails.length; i++) {
    if (usernameInputLogin.value.trim().toLowerCase() == Emails[i].email && passwordInputLogin.value == Emails[i].password) {
      getALert("login successfully", "green")
      window.location.href = "./welcome.html";
      currentUsername = Emails[i].username;
      sessionStorage.setItem("user", currentUsername)
      return true;
    } else {
      getALert("Incorrect Email or Password", "red");
    }
  }
}
document.querySelector('.loginBtn')?.addEventListener('click', checkEmailExist);
welcomeContent.innerHTML = sessionStorage.getItem("user");

document.querySelector("#logoutBtn").addEventListener("click", function () {
  logout();
})
function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "index.html";
}

function validateEmail() {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var emailValue = emailInput.value;
  if (regex.test(emailValue)) {
    emailInput.nextElementSibling.classList.add("d-none")
    return true;
  } else {
    emailInput.nextElementSibling.classList.remove("d-none")
    return false;
  }
}
