/**
 * Runs while extension is turned on.
 * This is where we check for dollar amounts and append
 * the necessary elements.
 */
/*
for(var i=0;i<all.length;i++){
    if(all[i].textContent.indexOf("$")==0){
console.log(all[i])}}
*/
 
chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getHTMLSource") {
      message.innerText = request.source;
    }
    /*
        if(request.action == "getHTMLSource"){
        MessageChannel.innerText = request.source;
    }
    */
  });
  
chrome.runtime.onInstalled.addListener(function() {
    // add an action here
});


/**
 * Stores the users wages.
 * @param {number} wage The user's wage per hour 
 */
function setHourlyWage(wage) {
    chrome.storage.sync.set({wage: wage}, () => {
        console.log(`wage set to ${wage}`);
    });
}
