function getTimeline() {
    console.info('Requesting timeline from backend.');
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){ // more on readystates: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
        if(this.readyState == XMLHttpRequest.DONE){ // waits for request to be done and successful (status 200)
            if(this.status != 200){
                document.getElementById("timeline-container").innerHTML = "Something went wrong.";
                console.error("Bad response: " + this.status);
            } else {
                // TODO delete the earlier container before doing this
                let container = document.getElementById("timeline-container");
                let respArray = JSON.parse(this.responseText); // TODO: handle potential error? 
                let count = 0; // this counter serves as an index. I'm using this instead of an indexed for-loop because the next lab is CSS and will probably override this styling anyways
                respArray.forEach(function(tweet) {
                    let div = document.createElement("div");
                    // add timestamp
                    let readableDate = new Date(tweet.createdAt * 1000);
                    let dateNode = document.createTextNode(readableDate);
                    div.appendChild(dateNode);

                    // add message
                    let messageNode = document.createTextNode(tweet.message); // TODO: handle potential error?
                    div.appendChild(messageNode);

                    // add image
                    let imageEl = document.createElement("img");
                    imageEl.src = tweet.user.profileImageUrl;
                    div.appendChild(imageEl);

                    // add div to container
                    let link = document.createElement("a");
                    link.href = 'https://twitter.com/' + tweet.user.twitterHandle+ '/status/' + tweet.id;
                    link.target = "_blank";
                    link.appendChild(div);

                    // styling, to be removed at later labs
                    if(count%2 == 0 ){
                        div.style="background-color:powderblue;";
                    }
                    container.appendChild(link);  
                });
            }
        }
    };
    xhttp.onerror = function(){
        document.getElementById("timeline-container").innerHTML = "Something went wrong.";
        console.error(xhttp.error);
    };

    xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline", true);
    xhttp.send();
}