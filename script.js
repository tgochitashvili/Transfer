let numAgents = Math.ceil(Math.random()*25);
let names = [];
$.when(
    $.getJSON("assets/firstnames.json"),
    $.getJSON("assets/lastnames.json")
).done(function(fnames, lnames) {
    let fullnames = [];
    for (var i = 0; i < numAgents; i++)
        fullnames.push(randomchoice(fnames[0]) + " " + randomchoice(lnames[0]));
    
    function randomchoice(data){
        return data[Math.floor(Math.random()*data.length)];
    }
    function generateTable(table, data) {
        for (let element of data) {
          let row = table.insertRow();
          for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
          }
        }
    }
    let table = document.querySelector("table");
    generateTable(table, fullnames);
});