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
                respArray.forEach(function(tweet) {
                    let div = document.createElement("div");

                    let userDiv = document.createElement("div");
                    // add image
                    let imageEl = document.createElement("img");
                    imageEl.src = DEFAULT_IMAGE; // set image source to default image in case image does not exist
                    if(tweet.hasOwnProperty('user')){
                        if(tweet.user.hasOwnProperty('profileImageUrl')){
                            imageEl.src = tweet.user.profileImageUrl;
                            //imageEl.src = "bloop"; // FIXME TEMPORARY test: uncomment this to make sure bad image URLs are handled correctly
                        }
                    }
                    userDiv.appendChild(imageEl);

                    nameDiv = document.createElement("div");
                    nameDiv.innerText = tweet.user.name;
                    nameDiv.className = "user-name";
                    userDiv.appendChild(nameDiv);

                    handleDiv = document.createElement("div");
                    handleDiv.innerText = tweet.user.twitterHandle;
                    handleDiv.className = "user-handle";
                    userDiv.appendChild(handleDiv);

                    userDiv.className = "user-div";
                    div.appendChild(userDiv);

                    let messageDiv = document.createElement("div");
                    // add timestamp
                    let readableDate = new Date(tweet.createdAt);
                    let dateDiv = document.createElement("div");
                    let timeOptions = { timeZone: 'America/North_Dakota/Center' , weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                    dateDiv.innerHTML = readableDate.toLocaleString('en-US', timeOptions);
                    dateDiv.className = "date";
                    messageDiv.appendChild(dateDiv);

                    // add div to container
                    let link = document.createElement("a");
                    link.href = 'https://twitter.com/' + tweet.user.twitterHandle+ '/status/' + tweet.id;
                    link.target = "_blank";
                    link.innerText = tweet.message;
                    messageDiv.appendChild(link);

                    messageDiv.className = "message-div";
                    div.appendChild(messageDiv);

                    // add div to container
                    div.className = "tweet-block";
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