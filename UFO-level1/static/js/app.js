//from data.js
var tableData = data;

// YOUR CODE HERE!
//Level 1: Automatic Table and Date Search (Required)
//Create a basic HTML web page or use the index.html file provided (we recommend building your own custom page!).
//Using the UFO dataset provided in the form of an array of JavaScript objects, 
//write code that appends a table to your web page and then adds new rows of data for each UFO sighting.
//Make sure you have a column for date/time, city, state, country, shape, and comment at the very least.
//Use a date form in your HTML document and write JavaScript code that will listen for events and search 
//through the date/time column to find rows that match user input.
//Using multiple input tags and/or select dropdowns, write JavaScript code so the user can to set multiple filters and search for UFO sightings using the following criteria based on the table columns:
//date/time
//city
//state
//country
//shape

var tbody = d3.select("tbody")

function buildtable(data) {
    tbody.html("");
    data.forEach((dataRow) => {
        //append row into table body
        var row = tbody.append("tr");
        //loop through each field in data row and add each value as cell
        Object.values(dataRow).forEach((value) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
}
var filters = {};

function updatefilters() {
    var changedelement = d3.select(this).select("input")
    var inputvalue = changedelement.property("value")
    var filterid = changedelement.attr("id")
    if(inputvalue) {
        filters[filterid] = inputvalue;
    }
    else {
        delete filters[filterid]
    }
    filtertable();
}
function filtertable() {

    var filterdata = tableData
    Object.entries(filters).forEach(([key,value]) =>  {
        filterdata = filterdata.filter(row => row[key] === value);
    });
    buildtable(filterdata)
}

function handleclick() {
    var date = d3.select("#datetime").property("value")
    var filterdata = tableData
    if(date) {
        filterdata = filterdata.filter(row => row.datetime === date);

    }
    buildtable(filterdata)
}
d3.selectAll(".filter").on("change",updatefilters)
d3.selectAll("#filter-btn").on("click",handleclick)

buildtable(tableData)
