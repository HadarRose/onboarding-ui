function getTimeline() {
    console.info('Requesting timeline from backend.');
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){ // more on readystates: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
        if(this.readyState == XMLHttpRequest.DONE){ // waits for request to be done and successful (status 200)
            if(this.status == 200){
                document.getElementById("timeline-para").innerHTML = this.responseText;
            } else{
                document.getElementById("timeline-para").innerHTML = "Something went wrong.";
                console.error("Bad response: " + this.status);
            }
        } 
    };
    xhttp.onerror = function(){
        document.getElementById("timeline-para").innerHTML = "Something went wrong.";
        console.error(xhttp.error);
    };

    xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline", true);
    xhttp.send();
}