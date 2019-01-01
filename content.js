chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'report_back') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument

        console.log("Before dom mod");
        console.log("After getting all");
        var domInfo = {
            total:   document.querySelectorAll('*').length,
            inputs:  document.querySelectorAll('input').length,
            buttons: document.querySelectorAll('button').length
          };
          console.log(domInfo);
        //sendResponse(document.all[0].outerHTML);
        document.body.innerText="Pizza";
    }
});