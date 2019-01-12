// USE THESE FOR BETTER PRICE-FINDING IN VERSION 1.1
// const FORMAT_LONG = /$[0-9]+.[0-9][0-9]/; // $XX.XX  
// const FORMAT_SHORT = /\$[0-9]+/; // $XX [POSSIBLY TOO GENERAL]

/**
 * Finds all elements with dollar signs as  first character and returns them
 * @return Collection of elements that qualily
 */
function findAmazonPrices() {
    let html = document.getElementsByTagName("*");
    let priceElements = [];
    for (let i = 0; i < html.length; i++) {
        let dollarSign = html[i].innerHTML.charAt(0);
        if (dollarSign == "$") {
            priceElements.push(html[i]);
        } 
    }
    console.log(priceElements);  
    return priceElements;
}

findAmazonPrices();