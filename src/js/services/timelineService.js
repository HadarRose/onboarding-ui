import axios from 'axios';

 export function getTimeline(){
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

 export function getTimelineSelf(){
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
 
 export function getTimelineFiltered(keyword){
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

 export function postTweet(message){
     return axios.post(`http://localhost:8080/api/1.0/twitter/tweet`, {message: message})
     .then(
        (response) => {
            console.debug("Posted tweet successfully");
            return response;
        },
        (error) => {
            console.debug("Failed to post tweet");
            throw error;
        }
    );
 }
 