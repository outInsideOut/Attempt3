
$(document).ready(function(){
  //to open side menu when hamburder icon is clicked on smaller screens
  var side = document.getElementById('dropNav');
  $(".hamburger").click(function(){
    console.log("clicked");
    side.style.width = "100vw";
  });
  $("#closeBttn").click(function(){
    side.style.width = "0";
  });


  //fullscreen gallery
  var imgCounter = 1;
  var lastImg;
  var img;
  // if tile clicked
  $('.tile').click(function(){
    console.log("clicked");
    imgCounter = parseInt(this.id);
    changeImage();
    //changes the display value so that gallery appears
    $("#gallery").fadeIn(300);
  });

  $("#left").click(function(){
    console.log("left clicked");
    imgCounter -= 1;
    if (imgCounter == 0){
      imgCounter = 9;
    };
    lastImg = "#img"+parseInt(imgCounter + 1);
    if (imgCounter == 9) {
      lastImg = "#img1";
    }
    changeImage();
  });
  //event listener for right button clicked
  $("#right").click(function(){
    console.log("right clicked");
    //increase counter
    imgCounter += 1;
    //loop around if last image
    if (imgCounter == 10){
      imgCounter = 1
    };
    lastImg = "#img"+parseInt(imgCounter - 1);
    if (imgCounter == 1) {
      lastImg = "#img9";
    }
    changeImage();
  });
  //close button close gallery
  $("#close").click(function(){
    $("#gallery").fadeOut(300);
    $(img).css("display", "none");
  });

  var width = 0;
  function changeImage(){
    img = "#img"+parseInt(imgCounter);
    //fadeout previous image
    $(lastImg).fadeOut(300);

    // make sure img is loaded
    $(img).delay(300).ready(function(){
      //set var width to width of image
      width = $(img).width();
      console.log(width);
      //center image using width var
      var left = "calc(50vw - "+parseInt(width/2)+"px)";
      $(img).css("left" , left);
      //fade image in over 0.3secs
      $(img).fadeIn(300);

  });

};
});
