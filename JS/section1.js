let section1 = document.querySelector(".section1")
let today = new Date();
let day
if (today.getDate() < 10) { day = "0" + today.getDate() } else { day = today.getDate() }
section1.querySelector(".date").value = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + day


fetch(sheet3_URL)
    .then((response) => response.json())
    .then((row) => {
        let element = "";
        for (let i = 1; i < row.length; i++) {
            let colum = row[i];
            if (colum[1] != "") {
                element += `<option value="${colum[1]}">${colum[1]}</option>`
            }
        }
        section1.querySelector(".iteem").innerHTML += element
    })

function fetchData() {
    fetch(sheet1_URL)
        .then((response) => response.json())
        .then((row) => {
            let accountsheet1 = []
            let colum = ""; let obj
            for (let i = 1; i < row.length; i++) {
                colum = row[i];
                if (UserData[0].Read === "No" && colum[6] == UserData[0].Username) {
                    obj = { nu: colum[0], date: colum[1], name1: colum[2], name2: colum[3], item: colum[4], subtotal: colum[5], user: colum[6] }
                    accountsheet1.push(obj)
                } else if (UserData[0].Read === "Yes") {
                    obj = { nu: colum[0], date: colum[1], name1: colum[2], name2: colum[3], item: colum[4], subtotal: colum[5], user: colum[6] }
                    accountsheet1.push(obj)
                }
                localStorage.setItem("accountsheet1", JSON.stringify(accountsheet1))
            }
            showData1()
        })
        .catch(() => showData1())
}
fetchData()

function showData1() {
    let accountsheet1 = []
    if (localStorage.accountsheet1 != null) { accountsheet1 = JSON.parse(localStorage.accountsheet1) }
    let element = "";
    for (let i = 0; i < accountsheet1.length; i++) {
        let total = 0;
        for (let x = 0; x < i + 1; x++) {
            if (accountsheet1[i].name1 == accountsheet1[x].name1 && accountsheet1[i].name2 == accountsheet1[x].name2
                && accountsheet1[i].item == accountsheet1[x].item) {
                total = total + parseFloat(accountsheet1[x].subtotal)
            }
        }
        element += `
                      <tr>
                        <td >${accountsheet1[i].name1}</td>
                        <td >${accountsheet1[i].name2}</td>
                        <td >${accountsheet1[i].item}</td>
                        <td >${accountsheet1[i].subtotal}</td>
                        <td >${total}</td>
                        <td >${accountsheet1[i].user}</td>
                        <td >${accountsheet1[i].date}</td>
                        <td >
                          <a onclick="Edit1(event)" id="${accountsheet1[i].nu}" class="fa-solid fa-pen-to-square"></a>
                          <a onclick="AskSure1(id)" id="${accountsheet1[i].nu}" class="fa-solid fa-trash"></a>
                        </td>
                      </tr>`
    }
    section1.querySelector(".table-body").innerHTML = element
};

function insert_value1(id) {
    let Msg = document.querySelector(".Msg-Box")
    if (UserData[0].Insert === "No") { Msg.id = "هذه الصلاحيه غير متوفره لك"; CompleteData(); return }

    let date = section1.querySelector(".date").value;
    let name1 = section1.querySelector(".name1").value
    let name2 = section1.querySelector(".name2").value
    let item = section1.querySelector(".iteem").value;
    let subtotal = section1.querySelector(".subtotal").value;

    if (date === "") { Msg.id = "برجاء ادخال التاريخ"; CompleteData(); return }
    if (name1 === "اسم الخراط" || name1 === "") { Msg.id = "اختر اسم الخراط"; CompleteData(); return }
    if (item === "اسم الصنف" || item === "") { Msg.id = "برجاء ادخال الصنف"; CompleteData(); return }
    if (subtotal === "") { Msg.id = "برجاء ادخال العدد"; CompleteData(); return }
    if (name2 === "المرحله المكمله" || name2 === "") { name2 = "" }

    LoadSave()
    fetch(sheet1_URL)
        .then((response) => {
            url = sheet1_URL + "?name1=" + name1 + "&nu=" + "=Row()-1" + "&action=insert" + "&date=" + date + "&item=" + item
                + "&subtotal=" + subtotal + "&name2=" + name2 + "&user=" + UserData[0].Username
            if (section1.querySelector(".btn_save").classList.contains("update")) {
                url = sheet1_URL + "?name1=" + name1 + "&nu=" + id + "&action=update" + "&date=" + date + "&item=" + item
                    + "&subtotal=" + subtotal + "&name2=" + name2 + "&user=" + UserData[0].Username
            }
            let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
        })
        .then((data) => setTimeout(() => {
            SuccessSave();
            section1.querySelector(".btn_save").classList.remove("update")
            section1.querySelector(".name1").value = "اسم الخراط"
            section1.querySelector(".name2").value = "المرحله المكمله"
            section1.querySelector(".iteem").value = "اسم الصنف"
            section1.querySelector(".subtotal").value = ""
            lomafun()
            fetchData()
        }, 1500))
        .catch((err) => failedSave(err))
}

