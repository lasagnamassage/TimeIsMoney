/**
 * Runs while extension is turned on.
 * This is where we check for dollar amounts and append
 * the necessary elements.
 */

 
 chrome.runtime.onMessage.addListner(function(request, sender)){
    if(request.action == "getHTMLSource"){
        MessageChannel.innerText = request.source;
    }
 }
});

chrome.runtime.onInstalled.addListener(function() {
    // add an action here
});