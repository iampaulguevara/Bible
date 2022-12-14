// Pulls the HTML source code
//console.log(window.document.getElementById("test").outerHTML);

// Pulls the text content within the HTML (?)
//console.log(window.document.getElementById("test").innerHTML);

// Pulls the text content within the HTML as well?
//console.log(window.document.getElementById("test").textContent);

// Inserts the text into the HTML DOM
// window.document.getElementById("scripture").innerHTML = text;

// testing line breaks between paragraphs
var breaks_json = JSON.parse(breaks);

console.log(breaks)

// adds HTML superscript and bold tags on the verse numbers. NOTE - if the text contains a number which happens to align with
// the verse number, this function will not properly format the passage. (are there instances of this..?)
// this needs to be fixed. when a book/chapter is searched, it will get formatted according to the Gospel of the Day
function format_verse(unformatted_verse,gospel=false){
    const test_str_array = unformatted_verse.split(" ")
    var formatted_verse = "&nbsp;&nbsp;"
    verseCounter = 1

    for (let i = 0; i < test_str_array.length; i++){
        if(["Mark","John"].includes(window.gospelOfTheDay) && gospel==true){ // if statement to be removed once breaks.json is completed for all Gospels...also need to apply this when page is searched - not just on Gospel of the Day
            if(window.breaks_json[window.gospelOfTheDay][window.chapterOfTheDay.toString()].includes(parseInt(test_str_array[i]))){
                formatted_verse+='<br>&nbsp;&nbsp; '
            }
        }
        if(test_str_array[i]==verseCounter){
            formatted_verse+= "<sup>"+test_str_array[i]+"</sup> "
            verseCounter+=1
        }
        else{
            formatted_verse+=test_str_array[i]+" "
        }
    }

    // removes the extra space at the end
    return formatted_verse.slice(0,formatted_verse.length-1); 
};

var rand = Math.random();
var rand2 = Math.random();
var gospelOfTheDay;
var chapterOfTheDay;

// e.g. for Matthew the argument to Math.round() will vary from 0.5 to 28.5
// this gives an equal probability for any chapter to be selected. ([0.5, 1.5) -> 1, [1.5, 2.5) -> 2, etc.)
if(rand < 0.25){
    // 28 books
    gospelOfTheDay = "Matthew"
    chapterOfTheDay = Math.round(rand2*28+0.5)
}
else if(rand < 0.5){
    // 16 books
    gospelOfTheDay = "Mark"
    chapterOfTheDay = Math.round(rand2*16+0.5)
}
else if(rand < 0.75){
    // 24 books
    gospelOfTheDay = "Luke"
    chapterOfTheDay = Math.round(rand2*24+0.5)
}
else{
    // 21 books
    gospelOfTheDay = "John"
    chapterOfTheDay = Math.round(rand2*21+0.5)
};

window.document.getElementById("book").innerHTML = gospelOfTheDay + " " + chapterOfTheDay;

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
};


// testing linebreaks between paragraphs
//var test_script = "1 After these things Jesus manifested himself again to the disciples at the sea of Tiberias; and he manifested `himself' on this wise. 2 There was together Simon Peter, and Thomas called Didymus, and Nathanael of Cana in Galilee, and the `sons' of Zebedee, and two other of his disciples. 3 Simon Peter saith unto them, I go a fishing. They say unto him, We also come with thee. They went forth, and entered into the boat; and that night they took nothing. 4 But when day was now breaking, Jesus stood on the beach: yet the disciples knew not that it was Jesus. 5 Jesus therefore saith unto them, Children, have ye aught to eat? They answered him, No.";
//window.document.getElementById("scripture").innerHTML = format_verse(test_script);


// randomly generated Gospel of the Day (actually changes after each refresh) - before any searches/updates are requested
readTextFile("Books/"+gospelOfTheDay+"/"+chapterOfTheDay+".txt");
window.document.getElementById("scripture").innerHTML = format_verse(text,true);


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
    window.document.getElementById("scripture").innerHTML = format_verse(text);
};

var search = document.getElementById("search");
search.addEventListener("keypress",function(event){
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search-button").click()
    }
});
