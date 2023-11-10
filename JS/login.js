let Login_URL = "https://script.google.com/macros/s/AKfycbzKX6oDD5JCB1UBuMQ4iiTJXVbVRfH986RZ6DSz_0byGyBpKaSLB-F1xQ_z5XKUeouE/exec"

function login() {
  let username = document.querySelector(".username")
  let password = document.querySelector(".password")
  let MsgBox = document.querySelector(".Msg-Box")

  if (username.value == "" || password.value == "") {MsgBox.id ="ادخل اسم المستخدم وكلمة المرور";CompleteData();return }
  MsgBox.classList.add("active")
  let UserData = [];
  fetch(Login_URL)
    .then((response) => response.json())
    .then((row) => {
      for (let i = 1; i < row.length; i++) {
        let colum = row[i];
        if (colum[1] === username.value) {
          if (colum[4] == password.value) {
            let obj = { id: colum[0], Username: colum[1], Email: colum[2], Phone: colum[3], Pass: colum[4], imgUser: colum[5], Type: colum[6], Insert: colum[7],Read: colum[8], Edit: colum[9], Delete: colum[10] };
            UserData.push(obj)
            localStorage.setItem("UserData", JSON.stringify(UserData))
            location.href = "Home.html"
            return
          }
          else {MsgBox.id ="كلمة المرور خطأ";CompleteData(); return }
        }
      }
      MsgBox.id ="اسم المستخدم خطأ";CompleteData()
    })
}

function showPassword(event) {
  let parent = event.target.parentElement;
  let input = parent.querySelector("input")
  if (input.type == "text") {
    input.type = "password"
    event.target.classList.add("fa-eye")
    event.target.classList.remove("fa-eye-slash")
  } else {
    input.type = "text"
    event.target.classList.remove("fa-eye")
    event.target.classList.add("fa-eye-slash")
  }
}

function CompleteData() {
  let MsgBox = document.querySelector(".Msg-Box")
  MsgBox.querySelector(".loader").style.display = "none"
  MsgBox.querySelector(".btn-oky").style.display = "grid"
  MsgBox.querySelector(".btn-oky").innerHTML = `<a onclick="Hide_Msg()">موافق</a>`
  MsgBox.querySelector("i").classList.add("fa-xmark")
  MsgBox.querySelector("i").classList.remove("fa-exclamation")
  MsgBox.querySelector("i").classList.remove("fa-check")
  MsgBox.querySelector("i").classList.remove("fa-trash")
  MsgBox.querySelector("i").classList.remove("fa-cloud-arrow-up")
  MsgBox.querySelector("h1").innerText = MsgBox.id

  MsgBox.classList.add("active")
  
}

function Hide_Msg() {
  let MsgBox = document.querySelector(".Msg-Box")
  MsgBox.classList.remove("active")
  location.reload()
}
