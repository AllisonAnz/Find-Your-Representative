const BASE_URL = 'https://www.googleapis.com/civicinfo/v2'
const API_KEY = 'AIzaSyCNvcK7IHCHI8dre3fFS_hwdB9siUWZ_Oo'
const parameterName = 'representatives'

const init = () => {
    let electionCheckbox = document.querySelector("input[name=Elections]");
    let RepCheckbox = document.querySelector("input[name=Rep]")
    const inputForm = document.querySelector('form')
    const input = document.querySelector('input#searchByAddress')

    inputForm.addEventListener('submit', (event) => {
        event.preventDefault()
        
        if (RepCheckbox.checked) {
            console.log("Rep is checked")
            repUrl(input.value)
        }

        if(electionCheckbox.checked) {
            console.log("Election is checked")
            electionUrl()
        }
    })
}

function repUrl(address) {
    fetch(`${BASE_URL}/${parameterName}?address=${address}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data =>
            renderOfficials(data))
        .catch(error => console.log('error', error))
}

function electionUrl() {
    fetch(`${BASE_URL}/elections?&key=${API_KEY}`)
        .then(response => response.json())
        .then(data =>
            renderElectionData(data))
        .catch(error => console.log('error', error));
}


function renderOfficials(data) {

    let offices = data['offices']
    let officials = data['officials']

    offices.forEach(office => {
        let officeIndex = office.officialIndices
        officeNames = office.name

        officeIndex.forEach(idx => {
            rep = officials[idx]
        })
        renderRepData(rep)
    })

    function renderRepData() {
        let divCollect = document.querySelector('#collection')
        let divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')

        let h2 = document.createElement('h2')
        h2.innerHTML = officeNames

        let h3 = document.createElement('h3')
        h3.innerHTML = rep.name

        let h4 = document.createElement('h4')
        h4.innerHTML = rep.phones

        let h5 = document.createElement('h5')
        h5.innerHTML = rep.party

        let a = document.createElement('a')
        a.setAttribute('href', rep.urls)
        a.innerHTML = rep.urls

        let img = document.createElement('img')
        img.setAttribute('src', rep.photoUrl || 'https://thumbs.dreamstime.com/b/government-icon-vector-male-person-profile-avatar-building-symbol-political-governance-glyph-pictogram-144250791.jpg')
        img.setAttribute("width", '50px')
        img.setAttribute('class', 'center')

        divCard.append(h2, img, h3, h4, h5, a)
        divCollect.append(divCard)
    }

    let divTitle = document.querySelector('#title')
    let p = document.createElement('p')
    p.innerHTML = "Representatives"
    p.setAttribute('id', "title-form")
    divTitle.append(p)
}

function renderElectionData(data) {
    let electionInfo = data['elections']

    let table = document.querySelector("table");
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

    for (let element of electionInfo) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}
 
document.addEventListener('DOMContentLoaded', init)



