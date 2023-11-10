let section3 = document.querySelector(".section3")
let section4 = document.querySelector(".section4")
let Top = section3.querySelector(".Top")
let details = section3.querySelector(".div-details")
Top.querySelector(".imgUser").src = UserData[0].imgUser
Top.querySelector("h2").innerText = UserData[0].Username
Top.querySelectorAll(".p")[0].innerText = UserData[0].Email
Top.querySelectorAll(".p")[1].innerText = UserData[0].Phone
details.querySelectorAll(".p")[0].innerText = UserData[0].Type


if (UserData[0].Insert === "Yes") {
  details.querySelectorAll(".p")[1].classList.add("fa-check")
  details.querySelectorAll(".p")[1].classList.remove("fa-xmark")
} else {
  details.querySelectorAll(".p")[1].classList.remove("fa-check")
  details.querySelectorAll(".p")[1].classList.add("fa-xmark")
}

if (UserData[0].Read === "Yes") {
  details.querySelectorAll(".p")[2].classList.add("fa-check")
  details.querySelectorAll(".p")[2].classList.remove("fa-xmark")
} else {
  details.querySelectorAll(".p")[2].classList.remove("fa-check")
  details.querySelectorAll(".p")[2].classList.add("fa-xmark")
}

if (UserData[0].Edit === "Yes") {
  details.querySelectorAll(".p")[3].classList.add("fa-check")
  details.querySelectorAll(".p")[3].classList.remove("fa-xmark")
} else {
  details.querySelectorAll(".p")[3].classList.remove("fa-check")
  details.querySelectorAll(".p")[3].classList.add("fa-xmark")
}

if (UserData[0].Delete === "Yes") {
  details.querySelectorAll(".p")[4].classList.add("fa-check")
  details.querySelectorAll(".p")[4].classList.remove("fa-xmark")
} else {
  details.querySelectorAll(".p")[4].classList.remove("fa-check")
  details.querySelectorAll(".p")[4].classList.add("fa-xmark")
}




function userimg(event) {
  let file = event.target
  let section4 = section3.querySelector(".section4")
  let imgloader = section3.querySelector(".imgloader");
  let imgUser = section4.querySelector(".imgUser");
  let fr = new FileReader();

  fr.addEventListener('loadend', () => {
    let res = fr.result;
    imgloader.style.display = "table"
    imgloader.classList.add("waiting")
    imgUser.src = res
    let obj = {
      base64: res.split("base64,")[1],
      type: file.files[0].type,
      name: file.files[0].name,
    }
    fetch(urlImages, {
      method: "POST",
      body: JSON.stringify(obj)
    })
      .then(r => r.text())
      .then((data) => { imgUser.src = data, imgUser.id = data })
      .then(() => imgloader.style.display = "none")
      .then(() => imgloader.classList.remove("waiting"))
  })
  fr.readAsDataURL(file.files[0])
}

function ShowPowers(value) {
  if (value === "Admin") {
    section4.querySelector(".parent-power").style.display = "none"
  } else {
    section4.querySelector(".parent-power").style.display = ""
  }
}

let checkbox = section3.querySelectorAll(".checkbox")
checkbox.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.value == "true") {
      btn.value = "false"
    } else {
      btn.value = "true"
    }
  })
});

function insert_value(id) {
  let UserData = JSON.parse(localStorage.UserData);
  let Msg = document.querySelector(".Msg-Box")
  if (UserData[0].Type === "User" && id == "save") { Msg.id = "هذه الصلاحيه غير متوفره لك"; CompleteData(); return }

  let username = section4.querySelector(".Username").value;
  let phone = section4.querySelector(".phone").value;
  let email = section4.querySelector(".email").value;
  let password = section4.querySelector(".password").value;
  let Rpassword = section4.querySelector(".Rpassword").value;
  let type = section4.querySelector(".typeuser").value
  let userimg = section4.querySelector(".imgUser").id
  let imgloader = section4.querySelector(".imgloader");
  let url; let id1;

  let insert = "Yes"; let read = "Yes"; let edit = "Yes"; let delet = "Yes"

  if (username == "" || phone == "" || email == "" || password == "" || Rpassword == "" || type == "نوع المستخدم") { Msg.id = "اكمل البيانات"; CompleteData(); return }
  if (password != Rpassword) { Msg.id = "كلمة المرور غير متطابقه"; CompleteData(); return }
  if (imgloader.classList.contains("waiting")) { Msg.id = "انتظر تحميل الصورة"; CompleteData(); return }


  if (type == "User") {
    let i = section4.querySelector(".Insert-box").value;
    let r = section4.querySelector(".Read-box").value;
    let e = section4.querySelector(".Edit-box").value;
    let d = section4.querySelector(".Delete-box").value;
    insert = "No"; read = "No"; edit = "No"; delet = "No"
    if (i == "true") { insert = "Yes" }
    if (r == "true") { read = "Yes" }
    if (e == "true") { edit = "Yes" }
    if (d == "true") { delet = "Yes" }
  }

  if (UserData[0].Type === "User" && id != "save") {
    insert = UserData[0].Insert
    read = UserData[0].Read
    edit = UserData[0].Edit
    delet = UserData[0].Delete
  }

  LoadSave()
  fetch(sheet1_URL)
    .then((response) => {
      if (id == "save") {
        id1 = "=row()-2"
        url = Login_URL + "?action=insert" + "&id=" + id1 + "&username=" + username + "&phone=" + phone + "&email=" + email + "&password=" + password
          + "&userimg=" + userimg + "&type=" + type + "&insert=" + insert + "&read=" + read + "&edit=" + edit + "&delet=" + delet
      } else {
        url = Login_URL + "?action=update" + "&id=" + id + "&username=" + username + "&phone=" + phone + "&email=" + email + "&password=" + password
          + "&userimg=" + userimg + "&type=" + type + "&insert=" + insert + "&read=" + read + "&edit=" + edit + "&delet=" + delet
        if (id == UserData[0].id) {
          let obj = { id: id, Username: username, Email: email, Phone: phone, Pass: password, imgUser: userimg, Type: type, Insert: insert, Read: read, Edit: edit, Delete: delet };          
          let UserData = [];
          UserData.push(obj)
          localStorage.setItem("UserData", JSON.stringify(UserData))
      }
      }
      let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
    })
    .then((data) => showData4())
    .then((data) => setTimeout(() => {
      SuccessSave();
    }, 1500))
    .catch((err) => failedSave(err))
}

