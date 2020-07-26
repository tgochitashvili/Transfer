var bVisible = false;
var secondsToRandomize = 2;
$(document).ready(function(){
    let numAgents = Math.ceil(Math.random()*50);
    $.when(
        $.getJSON("assets/firstnames.json"),
        $.getJSON("assets/lastnames.json")
    ).done(function(fnames, lnames) {
        let departments = [
            "Customer Service",
            "Sales",
            "HR Department",
            "PR Department"
        ];
        let fullnames = [];
        for (var i = 0; i < numAgents; i++)
            fullnames.push(randomChoice(fnames[0]) + " " + randomChoice(lnames[0]));
        let tbody = $("table").find("tbody");
        for(var name of fullnames){
            var rand = Math.round(Math.random());
            var status = rand?"active":"inactive";
            var agent=[
                "<td><img class='avatar' src='https://picsum.photos/200?"+Math.floor(Math.random()*1000)+"'></td>",
                "<td>" + name + "</td>",
                "<td class='status'>" + (rand?"Online":"Offline") + "</td>",
                "<td>" + randomChoice(departments) + "</td>",
                "<td class='serving'>Serving " + Math.floor(Math.random()*15) + "</td>" 
            ];
            tbody.append("<tr class = '"+ status + "'>" + agent + "</tr>");
        }
        let tr = tbody.find("tr");
        let intervalID = window.setInterval(randomizeStatus,secondsToRandomize*1000,tr);
        
        function randomChoice(data){
            return data[Math.floor(Math.random()*data.length)];
        }       
    });

});
function searchAgents(element){
    let input = element.value.toLowerCase();
    let tr = $("tr");
    for(let i = 0; i < tr.length; i++){
        let currentTR = $(tr[i]);
        let td = currentTR.find("td");
        let agentName = td[1].innerText.toLowerCase()
        if(agentName.includes(input)){
            td.slideDown(400);
            currentTR.slideDown(250);
        }
        else{
            td.slideUp(400);
            currentTR.slideUp(250);
        }
    }
}
function searchOnFocus(element){
    element.placeholder='';
}
function searchOnFocusOut(element){
    element.placeholder='Search for an agent';
}
function toggleWindow(){
    var window = $(".transferwindow");
    var toggle = $(".toggletransfer");
    if(bVisible){
        window.slideUp();
        toggle.slideDown();
        bVisible = false;
    }
    else{
        toggle.slideUp();
        window.slideDown();
        bVisible = true;    
    }
}
function randomizeStatus(tr){
    for(var tri of tr){
        var rand = Math.round(Math.random());
        var status = tri.classList.contains("active");
        var td = $(tri).find("td");
        if(rand && !status){
            tri.classList.remove("inactive");
            tri.classList.add("active");
            td[2].innerText = "Online";
        }
        else if(!rand && status){
            tri.classList.add("inactive");
            tri.classList.remove("active");
            td[2].innerText = "Offline";
        }
        // let currentTR = $(tr[i]);
        // let td = currentTR.find("td");
        // let tdContent = td[2];
    }
}