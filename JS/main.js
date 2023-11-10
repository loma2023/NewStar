if (localStorage.UserData == null) { location.href = "index.html" }
let UserData = JSON.parse(localStorage.UserData);

let header = document.querySelector(".header")
header.querySelectorAll("a")[0].classList.add("hoverd")


let HomePage = document.querySelector(".HomePage")
HomePage.classList.add("section-active")
HomePage.querySelector(".img-user").src = UserData[0].imgUser
HomePage.querySelector(".UserName").innerText = UserData[0].Username


if (UserData[0].Type === "Admin") {
  document.querySelector(".div-details").style.display = ""
}

if (UserData[0].Type === "Admin") {
  document.querySelector(".con-User").style.display = ""
}


function Hide_Msg() {
  document.querySelector(".Msg-Box").classList.remove("active")
  document.querySelector(".Msg-Box").id = ""
}

function Show_search(event) {
  let btn = event.target
  if (btn.id === "search") {
    document.querySelectorAll(".form_insert")[0].style.display = "none"
    document.querySelectorAll(".form_insert")[1].style.display = "none"
    document.querySelectorAll(".form_search")[0].style.display = ""
    document.querySelectorAll(".form_search")[1].style.display = ""
    btn.classList.remove("fa-search")
    btn.classList.add("fa-plus")
    btn.id = "plus"
  } else {
    document.querySelectorAll(".form_insert")[0].style.display = ""
    document.querySelectorAll(".form_insert")[1].style.display = ""
    document.querySelectorAll(".form_search")[0].style.display = "none"
    document.querySelectorAll(".form_search")[1].style.display = "none"
    btn.classList.add("fa-search")
    btn.classList.remove("fa-plus")
    btn.id = "search"
  }

}


function CompleteData() {
  let MsgBox = document.querySelector(".Msg-Box")
  MsgBox.querySelector(".loader").style.display = "none"
  MsgBox.querySelector(".btn-oky").style.display = "grid"
  MsgBox.querySelector(".btn-oky").innerHTML = `<a onclick="Hide_Msg()">موافق</a>`
  MsgBox.querySelector("i").classList.add("fa-exclamation")
  MsgBox.querySelector("i").classList.remove("fa-check")
  MsgBox.querySelector("i").classList.remove("fa-xmark")
  MsgBox.querySelector("i").classList.remove("fa-trash")
  MsgBox.querySelector("i").classList.remove("fa-cloud-arrow-up")
  MsgBox.querySelector("h1").innerText = MsgBox.id

  MsgBox.classList.add("active")
}

function LoadSave() {
  document.querySelector("audio").play();
  let MsgBox = document.querySelector(".Msg-Box")
  MsgBox.querySelector(".loader").style.display = "flex"
  MsgBox.querySelector(".btn-oky").style.display = "none"
  MsgBox.querySelector("i").classList.add("fa-cloud-arrow-up")
  MsgBox.querySelector("i").classList.remove("fa-exclamation")
  MsgBox.querySelector("i").classList.remove("fa-check")
  MsgBox.querySelector("i").classList.remove("fa-xmark")
  MsgBox.querySelector("i").classList.remove("fa-trash")
  MsgBox.querySelector("h1").innerText = "جارِ حفظ البيانات"

  MsgBox.classList.add("active")
}

function SuccessSave() {
  let MsgBox = document.querySelector(".Msg-Box")
  MsgBox.querySelector(".loader").style.display = "none"
  MsgBox.querySelector(".btn-oky").style.display = "grid"
  MsgBox.querySelector(".btn-oky").innerHTML = `<a onclick="Hide_Msg()">موافق</a>`
  MsgBox.querySelector("i").classList.add("fa-check")
  MsgBox.querySelector("i").classList.remove("fa-exclamation")
  MsgBox.querySelector("i").classList.remove("fa-xmark")
  MsgBox.querySelector("i").classList.remove("fa-trash")
  MsgBox.querySelector("i").classList.remove("fa-cloud-arrow-up")
  MsgBox.querySelector("h1").innerText = "تم حفظ البيانات"
  MsgBox.classList.add("active")
}

function failedSave(err) {
  let MsgBox = document.querySelector(".Msg-Box")
  MsgBox.querySelector(".loader").style.display = "none"
  MsgBox.querySelector(".btn-oky").style.display = "grid"
  MsgBox.querySelector(".btn-oky").innerHTML = `<a onclick="Hide_Msg()">موافق</a>`
  MsgBox.querySelector("i").classList.add("fa-xmark")
  MsgBox.querySelector("i").classList.remove("fa-check")
  MsgBox.querySelector("i").classList.remove("fa-exclamation")
  MsgBox.querySelector("i").classList.remove("fa-trash")
  MsgBox.querySelector("i").classList.remove("fa-cloud-arrow-up")
  MsgBox.querySelector("h1").innerText = "خطأ في الانترنت اعد المحاوله"
  MsgBox.classList.add("active")

}

function GoHomePage() {
  let sections = document.querySelectorAll("section")
  sections.forEach(section => { section.classList.remove("section-active") });
  sections[0].classList.toggle("section-active")
  let pages = document.querySelector(".header").querySelectorAll("a")
  pages.forEach(page => { page.classList.remove("hoverd") });
  pages[0].classList.add("hoverd")
  document.querySelector(".ico-search").style.display = "none"

}

