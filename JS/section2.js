let section2 = document.querySelector(".section2")
section2.querySelector(".date").value = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + day

fetch(sheet3_URL)
    .then((response) => response.json())
    .then((row) => {
        let element = "";
        for (let i = 1; i < row.length; i++) {
            let colum = row[i];
            if (colum[0] != "") {
                element += `<option value="${colum[0]}">${colum[0]}</option>`
            }
        }
        section2.querySelector(".iteem").innerHTML += element
        section2.querySelector(".namesearch").innerHTML += element
    })

function fetchData2() {
    fetch(sheet2_URL)
        .then((response) => response.json())
        .then((row) => {
            let accountsheet2 = []
            let colum = ""; let obj
            for (let i = 1; i < row.length; i++) {
                colum = row[i];
                if (UserData[0].Read === "No" && colum[4] == UserData[0].Username) {
                    if (colum[5] != "Delete") {
                        obj = { nu: colum[0], date: colum[1], item: colum[2], note: colum[3], user: colum[4], del: colum[5] }
                        accountsheet2.push(obj)
                    }
                } else if (UserData[0].Read === "Yes") {
                    if (colum[5] != "Delete") {
                        obj = { nu: colum[0], date: colum[1], item: colum[2], note: colum[3], user: colum[4], del: colum[5] }
                        accountsheet2.push(obj)
                    }
                }
                localStorage.setItem("accountsheet2", JSON.stringify(accountsheet2))
            }
            showData2()
        })
        .catch(() => showData2())
}
fetchData2()

function showData2() {
    let accountsheet2 = []
    if (localStorage.accountsheet2 != null) { accountsheet2 = JSON.parse(localStorage.accountsheet2) }

    let element = "";
    for (let i = 0; i < accountsheet2.length; i++) {
        element += `
                      <tr>
                        <td >${accountsheet2[i].date}</td>
                        <td >${accountsheet2[i].item}</td>
                        <td >${accountsheet2[i].note}</td>
                        <td >${accountsheet2[i].user}</td>
                        <td >
                          <a onclick="Edit2(event)" id="${accountsheet2[i].nu}" class="fa-solid fa-pen-to-square"></a>
                          <a onclick="AskSure2(id)" id="${accountsheet2[i].nu}" class="fa-solid fa-trash"></a>
                        </td>
                      </tr>`
    }
    section2.querySelector(".table-body").innerHTML = element
    document.querySelector(".Page_load").classList.add("Done")
};

function insert_value2(id) {
    let Msg = document.querySelector(".Msg-Box")
    if (UserData[0].Insert === "No") { Msg.id = "هذه الصلاحيه غير متوفره لك"; CompleteData(); return }

    let date = section2.querySelector(".date").value;
    let item = section2.querySelector(".iteem").value;
    let note = section2.querySelector(".note").value;

    if (date === "") { Msg.id = "برجاء ادخال التاريخ"; CompleteData(); return }
    if (item === "اسم الصنف" || item === "") { Msg.id = "برجاء ادخال الصنف"; CompleteData(); return }

    LoadSave()
    fetch(sheet2_URL)
        .then((response) => {
            url = sheet2_URL + "?nu=" + "=Row()-1" + "&action=insert" + "&date=" + date + "&item=" + item
                + "&note=" + note + "&user=" + UserData[0].Username
            if (section2.querySelector(".btn_save").classList.contains("update")) {
                url = sheet2_URL + "?nu=" + id + "&action=update" + "&date=" + date + "&item=" + item
                    + "&note=" + note + "&user=" + UserData[0].Username
            }
            let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
        })
        .then((data) => setTimeout(() => {
            SuccessSave();
            section2.querySelector(".btn_save").classList.remove("update")
            section2.querySelector(".iteem").value = "اسم الصنف"
            section2.querySelector(".note").value = ""
            fetchData2()
        }, 1500))
        .catch((err) => failedSave(err))
}

function Edit2(event) {
    let Msg = document.querySelector(".Msg-Box")
    if (UserData[0].Edit === "No") { Msg.id = "هذه الصلاحيه غير متوفره لك"; CompleteData(); return }

    let btn = event.target;
    let parent = btn.parentElement.parentElement;
    section2.querySelector(".btn_save").classList.add("update")
    section2.querySelector(".btn_save").id = btn.id
    section2.querySelector(".date").value = parent.querySelectorAll("td")[0].innerText
    section2.querySelector(".iteem").value = parent.querySelectorAll("td")[1].innerText
    section2.querySelector(".note").value = parent.querySelectorAll("td")[2].innerText
    window.scroll({ top: 0, behavior: 'smooth' });
}

function AskSure2(id) {
    let Msg = document.querySelector(".Msg-Box")
    if (UserData[0].Delete === "No") { Msg.id = "هذه الصلاحيه غير متوفره لك"; CompleteData(); return }
    Msg.id = id

    Msg.querySelector(".loader").style.display = "none"
    Msg.querySelector(".btn-oky").style.display = "grid"
    Msg.querySelector(".btn-oky").innerHTML = `<a onclick="DeleteData2()">نعم</a>
                                                  <a onclick="Hide_Msg()">لا</a> `
    Msg.querySelector("i").classList.add("fa-trash")
    Msg.querySelector("i").classList.remove("fa-exclamation")
    Msg.querySelector("i").classList.remove("fa-check")
    Msg.querySelector("i").classList.remove("fa-xmark")
    Msg.querySelector("i").classList.remove("fa-cloud-arrow-up")
    Msg.querySelector("h1").innerText = "هل تريد حذف البيانات ؟"

    Msg.classList.add("active")

}

function DeleteData2() {
    let id = document.querySelector(".Msg-Box").id
    let url = sheet2_URL + "?nu=" + id + "&action=delete" + "&del=" + "Delete" + "&user=" + UserData[0].Username;

    let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
    LoadSave()
    fetch(sheet2_URL)
        .then((response) => response.json())
        .then((data) => fetchData2())
        .then((data) => fetchData3())
        .then((data) => setTimeout(() => { SuccessSave(); }, 1500))
        .catch((err) => failedSave(err))
}

function Search2() {
    let accountsheet2 = []
    if (localStorage.accountsheet2 != null) { accountsheet2 = JSON.parse(localStorage.accountsheet2) }

    let value = section2.querySelector(".namesearch").value
    let SDate = section2.querySelector(".SDate").value
    let EDate = section2.querySelector(".EDate").value

    let nextYear = new Date().getFullYear() + 1
    if (SDate === "") { SDate = "01-01-1997" }
    if (EDate === "") { EDate = nextYear + "-01-01" }
    if (value === "اسم الخراط") { value = "" }

    let element = "";
    for (let i = 0; i < accountsheet2.length; i++) {
        if (accountsheet2[i].date >= SDate && accountsheet2[i].date <= EDate && accountsheet2[i].name1.includes(value) ||
            accountsheet2[i].date >= SDate && accountsheet2[i].date <= EDate && accountsheet2[i].name2.includes(value)) {
            element += `
                <tr>
                    <td >${accountsheet2[i].date}</td>
                    <td >${accountsheet2[i].item}</td>
                    <td >${accountsheet2[i].note}</td>
                    <td >${accountsheet2[i].user}</td>
                    <td >
                    <a onclick="Edit2(event)" id="${accountsheet2[i].nu}" class="fa-solid fa-pen-to-square"></a>
                    <a onclick="AskSure2(id)" id="${accountsheet2[i].nu}" class="fa-solid fa-trash"></a>
                   </td>
        </tr>`
        }
    }
    section2.querySelector(".table-body").innerHTML = element
}