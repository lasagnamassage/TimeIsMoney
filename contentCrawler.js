alert("Content crawler activated!");

const FORMAT_LONG = /$[0-9]+.[0-9][0-9]/; // $XX.XX 
const FORMAT_SHORT = /\$[0-9]+/; // $XX [POSSIBLY TOO GENERAL]
/**
 * Finds all elements with prices and returns them
 * @return Collection of elements that qualily
 */
function findAmazonPrices() {
    let html = document.getElementsByTagName["*"];
    let priceElements = [];
    for (let i = 0; i < html.length; i++) {
        let testString = html[i].innerHTML;
        console.log("Test string: " + testString);
        if (testString.match(FORMAT_LONG)) {
            priceElements.push(html[i]);
        } 
    }
    console.log(priceElements);  
    return priceElements;
}

findAmazonPrices();