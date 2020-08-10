/*jshint esversion: 6 */
var filter = "all"; //default search filter
var bVisible = false; //default window visibility
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
                "<td><img class='avatar' src='https://picsum.photos/200?" + Math.floor(Math.random()*1000)+"'></td>",
                "<td class='name'>" + name + "</td>",
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
    $("input[name='filter']").click(function(){
        filter=$(this).attr("value");
        searchAgents(document.getElementById("search"));
    });
});
function searchAgents(element){
    let input = element.value.toLowerCase();
    let tr = $("tr");
    for(let tri of tr){ 
        let currentRow = $(tri);
        let td = currentRow.find("td");
        let agentName = td[1].innerText.toLowerCase();
        let status = "";
        if (filter==="all"){
            status = filter;
        }
        else
            status = td[2].innerText.toLowerCase();
        
        if(filter===status && agentName.includes(input)){
            td.slideDown("fast");
            currentRow.slideDown("slow");
        }
        else{
            td.slideUp("fast");
            currentRow.slideUp("slow");  
        }
        // if(input!==""){
        //     if(agentName.includes(input)){
        //         if(filter===status){
        //             td.slideDown(400);
        //             currentRow.slideDown(250);
        //         }
        //         else {
        //             td.slideUp(400);
        //             currentRow.slideUp(250);      
        //         }
        //     }
        //     else{
        //         td.slideUp(400);
        //         currentRow.slideUp(250);    
        //     }  
        // }
        // else{
        //     td.slideDown(400);
        //     currentRow.slideDown(250);
        // }

    }
}

// function filterStatus(button){
//     // neutral >> online >> offline >> neutral
//     var filter = "neutral";
//     if(button.classList.contains("neutral")){
//         button.classList.remove("neutral");
//         button.classList.add("online");
//         filter = "online";
//     }
//     else if(button.classList.contains("online")){
//         button.classList.remove("online");
//         button.classList.add("offline");
//         filter = "offline";
//     }
//     else if(button.classList.contains("offline")){
//         button.classList.remove("offline");
//         button.classList.add("neutral");
//         filter = "neutral";
//     }
//     let tr = $("tr");
//     for(let tri of tr){
//         let currentRow = $(tri);
//         td = currentRow.find("td");
//         switch(filter){
//             case "neutral":
//                 td.slideDown();
//                 currentRow.slideDown();
//                 break;
//             case "online":
//                 if(td[2].innerText=="Online"){
//                     td.slideDown();
//                     currentRow.slideDown();
//                 }
//                 else{
//                     td.slideUp();
//                     currentRow.slideUp();
//                 }
//                 break;
//             case "offline":
//                 if(td[2].innerText=="Offline"){
//                     td.slideDown();
//                     currentRow.slideDown();
//                 }
//                 else{
//                     td.slideUp();
//                     currentRow.slideUp();
//                 }  
//         }
//     }
// }



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
    }
    searchAgents(document.getElementById("search"));
}