function Edit1(event) {
    let Msg = document.querySelector(".Msg-Box")
    if (UserData[0].Edit === "No") { Msg.id = "هذه الصلاحيه غير متوفره لك"; CompleteData(); return }

    let btn = event.target;
    let parent = btn.parentElement.parentElement;
    section1.querySelector(".btn_save").classList.add("update")
    section1.querySelector(".btn_save").id = btn.id
    section1.querySelector(".date").value = parent.querySelectorAll("td")[6].innerText
    section1.querySelector(".name1").value = parent.querySelectorAll("td")[0].innerText
    section1.querySelector(".name2").value = parent.querySelectorAll("td")[1].innerText
    section1.querySelector(".iteem").value = parent.querySelectorAll("td")[2].innerText
    section1.querySelector(".subtotal").value = parent.querySelectorAll("td")[3].innerText
    lomafun()
    window.scroll({ top: 0, behavior: 'smooth' });

}

function AskSure1(id) {
    let Msg = document.querySelector(".Msg-Box")
    if (UserData[0].Delete === "No") { Msg.id = "هذه الصلاحيه غير متوفره لك"; CompleteData(); return }
    Msg.id = id
    Msg.querySelector(".loader").style.display = "none"
    Msg.querySelector(".btn-oky").style.display = "grid"
    Msg.querySelector(".btn-oky").innerHTML = `<a onclick="DeleteData1()">نعم</a>
                                                  <a onclick="Hide_Msg()">لا</a> `

    Msg.querySelector("i").classList.add("fa-trash")
    Msg.querySelector("i").classList.remove("fa-exclamation")
    Msg.querySelector("i").classList.remove("fa-check")
    Msg.querySelector("i").classList.remove("fa-xmark")
    Msg.querySelector("i").classList.remove("fa-cloud-arrow-up")
    Msg.querySelector("h1").innerText = "هل تريد حذف البيانات ؟ "

    Msg.classList.add("active")

}

function DeleteData1() {
    let id = document.querySelector(".Msg-Box").id
    let url = sheet1_URL + "?id=" + id + "&action=delete";
    let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
    LoadSave()
    fetch(sheet1_URL)
        .then((response) => response.json())
        .then((data) => fetchData())
        .then((data) => setTimeout(() => { SuccessSave(); }, 1500))
        .catch((err) => failedSave(err))
}

function Search1() {
    let accountsheet1 = []
    if (localStorage.accountsheet1 != null) { accountsheet1 = JSON.parse(localStorage.accountsheet1) }

    let value = section1.querySelector(".namesearch").value
    let SDate = section1.querySelector(".SDate").value
    let EDate = section1.querySelector(".EDate").value

    let nextYear = new Date().getFullYear() + 1
    if (SDate === "") { SDate = "01-01-1997" }
    if (EDate === "") { EDate = nextYear + "-01-01" }
    if (value === "اسم الخراط") { value = "" }

    let element = "";
    for (let i = 0; i < accountsheet1.length; i++) {
        if (accountsheet1[i].date >= SDate && accountsheet1[i].date <= EDate && accountsheet1[i].name1.includes(value) ||
            accountsheet1[i].date >= SDate && accountsheet1[i].date <= EDate && accountsheet1[i].name2.includes(value)) {
            let total = 0;
            for (let x = 0; x < i + 1; x++) {
                if (accountsheet1[i].name1 == accountsheet1[x].name1 && accountsheet1[i].name2 == accountsheet1[x].name2
                    && accountsheet1[i].item == accountsheet1[x].item) {
                    total = total + parseFloat(accountsheet1[x].subtotal)
                }
            }
            element += `
                      <tr>
                        <td >${accountsheet1[i].name1}</td>
                        <td >${accountsheet1[i].name2}</td>
                        <td >${accountsheet1[i].item}</td>
                        <td >${accountsheet1[i].subtotal}</td>
                        <td >${total}</td>
                        <td >${accountsheet1[i].user}</td>
                        <td >${accountsheet1[i].date}</td>
                  <td >
                    <a onclick="Edit1(event)" id="${accountsheet1[i].nu}" class="fa-solid fa-pen-to-square"></a>
                    <a onclick="AskSure1(id)" id="${accountsheet1[i].nu}" class="fa-solid fa-trash"></a>
                  </td>
                </tr>`
        }
    }
    section1.querySelector(".table-body").innerHTML = element
    section1.style.display = "block"
}

function lomafun() {
    let value = section1.querySelector(".iteem").value
    if (value === "خدمات") {
        section1.querySelector(".start_Time").style.display = ""
        section1.querySelector(".end_Time").style.display = ""
        section1.querySelector(".subtotal").style.display = "none"
        document.querySelector(".subtotal").type = "text"
        section1.querySelector(".name2").style.display = "none"
    } else {
        section1.querySelector(".start_Time").style.display = "none"
        section1.querySelector(".end_Time").style.display = "none"
        section1.querySelector(".subtotal").style.display = ""
        document.querySelector(".subtotal").type = "number"
        section1.querySelector(".name2").style.display = ""

    }
}

function OTime() {
    let from = document.querySelector(".start_Time")
    let to = document.querySelector(".end_Time")



    let x = from.querySelector("input").value
    let y = to.querySelector("input").value


    if (y === "") {
        document.querySelector(".subtotal").value = x
        return
    }

    let xx = x.split(":")
    let yy = y.split(":")

    document.querySelector(".subtotal").value = (((yy[0] - xx[0]) * 60) + (yy[1] - xx[1])) / 60


}

