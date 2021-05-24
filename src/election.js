const BASE_URL = 'https://www.googleapis.com/civicinfo/v2/elections'
const API_KEY = 'AIzaSyCNvcK7IHCHI8dre3fFS_hwdB9siUWZ_Oo'
const parameterName = 'elections'
let officeArray = []


let address = ''
const addressSearchBtn = document.querySelector("#address-search")

//const init = () => {
//    const inputForm = document.querySelector('form')
//
//    inputForm.addEventListener('submit', (event) => {
//        event.preventDefault();
//        const input = document.querySelector('input#searchByAddress')
//
//        //console.log(input.value)
//
//        fetchUrl(input.value)
//    })
//}

//function fetchUrl() {
//    fetch(`${BASE_URL}&key=${API_KEY}`)
//        .then(response => response.json())
//        .then(data =>
//            console.log(data))
//           // getOfficials(data))
//}

fetch(`${BASE_URL}?&key=${API_KEY}`)
    .then(response => response.text())
    .then(result => 
            //console.log(result),
            getElectionId(result))
    .catch(error => console.log('error', error));

function getElectionId(result){
    console.log(result)
}







    //function getOfficials(data) {
//    //divisionCategories = data['divisions']
//    //console.log(divisionCategories)
//    //state = data['normalizedInput']["state"].toLowerCase()
//    //    console.log(state)
//    divisions = data['divisions']["ocd-division/country:us"]['officeIndices']
//    let offices = data['offices']
//    officials = data['officials']
//
//    renderOfficials(offices)
//
//}
//
//document.addEventListener('DOMContentLoaded', init)