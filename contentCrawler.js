// USE THESE FOR BETTER PRICE-FINDING IN VERSION 1.1
// const FORMAT_LONG = /$[0-9]+.[0-9][0-9]/; // $XX.XX  
// const FORMAT_SHORT = /\$[0-9]+/; // $XX [POSSIBLY TOO GENERAL]

/**
 * Finds all elements with dollar signs as  first character and returns them
 * @return Collection of elements that qualily
 */

 const MINUTES_IN_HOUR = 60;

 /********************************************************
   Algorithm implementation (modularized for simplicity) *
                (Optimize in 2.0)                        *
**********************************************************/

let prices = findAmazonPrices();
let timeObjects = [];
for (let i = 0; i < prices.length; i++) {
    getTime(prices[i]);
}

// for (let i = 0; i < prices.length; i++) {
//     timeObjects.push(getTime(prices[i]));
// }
// console.log(this.timeObjects);




/**************
    Functions *
 **************/



/**
 * Finds prices for amazon desktop site, searching for '$'
 * character in an element's inner HTML. 
 * Time complexity: O(n)
 * Space complxity: O(n)
 * @return Array of elements with '$' as first char in innerHTML
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
    return priceElements;
}

/**
 * calculates time for given element with price in innerHTML
 */
function getTime(element) {
    chrome.storage.sync.get('wage', (value) => {
        let price = (element.innerHTML).substring(1);
        let decimalQuotient = price/value.wage;
        let hours = Math.trunc(decimalQuotient);
        let minutes = Math.round((decimalQuotient % 1) * MINUTES_IN_HOUR);
        let obj = {
            time: `${hours} hours, ${minutes} minutes`,
            tag: element
        }
        // console.log("wage: " + value.wage);
        // console.log("price: " + price);
        // console.log("decimalQuotient: " + decimalQuotient);
        // console.log("minutes: " + minutes);
        // console.log("hours: " + hours);
        console.log(obj);
        return obj;
    });
}