function GoSection1() {
  let sections = document.querySelectorAll("section")
  sections.forEach(section => { section.classList.remove("section-active") });
  sections[1].classList.toggle("section-active")
  let pages = document.querySelector(".header").querySelectorAll("a")
  pages.forEach(page => { page.classList.remove("hoverd") });
  pages[1].classList.add("hoverd")
  document.querySelector(".ico-search").style.display = ""
}

function GoSection2() {
  let sections = document.querySelectorAll("section")
  sections.forEach(section => { section.classList.remove("section-active") });
  sections[2].classList.toggle("section-active")
  let pages = document.querySelector(".header").querySelectorAll("a")
  pages.forEach(page => { page.classList.remove("hoverd") });
  pages[2].classList.add("hoverd")
  document.querySelector(".ico-search").style.display = ""
}

function GoSection3() {
  let sections = document.querySelectorAll("section")
  sections.forEach(section => { section.classList.remove("section-active") });
  sections[3].classList.toggle("section-active")
  let pages = document.querySelector(".header").querySelectorAll("a")
  pages.forEach(page => { page.classList.remove("hoverd") });
  pages[3].classList.add("hoverd")
  document.querySelector(".ico-search").style.display = "none"

}

function GoSection4() {
  let sections = document.querySelectorAll("section")
  sections.forEach(section => { section.classList.remove("section-active") });
  sections[4].classList.toggle("section-active")
  let pages = document.querySelector(".header").querySelectorAll("a")
  pages.forEach(page => { page.classList.remove("hoverd") });
  pages[3].classList.add("hoverd")
  document.querySelector(".ico-search").style.display = "none"

}

function GoSection5() {
  let sections = document.querySelectorAll("section")
  sections.forEach(section => { section.classList.remove("section-active") });
  sections[5].classList.toggle("section-active")
  let pages = document.querySelector(".header").querySelectorAll("a")
  pages.forEach(page => { page.classList.remove("hoverd") });
  pages[3].classList.add("hoverd")
  document.querySelector(".ico-search").style.display = "none"

}

function GoSection6() {
  let sections = document.querySelectorAll("section")
  sections.forEach(section => { section.classList.remove("section-active") });
  sections[6].classList.toggle("section-active")
  let pages = document.querySelector(".header").querySelectorAll("a")
  pages.forEach(page => { page.classList.remove("hoverd") });
  pages[0].classList.add("hoverd")
  document.querySelector(".ico-search").style.display = "none"

}

function GoSection7() {
  let sections = document.querySelectorAll("section")
  sections.forEach(section => { section.classList.remove("section-active") });
  sections[7].classList.toggle("section-active")
  let pages = document.querySelector(".header").querySelectorAll("a")
  pages.forEach(page => { page.classList.remove("hoverd") });
  pages[3].classList.add("hoverd")
  document.querySelector(".ico-search").style.display = "none"
}


function Gologin() {
  localStorage.removeItem("UserData")
  localStorage.removeItem("accountsheet1")
  localStorage.removeItem("accountsheet2")
  localStorage.removeItem("accountsheet3")
  location.href = "index.html"
}

function ChangeMood() {
  let body = document.querySelector("body")
  let TypeMood = ""

  if (body.classList.contains("body-active")) {
    TypeMood = "Dark"
  } else {
    TypeMood = "white"
  }

  localStorage.setItem("Mood", JSON.stringify(TypeMood))
  body.classList.toggle("body-active")
  document.querySelector(".toggle").classList.toggle("toggleActive")
}

function ChangeMood2() {
  let body = document.querySelector("body")
  let Mood = []
  if (localStorage.Mood != null) { Mood = JSON.parse(localStorage.Mood) }
  if (Mood === "Dark") {
    body.classList.remove("body-active")
    document.querySelector(".toggle").classList.add("toggleActive")
      
  }else{
    body.classList.add("body-active")
    document.querySelector(".toggle").classList.remove("toggleActive")  
  }
  
}

ChangeMood2()



let sheet1_URL = "https://script.google.com/macros/s/AKfycbySGeayJoqmTJ_PSwBHi6FcVSW6H32Oa_9cpQwn-LES2w8TtISzyYtxoWnkyR14TUxx/exec";
let sheet2_URL = "https://script.google.com/macros/s/AKfycby7nlfDUH59teE-5DKXrTE78h2TASma_ggsnPBuXfBFvzZDyJsXCDCHQhqtrSOmSFSb/exec";
let sheet3_URL = "https://script.google.com/macros/s/AKfycbzQ_cS-M57kd41xWc6ZTjOK0p9I70aflDl2EXwBs638W3Qr9fXShdyKlPZQY1CsV3DP/exec";
let Login_URL = "https://script.google.com/macros/s/AKfycbzKX6oDD5JCB1UBuMQ4iiTJXVbVRfH986RZ6DSz_0byGyBpKaSLB-F1xQ_z5XKUeouE/exec"
let urlImages = "https://script.google.com/macros/s/AKfycbzInpr5KRwBxBy48MISwiYRyjabobjS2OyRjdQ6fzSyIngT3gLeSeepuo0WRRlpPjI0/exec";

