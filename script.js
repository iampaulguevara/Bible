

// Pulls the HTML source code
//console.log(window.document.getElementById("test").outerHTML);

// Pulls the text content within the HTML (?)
//console.log(window.document.getElementById("test").innerHTML);

// Pulls the text content within the HTML as well?
//console.log(window.document.getElementById("test").textContent);

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
                window.text = allText;
            }
        }
    }
    rawFile.send(null);
}


// need to rename this function - it's the update to the page
// need to make the page also update on enter keypress (not just button click)
function getInputValue(){
    var inputVal = document.getElementById("search").value;
    window.document.getElementById("book").innerHTML = inputVal;

    var book = inputVal.split(" ")[0];
    var chapter = inputVal.split(" ")[1];

    readTextFile("Books/"+book+"/"+chapter+".txt");
    window.document.getElementById("scripture").innerHTML = text;

};

var search = document.getElementById("search");
search.addEventListener("keypress",function(event){
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search-button").click()
    }
}

// Inserts the text into the HTML DOM
//window.document.getElementById("book").innerHTML = book + " " + chapter;
