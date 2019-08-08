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
let prices = findPrices();
let timeObjects = [];
chrome.storage.sync.get('wage', (value) => {
    for (let i = 0; i < prices.length; i++) {
        let dollarSignIndex = prices[i].innerHTML.indexOf('$');
        let price = (prices[i].innerHTML).slice(dollarSignIndex + 1);
        let decimalQuotient = price/value.wage;
        let hours = Math.trunc(decimalQuotient);
        let minutes = Math.round((decimalQuotient % 1) * 60);
        //console.log(`price: ${price}\ndecimalQuotient: ${decimalQuotient}\nhours: ${hours}\nminutes: ${minutes}`)
        if (isNaN(decimalQuotient)) {
            generateElement(null);
        }
        else {
            generateElement({
                time: `${hours} hr, ${minutes} min`,
                tag: prices[i]
            });
        }
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
function findPrices() {
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
 * Generates script that appends elements to DOM with
 * given { time: string, tag: HTMLElement } object
 */
function generateElement(object) {
    if (!object) {
        return;
    }
    let a11yBox = document.createElement("DIV");
    a11yBox.classList = "arrow"
    let textNode = document.createTextNode("⏰" + object.time);
    a11yBox.appendChild(textNode);
    object.tag.parentNode.appendChild(a11yBox);
    //object.tag.appendChild(a11yBox);
    //object.tag.parentNode.insertBefore(a11yBox, object.tag.nextSibling);
    object.tag.classList += ' timPrice';
}

/**
 * Dynamically appends stylesheet to pages
 */

function addStyles() {
    let sheet = document.createElement('style');
    sheet.innerHTML = `
        .arrow { 
            position:relative;
            text-decoration:none !important;
            word-break:break-word;
        }

        * > .arrow,
        .a-button-text {
            min-width:200px;
        }

        .a-button-text {
            min-height:80px;
        }

        .timPrice::after {
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
    `;
    document.body.appendChild(sheet);
}