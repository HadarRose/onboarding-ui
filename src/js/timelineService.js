export default class TimelineService{
    constructor(func){
        console.log(func);
        this.retFunction = func;

        // xhttp set up
        this.xhttp = new XMLHttpRequest();
        this.xhttp.onreadystatechange = () => this.getTimeline();
        this.xhttp.onerror = () => this.retFunction({
            isLoaded: true,
            tweets: [],
            error: "A connection error has occurred"
        });
    }

    // this function makes the GET call to the backend
    makeRequest(){
        this.xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline", true);
        this.xhttp.send();
    }

    setReturnFunction(func){
        this.retFunction = func;
    }

    // handles the request's response, and sets the component's status as needed
    getTimeline(){
        console.log("Requesting timeline from backend");
        if(this.xhttp.readyState == XMLHttpRequest.DONE){
            console.debug("Request is DONE"); 
            if (this.xhttp.status !=200){ // if there was an error
                if(this.xhttp.status == 0){ 
                    return; // xhttp onerror will catch this error
                } else { // for uncaught errors, change the state's error and isLoaded
                let message = "Bad status: " + this.xhttp.status;
                this.retFunction({
                    isLoaded: true,
                    tweets: [],
                    error: message
                });
                }
            } else {
                this.retFunction({
                    isLoaded: true,
                    tweets: JSON.parse(this.xhttp.responseText),
                    error: null
                });
            }
        }
    }
}