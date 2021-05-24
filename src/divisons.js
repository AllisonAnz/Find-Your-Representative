const BASE_URL = 'https://www.googleapis.com/civicinfo/v2'
const API_KEY = 'AIzaSyCNvcK7IHCHI8dre3fFS_hwdB9siUWZ_Oo'
const parameterName = 'representatives'


let address = ''
const addressSearchBtn = document.querySelector("#address-search")

const init = () => {
    const inputForm = document.querySelector('form')

    inputForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const input= document.querySelector('input#searchByAddress')

        console.log(input.value)

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
    state = data['normalizedInput']["state"].toLowerCase()
    ocd = `/ocd-division\/country:us\/state:${state}`
    divisions = data['divisions']//['officeIndices']
    offices = data.offices.divisionId
    
    officials = data['officials']
    console.log(divisions)
}     

document.addEventListener('DOMContentLoaded', init)


// parsing out division IDs
var federal_pattern = "ocd-division/country:us";
var cd_pattern = /ocd-division\/country:us\/state:(\D{2})\/cd:/;

var state_pattern = /ocd-division\/country:us\/state:(\D{2}$)/;
var sl_pattern = /ocd-division\/country:us\/state:(\D{2})\/(sldl:|sldu:)/;


var county_pattern = /ocd-division\/country:us\/state:\D{2}\/county:\D+/;
var local_pattern = /ocd-division\/country:us\/state:\D{2}\/place:\D+/;

var district_pattern = /ocd-division\/country:us\/district:\D+/;

var selected_state = '';
var selected_county = '';
var selected_local = '';
var all_people = {};
var pseudo_id = 1;

function checkFederal(division_id, office_name) {
    if( division_id == federal_pattern || 
        cd_pattern.test(division_id) ||
        federal_offices.indexOf(office_name.name) >= 0)
        return true;
    else
        return false; 
}

function checkState(division_id){
    if( state_pattern.test(division_id) ||
        sl_pattern.test(division_id))
        return true;
    else
        return false; 
}

function checkCounty(division_id){
    if( county_pattern.test(division_id))
        return true;
    else
        return false; 
}


//Different divisions
//Federal:
//"ocd-division/country:us"
//"ocd-division/country:us/state:mo/cd:7"
//
//
//State:
//"ocd-division/country:us/state:mo"
//"ocd-division/country:us/state:mo/sldu:20"
//"ocd-division/country:us/state:mo/sldl:133"
//
//County:
//"ocd-division/country:us/state:mo/county:greene"