function add_user() {
  let Msg = document.querySelector(".Msg-Box")
  if (UserData[0].Type.includes("User")) { Msg.id = "هذه الصلاحيه غير متوفره لك"; CompleteData(); return }
  GoSection4()

  window.scroll({ top: 0, behavior: 'smooth' });

  section4.querySelector(".Username").value = "";
  section4.querySelector(".phone").value = "";
  section4.querySelector(".email").value = "";
  section4.querySelector(".password").value = "";
  section4.querySelector(".Rpassword").value = "";
  section4.querySelector(".imgUser").src = "CSS/avatar.svg";
  section4.querySelector(".imgUser").id = "CSS/avatar.svg";
  section4.querySelector(".btn_save").id = "save";
  section4.querySelector(".imgloader").style.display = "none"

  if (UserData[0].Type === "User") {
    section4.querySelector(".typeuser").innerHTML = `<option value="${UserData[0].Type}" disabled selected hidden>${UserData[0].Type}</option>`
  } else {
    section4.querySelector(".typeuser").innerHTML = `<option value="${UserData[0].Type}" disabled selected hidden>${UserData[0].Type}</option>
  <option value="Admin">Admin</option>
  <option value="User">User</option>`
  }

  GoSection4();
  window.scroll({ top: 0, behavior: 'smooth' });


}


function showData4() {
  fetch(Login_URL)
    .then((response) => response.json())
    .then((row) => {
      let colum; let element = ""
      for (let i = 1; i < row.length; i++) {
        colum = row[i];
        element += `
        <a>
            <div>
                <img src="${colum[5]}" alt="">
                <h1 class="">${colum[1]}</h1>
            </div>
            <div>
                <i class="fas fa-edit" onclick="EditD_User(event)"></i>
                <i class="fas fa-trash"></i>
            </div>
            <i style="display:none;" class="id">${colum[0]}</i>
            <i style="display:none;" class="email">${colum[2]}</i>
            <i style="display:none;" class="phone">${colum[3]}</i>
            <i style="display:none;" class="password">${colum[4]}</i>
            <i style="display:none;" class="typeuser">${colum[6]}</i>
            <i style="display:none;" class="insert">${colum[7]}</i>
            <i style="display:none;" class="read">${colum[8]}</i>
            <i style="display:none;" class="edit">${colum[9]}</i>
            <i style="display:none;" class="delete">${colum[10]}</i>
        </a>`
      }
      section3.querySelector(".con-User").innerHTML = element
    })
};
showData4()


function EditD_User(event) {
  let btn = event.target
  let User = btn.parentElement.parentElement
  section4.querySelector(".Username").value = User.querySelector("h1").innerText;
  section4.querySelector(".phone").value = User.querySelector(".phone").innerText;
  section4.querySelector(".email").value = User.querySelector(".email").innerText;
  section4.querySelector(".password").value = User.querySelector(".password").innerText;
  section4.querySelector(".Rpassword").value = User.querySelector(".password").innerText;
  section4.querySelector(".imgUser").src = User.querySelector("img").src;
  section4.querySelector(".imgUser").id = User.querySelector("img").src;
  section4.querySelector(".btn_save").id = User.querySelector(".id").innerText;

  section4.querySelector(".imgloader").style.display = "none"
  section4.querySelector(".typeuser").innerHTML = `<option value="${User.querySelector(".typeuser").innerText}" disabled selected hidden>${User.querySelector(".typeuser").innerText}</option>
  <option value="Admin">Admin</option>
  <option value="User">User</option>`

  GoSection4();
  window.scroll({ top: 0, behavior: 'smooth' });
}

function Edit() {
  section4.querySelector(".Username").value = UserData[0].Username;
  section4.querySelector(".phone").value = UserData[0].Phone;
  section4.querySelector(".email").value = UserData[0].Email;
  section4.querySelector(".password").value = UserData[0].Pass;
  section4.querySelector(".Rpassword").value = UserData[0].Pass;
  section4.querySelector(".imgUser").src = UserData[0].imgUser;
  section4.querySelector(".imgUser").id = UserData[0].imgUser;
  section4.querySelector(".btn_save").id = UserData[0].id;
  section4.querySelector(".imgloader").style.display = "none"

  if (UserData[0].Type === "User") {
    section4.querySelector(".typeuser").innerHTML = `<option value="${UserData[0].Type}" disabled selected hidden>${UserData[0].Type}</option>`
  } else {
    section4.querySelector(".typeuser").innerHTML = `<option value="${UserData[0].Type}" disabled selected hidden>${UserData[0].Type}</option>
  <option value="Admin">Admin</option>
  <option value="User">User</option>`
  }

  GoSection4();
  window.scroll({ top: 0, behavior: 'smooth' });

}