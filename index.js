//public vars
var expense = {descrip:" ", price:0.0, date:""};
var expenseList = localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
if(expenseList.length>0){
    displayEach();
}
var sum;
//front-end functions
function noSeeDiv(thing){
    document.getElementById(thing).classList.toggle("no-see");
}
function move(){
    document.getElementById("nav-bar").classList.toggle("move-nav");
    document.getElementById("nav-bar").classList.toggle("no-vis");
    document.getElementById("nav-btn").classList.toggle("left");
    var mains = document.getElementsByClassName("main");
    // console.log(mains);
    mains[0].classList.toggle("move-main");
}
//object functions
function setExpName(name){
    expense.descrip = name.capitalize();
}
function setExpPrice(price){
    expense.price = price;
}
function setDate(){
    let dt = new Date();
    let m = dt.getMonth()+1;
    let d = dt.getDate();
    let f = m+"/"+d;
    expense.date = f;
}
function addToList(exp){
    expenseList.push(Object.assign({},exp));   //using object.assign to shallow copy the object instead of deep copying it
    localStorage.setItem("list",JSON.stringify(expenseList));
}
//helper functions
String.prototype.capitalize = function() { //stole this from:https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    return this.charAt(0).toUpperCase() + this.slice(1);
}
function displayEach(){//removing and redisplaying bc when we remove a div from xpns, we need to regenerate the button ids sop that they can match the correct expense in the list
    let list = Array.from(expenseList); 
        list.forEach(function(x){
            readandDisplay(x);
        });
}
function removeAllChildren(xpns){//remove all children of an element, pass in the parent element
    while(xpns.firstChild){                             //removing everything from the div: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
        xpns.removeChild(xpns.firstChild);
    }
}
function remove(parentId,childId){//remove a specific child from a parent element
    let child = document.getElementById(childId);
    let parent = document.getElementById(parentId)
    
    parent.removeChild(child); 
}
//main functions
function createInput(){//creates the inputs (description and price), a button (cancel) and stores them into a div, then makes the div a child of the xpns div
    //hide the add button
    noSeeDiv("add-btn");
    
    var div = document.createElement("DIV");
    var input = document.createElement("INPUT");
    var price = document.createElement("INPUT");
    var btn = document.createElement("BUTTON");

    div.id="npt-div";
    input.setAttribute("type", "text");
    input.setAttribute("placeholder","Enter Expense");
    price.setAttribute("type", "number"); 
    price.setAttribute("placeholder","0.00");
    
    btn.innerHTML = "Cancel"; 

    div.appendChild(input);
    div.appendChild(price);
    div.appendChild(btn);
    
    var xpns =  document.getElementById("xpns");
    xpns.appendChild(div);
    btn.addEventListener("click",function(){//for the clear button
        remove("xpns","npt-div");    
        noSeeDiv("add-btn");
    });

    input.addEventListener("change",function(){
        setDate();
        setExpName(input.value);
    });
    price.addEventListener("change",function(){
        removeAllChildren(xpns);
        setExpPrice(price.value);
        addToList(expense); 
        //console.log(expenseList);
       // remove("xpns","npt-div");
        displayEach();
        noSeeDiv("add-btn");//show the button again
        // readandDisplay(expense);
    });
}
function readandDisplay(expense){//converts the inputs into outputsand the button (delete instead of cancel)
    try{
        var xpns =  document.getElementById("xpns");
            // while(xpns.firstChild){                             //removing all the buttons: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
            //     xpns.removeChild(xpns.firstChild) 
            // }
        var div = document.createElement("DIV");
        
        var d = document.createElement("BUTTON");
        // d.style.borderTop="none";
        // d.style.borderBottom="none";
        // d.style.borderLeft="none";
        var p1 = document.createElement("BUTTON");
        // p1.style.borderTop="none";
        // p1.style.borderBottom="none";
        // p1.style.borderLeft="none";
        
        var p2 = document.createElement("BUTTON");
        // p2.style.borderTop="none";
        // p2.style.borderBottom="none";
        // p2.style.borderLeft="none";
       
        var btn =  document.createElement("BUTTON");
        btn.innerHTML = "Delete"; 
        btn.id = expenseList.length - 1; //push always adds at the end so the id can be the size of the button can be the size of expense list array -1 {will be the index of the item to be removed}
        
        d.innerHTML = expense.date;
        // console.log(expense.date);
        p1.innerHTML = expense.descrip;
        p2.innerHTML = "$"+expense.price;
        
        div.appendChild(d);
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(btn);

        div.style.gridTemplateColumns = ".3fr 1fr 1fr .5fr";
        xpns.appendChild(div);
        btn.addEventListener("click",function(){//delete button
            xpns.removeChild(div); //save the div name and price into variables and search throught the array to remove the one that matches those
            // console.log(btn.id);
            expenseList.splice(btn.id,1);
            localStorage.setItem("list",JSON.stringify(expenseList));
            // let delete_btns = 
            removeAllChildren(xpns);
            displayEach();
        });
    }catch(e){
        console.log("trying to output expenses while in main:cant find the xpns div lol");
    }
    
}
function onSubmit(){
    noSeeDiv("input-div");
    noSeeDiv("inpt-btn");
    let p1 = document.getElementById("desc-input");
    let p2 = document.getElementById("amount-input");

    if(!(p1.value===" ")&&p2.value > 0){
        setExpName(p1.value);
        setExpPrice(p2.value);
        setDate();
        addToList(expense);
        alert("successfully Added!");// a green checkmark should animate and faded out instead
    }
    else{
        alert("Error!\nSubmition failed because No")
    }
    p1.value = null;
    p2.value = null;
}