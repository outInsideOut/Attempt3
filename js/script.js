
$(document).ready(function(){
  //to open side menu when hamburder icon is clicked on smaller screens
  var side = document.getElementById('dropNav');
  $(".hamburger").click(function(){
    console.log("clicked");
    side.style.width = "100vw";
  });
  $("#closeBttn").click(function(){
    side.style.width = "0";
  })



});
