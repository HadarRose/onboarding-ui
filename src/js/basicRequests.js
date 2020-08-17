function getTimeline() {
    console.info('Requesting timeline from backend.');
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){ // more on readystates: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){ // waits for request to be done and successful (status 200)
            document.getElementById("timeline-para").innerHTML = this.responseText;
        } 
    };
    xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline", true);
    xhttp.send();
}