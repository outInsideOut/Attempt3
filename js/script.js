
$(document).ready(function(){
  var side = document.getElementById('dropNav');
  $(".hamburger").click(function(){
    console.log("clicked");
    side.style.width = "100vw";
  });
  $("#closeBttn").click(function(){
    side.style.width = "0";
  })
});
