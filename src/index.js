const BASE_URL = 'https://www.googleapis.com/civicinfo/v2'
const API_KEY = 'AIzaSyCNvcK7IHCHI8dre3fFS_hwdB9siUWZ_Oo'
const parameterName = 'representatives'
let officeArray = []

let address = ''
const addressSearchBtn = document.querySelector("#address-search")
let electionCheckbox = document.querySelector("input[name=Elections]");
let RepCheckbox = document.querySelector("input[name=Rep]")

const init = () => {

    const options = document.getElementById('options');
    options.addEventListener("change", function (evt) {
        let elem = evt.target;
        if (RepCheckbox.checked) {
            const inputForm = document.querySelector('form')
            inputForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const input = document.querySelector('input#searchByAddress')
                repUrl(input.value)
            })


        } if (electionCheckbox.checked) {
            const inputForm = document.querySelector('form')
            inputForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const input = document.querySelector('input#searchByAddress')
                electionUrl()
            })
        }
    })
}


function electionUrl() {
    fetch(`${BASE_URL}/elections?&key=${API_KEY}`)
        .then(response => response.json())
        .then(data =>    
            renderElectionData(data))
        .catch(error => console.log('error', error));
}


function repUrl(address) {
    fetch(`${BASE_URL}/${parameterName}?address=${address}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data =>
            getOfficials(data))
}

function renderElectionData(data) {
    let table = document.querySelector("table");

    generateTable(table, data.elections);
    updateHeader()
}

function updateHeader() {
    let table = document.querySelector("table")
    let thead = document.createElement("thead")
    let th1 = document.createElement("th")
    th1.innerHTML = "ID"
    let th2 = document.createElement("th")
    th2.innerHTML = "Name"
    let th3 = document.createElement("th")
    th3.innerHTML = "Election Date"
    let t4 = document.createElement("th")
    t4.innerHTML = "Division"
    thead.append(th1, th2, th3, t4)
    table.append(thead)
}

function updateTableHeader() {
    let table = document.querySelector("table")
    let thead = document.querySelectorAll("thead")
    let th1 = document.getElementById("ID")
    th1.innerHTML = "ID"
    let th2 = document.getElementById("name")
    th2.innerHTML = "Name"
    let th3 = document.getElementById("date")
    th3.innerHTML = "Election Date"
    let t4 = document.getElementById("division")
    t4.innerHTML = "Division"
    thead.appendChild(th1, th2, t3, t4)
    table.append(thead)
}

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

function getOfficials(data) {
    divisions = data['divisions']["ocd-division/country:us"]['officeIndices']
    let offices = data['offices']
    officials = data['officials']
    renderOfficials(offices)
}

function renderOfficials(offices) {
    offices.forEach(office => {
        let officeIndex = office.officialIndices
        officeNames = office.name

        officeIndex.forEach(idx => {
            person = officials[idx]
            officeArray.push(person)
        })
        renderRepData(person)
    })


    function renderRepData() {
        let divCollect = document.querySelector('#collection')

        let h2 = document.createElement('h2')
        h2.innerHTML = officeNames

        let h3 = document.createElement('h3')
        h3.innerHTML = person.name

        let h4 = document.createElement('h4')
        h4.innerHTML = person.phones

        let a = document.createElement('a')
        a.setAttribute('href', person.urls)
        a.innerHTML = person.urls

        let img = document.createElement('img')
        img.setAttribute('src', person.photoUrl || 'https://thumbs.dreamstime.com/b/government-icon-vector-male-person-profile-avatar-building-symbol-political-governance-glyph-pictogram-144250791.jpg')
        img.setAttribute("width", '50px')
        img.setAttribute('class', 'center')

        let divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')
        divCard.append(h2, img, h3, h4, a)
        divCollect.append(divCard)
    }

        let divTitle = document.querySelector('#title')
        let p = document.createElement('p')
        p.innerHTML = "Representatives"
        p.setAttribute('id', "title-form")
        divTitle.append(p)

}

document.addEventListener('DOMContentLoaded', init)



