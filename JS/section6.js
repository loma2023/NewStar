let section6 = document.querySelector(".section6")


function Search6(event) {
    let accountsheet1 = []
    if (localStorage.accountsheet1 != null) { accountsheet1 = JSON.parse(localStorage.accountsheet1) }

    let btn = event.target
    let value = btn.innerText


    let element = "";
    for (let i = 0; i < accountsheet1.length; i++) {
        if (accountsheet1[i].name1.includes(value) || accountsheet1[i].name2.includes(value)) {
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
    section6.querySelector(".table-body").innerHTML = element
    section6.querySelector(".title").innerText = value
    GoSection6()

}


