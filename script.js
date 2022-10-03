// Pulls the HTML source code
//console.log(window.document.getElementById("test").outerHTML);

// Pulls the text content within the HTML (?)
//console.log(window.document.getElementById("test").innerHTML);

// Pulls the text content within the HTML as well?
//console.log(window.document.getElementById("test").textContent);

// Inserts the text into the HTML DOM
// window.document.getElementById("scripture").innerHTML = text;

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


// updates the page when the user clicks on the search button
function updatePage(){
    // updates the header of the page with the book and chapter
    var inputVal = document.getElementById("search").value;
    window.document.getElementById("book").innerHTML = inputVal;

    // need to fix this. this doesn't work when the book name has spaces e.g. "2 Peter"
    // the book name will be read as "2"
    var book = inputVal.split(" ")[0];
    var chapter = inputVal.split(" ")[inputVal.split(" ").length-1];

    // updates the main body of the page with the scripture
    readTextFile("Books/"+book+"/"+chapter+".txt");
    window.document.getElementById("scripture").innerHTML = text;
};

var search = document.getElementById("search");
search.addEventListener("keypress",function(event){
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search-button").click()
    }
});

