let section5 = document.querySelector(".section5")

function fetchData3() {
fetch(sheet2_URL)
    .then((response) => response.json())
    .then((row) => {
        let accountsheet3 = []
        let colum = "";
        for (let i = 1; i < row.length; i++) {
            colum = row[i];
            if (colum[5] == "Delete") {
                let obj = { nu: colum[0], date: colum[1], item: colum[2], note: colum[3], user: colum[4], del: colum[5] }
                accountsheet3.push(obj)
                localStorage.setItem("accountsheet3", JSON.stringify(accountsheet3))
            }
        }
        showData3()
    })
    .catch(() => showData3())
}

fetchData3()

function showData3() {
    let accountsheet3 = []
    if (localStorage.accountsheet3 != null) { accountsheet3 = JSON.parse(localStorage.accountsheet3) }

    let element = "";
    for (let i = 0; i < accountsheet3.length; i++) {
        element += `
                      <tr>
                        <td >${accountsheet3[i].date}</td>
                        <td >${accountsheet3[i].item}</td>
                        <td >${accountsheet3[i].note}</td>
                        <td >${accountsheet3[i].user}</td>
                        <td >
                          <a onclick="AskSure3(id)" id="${accountsheet3[i].nu}" class="fa-solid fa-share-from-square"></a>
                          <a onclick="AskSure4(id)" id="${accountsheet3[i].nu}" class="fa-solid fa-trash"></a>
                        </td>
                      </tr>`
    }
    section5.querySelector(".table-body").innerHTML = element
    if (UserData[0].Read === "No") { section5.querySelector(".table-body").style.display = "none" }
    document.querySelector(".Page_load").classList.add("Done")
};


function AskSure3(id) {
    let Msg = document.querySelector(".Msg-Box")
    if (UserData[0].Delete === "No") { Msg.id = "هذه الصلاحيه غير متوفره لك"; CompleteData(); return }
    Msg.id = id

    Msg.querySelector(".loader").style.display = "none"
    Msg.querySelector(".btn-oky").style.display = "grid"
    Msg.querySelector(".btn-oky").innerHTML = `<a onclick="DeleteData3()">نعم</a>
                                                  <a onclick="Hide_Msg()">لا</a> `
    Msg.querySelector("i").classList.add("fa-share-from-square")
    Msg.querySelector("i").classList.remove("fa-exclamation")
    Msg.querySelector("i").classList.remove("fa-check")
    Msg.querySelector("i").classList.remove("fa-xmark")
    Msg.querySelector("i").classList.remove("fa-cloud-arrow-up")
    Msg.querySelector("h1").innerText = "هل تريد استرجاع البيانات ؟"

    Msg.classList.add("active")

}

function AskSure4(id) {
    let Msg = document.querySelector(".Msg-Box")
    if (UserData[0].Delete === "No") { Msg.id = "هذه الصلاحيه غير متوفره لك"; CompleteData(); return }
    Msg.id = id

    Msg.querySelector(".loader").style.display = "none"
    Msg.querySelector(".btn-oky").style.display = "grid"
    Msg.querySelector(".btn-oky").innerHTML = `<a onclick="DeleteData44()">نعم</a>
                                                  <a onclick="Hide_Msg()">لا</a> `
    Msg.querySelector("i").classList.add("fa-trash")
    Msg.querySelector("i").classList.remove("fa-exclamation")
    Msg.querySelector("i").classList.remove("fa-check")
    Msg.querySelector("i").classList.remove("fa-xmark")
    Msg.querySelector("i").classList.remove("fa-cloud-arrow-up")
    Msg.querySelector("h1").innerText = "هل تريد حذف البيانات ؟"

    Msg.classList.add("active")

}

function DeleteData3() {
    let id = document.querySelector(".Msg-Box").id
    let url = sheet2_URL + "?nu=" + id + "&action=delete" + "&del=" + "" + "&user=" + UserData[0].Username;

    let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
    LoadSave()
    fetch(sheet2_URL)
        .then((response) => response.json())
        .then((data) => fetchData3())
        .then((data) => fetchData2())
        .then((data) => setTimeout(() => { SuccessSave(); }, 1500))
        .catch((err) => failedSave(err))
}

function DeleteData44() {
    let id = document.querySelector(".Msg-Box").id
    let url = sheet2_URL + "?id=" + id + "&action=delete1" + "&del=" + "" + "&user=" + UserData[0].Username;

    let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });
    LoadSave()
    fetch(sheet2_URL)
        .then((response) => response.json())
        .then((data) => fetchData3())
        .then((data) => fetchData2())
        .then((data) => setTimeout(() => { SuccessSave(); }, 1500))
        .catch((err) => failedSave(err))
}