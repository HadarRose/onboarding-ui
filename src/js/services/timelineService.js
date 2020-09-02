import axios from 'axios';

 export function promiseTimeline(){
    return axios.get('http://localhost:8080/api/1.0/twitter/timeline');
 }
