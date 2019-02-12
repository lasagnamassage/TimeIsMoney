// USE THESE FOR BETTER PRICE-FINDING IN VERSION 1.1
// const FORMAT_LONG = /$[0-9]+.[0-9][0-9]/; // $XX.XX  
// const FORMAT_SHORT = /\$[0-9]+/; // $XX [POSSIBLY TOO GENERAL]

/**
 * Finds all elements with dollar signs as  first character and returns them
 * @return Collection of elements that qualily
 */

 /********************************************************
   Algorithm implementation (modularized for simplicity) *
                (Optimize in 2.0)                        *
**********************************************************/
addStyles();
let prices = findAmazonPrices();
let timeObjects = [];
chrome.storage.sync.get('wage', (value) => {
    for (let i = 0; i < prices.length; i++) {
        let dollarSignIndex = prices[i].innerHTML.indexOf('$');
        let price = (prices[i].innerHTML).slice(dollarSignIndex + 1);
        let decimalQuotient = price/value.wage;
        let hours = Math.trunc(decimalQuotient);
        let minutes = Math.round((decimalQuotient % 1) * 60);
        console.log(`price: ${price}\ndecimalQuotient: ${decimalQuotient}\nhours: ${hours}\nminutes: ${minutes}`)
        let obj = {
            time: `${hours} hours, ${minutes} minutes`,
            tag: prices[i]
        }
        console.log(obj);
        generateElement(obj);
    }
});




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
        let cleanedText = html[i].innerHTML
            .replace(/\s/g,'')  // removes white spaces
            .replace(/,/g,''); // removes commas
        if (cleanedText.charAt(0) == "$") {
            if (cleanedText.length == 1) { // sibling price parts case 
                console.log("SIBLING CASE FOR " + html[i].innerHTML);   
            }
            else {
                priceElements.push(html[i]);
            }
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
        let minutes = Math.round((decimalQuotient % 1) * 60);
        let obj = {
            time: `${hours} hours, ${minutes} minutes`,
            tag: element
        }
        // FOR DEBUGGING PURPOSES
        // console.log("wage: " + value.wage);
        // console.log("price: " + price);
        // console.log("decimalQuotient: " + decimalQuotient);
        // console.log("minutes: " + minutes);
        // console.log("hours: " + hours);
        //console.log(obj);
        return obj;
    });
}

/**
 * Generates script that appends elements to DOM with
 * given { time: string, tag: HTMLElement } object
 */
function generateElement(object) {
    let a11yBox = document.createElement("DIV");
    a11yBox.classList = "arrow"
    let textNode = document.createTextNode(object.time);
    a11yBox.appendChild(textNode);
    object.tag.parentNode.insertBefore(a11yBox, object.tag.nextSibling);
    object.tag.classList += ' timPrice';
}

/**
 * Dynamically appends stylesheet to pages
 */

function addStyles() {
    let sheet = document.createElement('style');
    sheet.innerHTML = `
        .arrow { 
            visibility:hidden;
        }

        .timPrice::after {
            content:"💰";
            overflow:hidden;
            color:teal;
            z-index:99999 !important;
            transition:0.2s ease-in-out;
            position:absolute;
            text-align:left !important;
            width:20px;
            background:none;
          }

        .timPrice:hover::after {
            background:yellow;
            cursor:pointer;
            width:100px;
            margin-left:-50px;
            animation:addTest 0.5s;
            animation-fill-mode:forwards;
        }

        @keyframes addTest {
            from { content: "💰"}
            to { content: "💰 8hr 6min"}
        }
    `;
    document.body.appendChild(sheet);
    console.log("Sheet added!");
}