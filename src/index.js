
const BASE_URL = 'https://www.googleapis.com/civicinfo/v2'
const API_KEY = 'AIzaSyCNvcK7IHCHI8dre3fFS_hwdB9siUWZ_Oo'
const parameterName = 'representatives'
let officeArray = []


let address = ''
const addressSearchBtn = document.querySelector("#address-search")

const init = () => {
    const inputForm = document.querySelector('form')

    inputForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const input= document.querySelector('input#searchByAddress')

        //console.log(input.value)

        fetchUrl(input.value)
    })
}

function fetchUrl(address){
    fetch(`${BASE_URL}/${parameterName}?address=${address}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => 
        //console.log(data))
        getOfficials(data))
    }

function getOfficials(data) {
    //divisionCategories = data['divisions']
    //console.log(divisionCategories)
    //state = data['normalizedInput']["state"].toLowerCase()
    //    console.log(state)
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

        renderData(person)
    })


function renderData(data) {
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

    let btn = document.createElement('button')
    btn.setAttribute('class', 'like-button')
    btn.innerText = "like"
    btn.addEventListener('click', (e) => {
        console.log(e.target.dataset);
        likes(e)
    })
    

    let img = document.createElement('img')
        img.setAttribute('src', person.photoUrl || 'https://thumbs.dreamstime.com/b/government-icon-vector-male-person-profile-avatar-building-symbol-political-governance-glyph-pictogram-144250791.jpg')
        img.setAttribute("width", '50px')
        img.setAttribute('class', 'center')

    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(h2, img, h3, h4, a, btn)
    divCollect.append(divCard)
    }

    let divTitle = document.querySelector('#title')
    let p = document.createElement('p')
    p.innerHTML = "Representatives"
    p.setAttribute('id', "title-form")
    divTitle.append(p)
    
}
document.addEventListener('DOMContentLoaded', init)



