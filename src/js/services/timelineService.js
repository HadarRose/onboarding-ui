import axios from 'axios';

 export function promiseTimeline(){
    return axios.get('http://localhost:8080/api/1.0/twitter/timeline')
    .then(
        (response) => {
            console.debug("Get successful");
            return response;
        },
        (error) => {
            console.debug("get failed");
            throw error;
        }
    );
 }
