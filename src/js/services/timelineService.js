import axios from 'axios';

 export function promiseTimeline(){
    return axios.get('http://localhost:8080/api/1.0/twitter/timeline')
    .then(
        (response) => {
            console.debug("Get general timeline successful");
            return response;
        },
        (error) => {
            console.debug("get general timeline failed");
            throw error;
        }
    );
 }

 export function promiseTimelineSelf(){
    return axios.get('http://localhost:8080/api/1.0/twitter/timeline/self')
    .then(
        (response) => {
            console.debug("Get self's timeline successful");
            return response;
        },
        (error) => {
            console.debug("get self's timeline failed");
            throw error;
        }
    );
 }
 
 export function promiseTimelineFiltered(keyword){
    return axios.get(`http://localhost:8080/api/1.0/twitter/timeline/filter?keyword=${keyword}`)
    .then(
        (response) => {
            console.debug("Get filtered timeline successful");
            return response;
        },
        (error) => {
            console.debug("get filtered timeline failed");
            throw error;
        }
    );
 }
 