/*
Matt M
My javascript file for the ordering page
*/

let subtotal = 0; //the subtotal!
let cardActions = document.getElementsByClassName('card-action'); //an array of the card section for eventListenr
setEventListeners();

//Finds the first empty row in the order table and returns it
function getEmptyRow(){
  let orderRows = document.getElementsByClassName("order-row");
  for (var i = 0; i < orderRows.length; i++) {
    if (orderRows[i].firstElementChild.innerText === "") {
      return orderRows[i];
    }
  }
}

//checks if an item is already in the order table and returns true or false
function checkTableContainsItem(item){
  let orderRows = document.getElementsByClassName("order-row");
  for (let i = 0; i < orderRows.length; i++) {
    let rowItem = orderRows[i].children[0].innerText;
    if (rowItem == item) {
      return true;
    }
  }
  return false;
}

//finds the row in the order table containing the item and returns it
function findItemRow(item){
  let orderRows = document.getElementsByClassName("order-row");
  for (var i = 0; i < orderRows.length; i++) {
    let rowItem = orderRows[i].children[0].innerText;
    if (rowItem === item) {
      return orderRows[i];
    }
  }
}

//the main function to be run when an item is clicked on.
function orderItem(actionItem){
  let item = actionItem.path[1].parentElement.querySelector("h6").innerText;
  let itemPrice = parseFloat(actionItem.path[1].parentElement.querySelector("p").innerText, 10);
  let containsItem = checkTableContainsItem(item);
  //add a new item to the grid if it isn't there yet
  if (containsItem === false) {
    let emptyRow = getEmptyRow();
    emptyRow.children[0].innerText = item;
    emptyRow.children[1].innerText = itemPrice;
  }
  //if it is already there, allow the user to order multiple of them
  else if (containsItem === true) {
    let itemRow = findItemRow(item);
    itemRow.children[1].innerText = (parseFloat(itemRow.children[1].innerText, 10) + itemPrice).toFixed(2);
  }
  subtotal += itemPrice;
  //update the subtotal, tax and total
  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("tax").innerText = (subtotal/10).toFixed(2);
  document.getElementById("total").innerText = (subtotal + subtotal/10).toFixed(2);
}

//sets up the addToOrder buttons
function setEventListeners(){
  for (var i = 0; i < cardActions.length; i++) {
    cardActions[i].addEventListener('click', orderItem);
  }
  document.getElementById('order').addEventListener('click', toastFunction);
}

function toastFunction(evt){
  evt.preventDefault();
  if (subtotal === 0) {
    Materialize.toast('Order some food!!!!', 4000);
  }
  else {
    Materialize.toast('Your Order will arrive in approximately one year, thankyou Goodbye', 4000);
  }
}
