// Code goes here

function mouseisdown() {
  console.log("mouse down");
}
function mouseisup() {
  console.log("mouse up");
  
  
  var rg = document.getElementById("rng");
  
  if(rg.value > 50) {
	  rg.value = 30;
  }
  
}