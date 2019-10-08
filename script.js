/*
 * @Author: Sunny Xue
 * @Date: 2019-10-07 22:07:25
 * @Last Modified by: Sunny Xue
 * @Last Modified time: 2019-10-07 23:46:57
 */

"use strict;"

let languages = [
    'Python',
    'Java',
    'Javascript',
    // 'C#',
    // 'PHP',
    // 'C++',
    // 'R',
    // 'Objective-C',
    // 'Swift',
    // 'Matlab',
    // 'TypeScript',
    // 'Kotlin',
    // 'Ruby',
    // 'VBA',
    // 'Go',
    // 'Rust'
];

const timePromise = (languageName,i,searchYear,searchStartMonth,searchStartDay,searchEndMonth,searchEndDay) =>{
    return new Promise(resolve =>  setTimeout(() => {
        
        let startDate = `${searchYear+i}-0${searchStartMonth}-0${searchStartDay}`;
        let endDate = `${searchYear+i}-0${searchEndMonth}-${searchEndDay}`;
        // let url =
        // `https://api.github.com/search/repositories?q=language%3A${languageName}+created%3A${startDate}..${endDate}`; 
        // fetch(url)
        // .then((resp) => resp.json())
        // .then((data) => 
        // { 
        // // console.log(`${startDate}..${endDate}:${data.total_count}`); 
        // resolve(`${languageName} ${startDate}..${endDate}:${data.total_count}`);
        // })
        // .catch(error =>{ console.log(error); })

        resolve(`${languageName} ${startDate}..${endDate}`);
        
    }, 1200 * i)

    )
}


const fetchRepoAmount = (languageArray) => {

    //Loop for each language repo amount
    languageArray.map((language,index) => {

       
        
        let languageName = language.toLowerCase();
        //Init search query date
        let searchStartYear = 2015;
        let searchStartMonth = 1;
        let searchEndMonth = 6;
        let searchStartDay = 1;
        let searchEndDay = 30;
     

        //Loop for last 5 year
        for (let i = 0; i < 5; i++) {

            timePromise(languageName,i,searchStartYear,searchStartMonth,searchStartDay,searchEndMonth,searchEndDay)
            .then(data=>{
                console.log(data);
                
            })
      
        }

   

    });

}

fetchRepoAmount(languages);


