
$(document).ready(function(){
  //to open side menu when hamburder icon is clicked on smaller screens
  var side = document.getElementById('dropNav');
  $(".hamburger").click(function(){
    console.log("clicked");
    side.style.width = "100vw";
    //hide miniButtons in gallery due to overlay problem
    $(".miniButtons").css("display", "none");
  });
  $("#closeBttn").click(function(){
    //squish menu to left
    side.style.width = "0";
    //bring back minibuttons in gallery
    $("#shuffleBttn, #fullBttn").css("display", "block");
  });

  var isFullScreen = false;
  //mosaic fullscreen
  $("#fullBttn").click(function(){
    if (isFullScreen == false) {
      $(".miniButtons").css("z-index" , "4");
      $(".mosaicContainer").animate({
        top: "0rem",
        height: "100vh"
      });
      $(".mosaicContainer").css("z-index", "3");
      $("#shuffleBttn").animate({
        top: "0.5rem"
      });
      $("#refreshBttn").fadeIn();
      $("#saveBttn").fadeIn();
      $(".mosaicContainer img").css("opacity", "1" );
      isFullScreen = true;
    }
    else {
      $("#shuffleBttn").animate({
        top: "5.5rem"
      });
      $(".mosaicContainer").animate({
        top: "5rem",
        height: "-=5rem"
      });
      $("#refreshBttn").fadeOut();
      $("#saveBttn").fadeOut();
      $(".miniButtons").css("z-index" , "3");
      setTimeout(function(){
        $(".mosaicContainer").css({
          "z-index": "0"
          // "height": "calc(100vh - 5rem)"
        });
      }, 340);
      $(".mosaicContainer img").css("opacity", "0.8" );
      isFullScreen = false;
    };
  });
var mosaicContents;
  //shuffle mosaic
  $("#shuffleBttn").click(function(){
    var rndm = 0;
    mosaicContents = [];
    console.log("running");
    //loops through each tile of mosaic
    for (var i = 1; i < 10; i++) {
      var checker = true;
      console.log("still running");
      //checks to see if image already picked
      while (checker == true)
      {
        console.log("long running");
        //new random number
        rndm = Math.floor((Math.random() * 16) + 1);
        checker = false;
        //checks array for number
        if (i > 1)
        {
          $.each(mosaicContents, function(index, num)
          {
            if (rndm == num)
            {
              console.log("repeated number random, executed again");
              checker = true;
            }
          })
        }
      }
      //add random nuber to array if it isn't there already
      mosaicContents.push(rndm);
      console.log("adding: "+rndm);
      var tile = ".mos"+i;
      $(tile).empty();
      $(tile).html("<img src='Assets/slider/img"+rndm+".jpg' class='tile' id='"+rndm+"'>");
    };
    $.each( mosaicContents, function(index, num)
    {
      console.log(num);
    });
    //if fullscreen keep images opaque
    if (isFullScreen == true) {
      $(".mosaicContainer img").css("opacity", "1" );
    };
  });

  //save button
  $("#saveBttn").click(function(){
    //parse js array to json array
    var mosaicLocations = JSON.stringify(mosaicContents);
    //save json array to local storage
    localStorage.setItem("mosaic", mosaicLocations);
  });
  //refresh array
  $("#refreshBttn").click(function(){
    console.log("clicked");
    localStorage.removeItem("mosaic");
    //refreshes page
    location.reload();
  });
  //to load saved mosaic
  $(document).ready(function(){
    //check for localStorage
    if(localStorage.getItem("mosaic") != null) {
      console.log("Saved mosaic loaded");
      //parse json array back to js[]
      mosaicContents = JSON.parse(localStorage.getItem("mosaic"))
      //loop through the parsed array and load images into mosaic
      var i = 1;
      $.each(mosaicContents, function(index, num)
      {
        var tile = ".mos"+i;
        $(tile).empty();
        $(tile).html("<img src='Assets/slider/img"+num+".jpg' class='tile' id='"+num+"'>");
        i++;
      });
    };
  });

  var windowWidth = window.innerWidth;
  //fullscreen gallery
  var imgCounter = 1;
  var lastImg;
  var img;
  // if tile clicked
  $('.tile').click(function(){
    console.log("clicked");
    imgCounter = parseInt($(this).children("img").attr("id"));
    console.log(imgCounter);
    changeImage();
    //changes the display value so that gallery appears
    $("#gallery").fadeIn(300);
  });
  //event listener for if left button clicked
  $("#left").click(function(){
    console.log("left clicked");
    imgCounter -= 1;
    if (imgCounter == 0){
      imgCounter = 16;
    };
    lastImg = "#img"+parseInt(imgCounter + 1);
    if (imgCounter == 16) {
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
    if (imgCounter == 17){
      imgCounter = 1
    };
    //close last image
    lastImg = "#img"+parseInt(imgCounter - 1);
    if (imgCounter == 1) {
      lastImg = "#img16";
    }
    console.log("imgCounter="+imgCounter);
    changeImage();
  });
  //close button close gallery and last image
  $("#close").click(function(){
    $("#gallery").fadeOut(300);
    $(img).css("display", "none");
  });

  //stores height and width of images
  var width = 0;
  var height = 0;
  //function to chnge image when buttons are clicked
  function changeImage(){
    img = "#img"+parseInt(imgCounter);
    //fadeout previous image
    $(lastImg).fadeOut(300);

    // make sure img is loaded
    $(img).delay(300).ready(function(){
      //set var width to width of image

        width = $(img).width();
        height = $(img).height();
        console.log(width);
        //center image using width var
        var left = "calc(50vw - "+parseInt(width/2)+"px)";
        var top = "calc(50vh - "+parseInt(height/2)+"px)";
        $(img).css("left" , left);
        //if smaller screen then positions vertical centre
        if (windowWidth < 1055){
          console.log("smallScreen");
          $(img).css("top" , top);
        }
      //fade image in over 0.3secs
      $(img).fadeIn(300);

  });

  };


});
