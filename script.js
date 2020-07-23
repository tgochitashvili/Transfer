$(document).ready(function(){
    let numAgents = Math.ceil(Math.random()*25);
    let names = [];
    $.when(
        $.getJSON("assets/firstnames.json"),
        $.getJSON("assets/lastnames.json")
    ).done(function(fnames, lnames) {
        let fullnames = [];
        for (var i = 0; i < numAgents; i++)
            fullnames.push(randomChoice(fnames[0]) + " " + randomChoice(lnames[0]));
        
        function randomChoice(data){
            return data[Math.floor(Math.random()*data.length)];
        }
        function generateTable(table, data) {
            for (let element of data) {
                let row = table.insertRow();
                let cell = row.insertCell();
                let text = document.createTextNode(element);
                cell.appendChild(text);
            }
        }
        let table = document.querySelector("table");
        generateTable(table, fullnames);
        
    });

});
function searchAgents(element){
    let input = element.value.toLowerCase();
    let table = $("search");
    let tr = $("tr");
    for(let i = 0; i < tr.length; i++){
        let currentTR = $(tr[i]);
        let td = currentTR.find("td");
        let tdContent = td[0].innerText.toLowerCase()
        if(tdContent.includes(input))
            currentTR.css("display","");
        else
            currentTR.css("display","none");
    }
}
function searchOnFocus(element){
    element.placeholder='';
}

function searchOnFocusOut(element){
    element.placeholder='Search for an agent';
}