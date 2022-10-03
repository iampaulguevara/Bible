

// Pulls the HTML source code
//console.log(window.document.getElementById("test").outerHTML);

// Pulls the text content within the HTML (?)
//console.log(window.document.getElementById("test").innerHTML);

// Pulls the text content within the HTML as well?
//console.log(window.document.getElementById("test").textContent);

var book = "John";
var chapter = 1;
var text;

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                //alert(allText);
                window.text = allText;
            }
        }
    }
    rawFile.send(null);
}

readTextFile("Books/John/1.txt");


// Inserts the text into the HTML DOM
window.document.getElementById("book").innerHTML = book;
window.document.getElementById("scripture").innerHTML = text;