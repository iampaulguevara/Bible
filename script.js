

// Pulls the HTML source code
//console.log(window.document.getElementById("test").outerHTML);

// Pulls the text content within the HTML (?)
//console.log(window.document.getElementById("test").innerHTML);

// Pulls the text content within the HTML as well?
//console.log(window.document.getElementById("test").textContent);

var book = "John";
var chapter = 1;

var verse1 = "<i><sup><b>1</b></sup> In the beginning was the Word, and the Word was with God, and the Word was God.</i>";
var verse2 = "<i><sup><b>2</b></sup> He was in the beginning with God.</i>";
var verse3 = "<i><sup><b>3</b></sup> All things came into being through him, and without him not one thing came into being. What has come into being </i>";
var verse4 = "<i><sup><b>4</b></sup> in him was life, and the life was the light of all people.</i>";
var verse5 = "<i><sup><b>5</b></sup> The light shines in the darkness, and the darkness did not overcome it.</i>";

var scripture = verse1+" "+verse2+" "+verse3+" "+verse4+" "+verse5;

// Inserts the text into the HTML DOM
window.document.getElementById("book").innerHTML = book;
window.document.getElementById("scripture").innerHTML = scripture;


// need to create a local server for the browser to access the file

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

readTextFile("John.txt");

console.log(text);