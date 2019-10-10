/*
 * @Author: Sunny Xue
 * @Date: 2019-10-07 22:07:25
 * @Last Modified by: Sunny Xue
 * @Last Modified time: 2019-10-09 22:29:38
 */

"use strict;"
$( document ).ready(function() {

//Define language array
let languages = [
    'Python',
    'Java',
    'Javascript',
    'C%23',
    'PHP',
    'C++',
    'R',
    'Objective-C',
    'Swift',
    'Matlab',
    'TypeScript',
    'Kotlin',
    'Ruby',
    'Visual-Basic',
    'Go',
    'Rust'
];

//Get HTML document
const outputHTML = document.getElementById('output');
const selectLanguage = document.getElementById('select-language');
const fetchBtn = document.getElementById('fetch-btn');
const getJSONBtn = document.getElementById('get-json-btn');

let selectOptions = '';
languages.map(lang=>{
    selectOptions+=`<option value="${lang}">${lang}</option>`;
})

selectLanguage.innerHTML=selectOptions;

const timePromise = (languageName,i,searchYear,searchStartMonth,searchStartDay,searchEndMonth,searchEndDay,selectPeriod) =>{
    return new Promise(resolve =>  setTimeout(() => {
        
        let startDate = `${searchYear+i}-${searchStartMonth}-${searchStartDay}`;
        let endDate = `${searchYear+i}-${searchEndMonth}-${searchEndDay}`;

        let url =
        `https://api.github.com/search/repositories?q=language%3A${languageName}+created%3A${startDate}..${endDate}`; 
        fetch(url)
        .then((resp) => resp.json())
        .then((data) => 
        { 
            let output = {
                startDate,
                endDate,
                searchYear:searchYear+i,
                timePeriod:parseInt(selectPeriod),
                repoCount: data.total_count
            }
        // resolve(`${languageName} ${startDate}..${endDate}:${data.total_count}`);
        resolve(output);
        })
        .catch(error =>{ console.log(error); })
        // let output = {
        //     startDate,
        //     endDate,
        //     searchYear:searchYear+i,
        //     timePeriod:1,
        //     repoCount: 0
        // }
        // resolve(`${languageName} ${startDate}..${endDate}`);
        // resolve(output);
        
    }, 1200 * i)

    )
}



const fetchSingleLanguage= (lang,selectPeriod) =>{

    let languageName = lang.toLowerCase();
    
    //Init search query date
    //Get the first six months
    let searchStartYear = 2015;
    let searchStartMonth = '01';
    let searchEndMonth = '06';
    let searchStartDay = '01';
    let searchEndDay = '30';
    
    //Get the second six months
    if(selectPeriod!="1"){
        searchStartMonth = '07';
        searchEndMonth ='12';
        searchStartDay = '01';
        searchEndDay = '31';
    }
    let outputData = [];

    //Loop for last 5 year
    for (let i = 0; i < 5; i++) {

       timePromise(languageName,i,searchStartYear,searchStartMonth,searchStartDay,searchEndMonth,searchEndDay,selectPeriod)
        .then(data=>{
            console.log('Fetching..'+data.repoCount);
            outputHTML.innerHTML += `<p>Find ${data.repoCount} in ${data.startDate} to ${data.endDate}</p>`;
            outputData.push(data);
            if(i===4)
            {
                //Finish fetching and send it back to the page as JSON string.
                let jsonData = {languageName,
                data:outputData};
                console.log(jsonData);
                outputHTML.innerText = JSON.stringify(jsonData);
                
            }
        })

    }

};


fetchBtn.addEventListener('click',(e)=>{
    
    let language = selectLanguage.value.toLowerCase().trim();
    let selectPeriod = document.querySelector('input[name="period"]:checked').value;
    console.log('Start fetching...'+language);
    outputHTML.innerHTML = `<p>Start fetching...${language}</p>`;
    fetchSingleLanguage(language,selectPeriod);
})

getJSONBtn.addEventListener('click',(e)=>{
    $.getJSON("./language-data.json", function(json){
        console.log(json);
      });
});

});