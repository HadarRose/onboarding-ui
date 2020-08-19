const DEFAULT_IMAGE = "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"; // the default image for twitter

function getTimeline() {
    console.info('Requesting timeline from backend.');
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){ // more on readystates: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
        if(this.readyState == XMLHttpRequest.DONE){ // waits for request to be done
            // FIXME TEMPORARY test method: disconnect backend/change credentials 
            if(this.status != 200){ // checks if request was not successful
                document.getElementById("timeline-container").innerHTML = "Something went wrong, please contact systems administrator.";
                console.error("Bad response: " + this.status + "\nResponse received: " + this.responseText); 
            } else {
                let container = document.getElementById("timeline-container");
                container.innerHTML = ""; // clear old content
                let respArray = JSON.parse(this.responseText); // FIXME TEMPORARY test: unfollow WHO and delete tweets to test empty response
                let count = 0; // FIXME TEMPORARY this counter serves as an index. I'm using this instead of an indexed for-loop because the next lab is CSS and will probably override this styling anyways
                respArray.forEach(function(tweet) {
                    let div = document.createElement("div");

                    // add image
                    let imageEl = document.createElement("img");
                    imageEl.src = DEFAULT_IMAGE; // set image source to default image in case image does not exist
                    if(tweet.hasOwnProperty('user')){
                        if(tweet.user.hasOwnProperty('profileImageUrl')){
                            imageEl.src = tweet.user.profileImageUrl;
                            //imageEl.src = "bloop"; // FIXME TEMPORARY test: uncomment this to make sure bad image URLs are handled correctly
                        }
                    }
                    div.appendChild(imageEl);

                    // add timestamp
                    let readableDate = new Date(tweet.createdAt * 1000);
                    let dateSpan = document.createElement("span");
                    dateSpan.innerHTML = " " + readableDate + " ";
                    dateSpan.style = "font-size:150%;" // FIXME styling, should probably be removed later
                    div.appendChild(dateSpan);

                    // add div to container
                    let link = document.createElement("a");
                    link.href = 'https://twitter.com/' + tweet.user.twitterHandle+ '/status/' + tweet.id;
                    link.target = "_blank";
                    link.innerText = tweet.message;
                    div.appendChild(link);

                    // FIXME styling, to be removed at later labs
                    if(count%2 == 0 ){
                        div.style="background-color:powderblue;";
                    } else {
                        div.style="background-color:skyblue;";
                    }
                    count++;
                    // add link wrapper to container
                    container.appendChild(div);  
                });
            }
        }
    };
    xhttp.onerror = function(){ 
        document.getElementById("timeline-container").innerHTML = "Something went wrong, please contact systems administrator.";
        console.error(xhttp.error); 
    };
    xhttp.open("GET", "http://localhost:8080/api/1.0/twitter/timeline", true);
    xhttp.send();
}

/* Regular test:
1. get timeline
2. post tweet by calling backend API
3. get timeline again and make sure that the new tweet is at the top, and is displayed correctly
*/