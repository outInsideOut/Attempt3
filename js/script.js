
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
      $("#refreshBttn").fadeIn(300);
      $("#saveBttn").fadeIn(300);
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
      $("#refreshBttn").fadeOut(300);
      $("#saveBttn").fadeOut(300);
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
    $(img).ready(function(){
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

  //
  //
  //customiser//
  //set frontCover to selected coversSect
  $(".customMenu.front img").click(function(){
    //stores the id of the clicked cover
    var imgNo = $(this).attr("id");
    console.log(imgNo);
    //empties div and then writes in an img element using the imgNo
    $(".customFront").empty().html("<img src='Assets/allTheDarkSides/darkSide"+imgNo+".jpg'> ");
    //Save to local storage
    localStorage.setItem("frontCover", imgNo);
  });
  //sets back cover
  $(".customMenu.back img").click(function(){
    var imgNo = $(this).attr("id");
    $(".customBack").empty().html("<img src='Assets/allTheDarkSides/darkSide"+imgNo+".jpg'> ");
    //save to local storage
    localStorage.setItem("backCover", imgNo);
  });
  var diskNo;
  $(".customMenu.disk img").click(function(){
    diskNo = $(this).attr("id");
    diskNo = $(this).attr("id");
    $(".customSide.disk").empty().html("<img src='Assets/allTheDarkSides/darkSide"+diskNo+".jpg'> ");
    //save to local storage
    localStorage.setItem("diskImg", diskNo);
    //unchecks colour disk box
    $("#isColour").prop("checked", false);
    //sets local storage for checking if it's a colour disk
    isColour = false;
    localStorage.setItem("isColour", isColour);
  });
  //if sticker checkbox is ticked
  var sticker = true;
  $("#sticker").click(function(){
    //check property
    if($(this).prop("checked") == true){
      $(".ringsDiv").empty().html("<img src='Assets/darkCentre.png' class='vinylRings  disk'> ");
      sticker = true;
    }
    else{
      $(".ringsDiv").empty().html("<img src='Assets/vinylRings.png' class='vinylRings disk'> ");
      sticker = false;
    };
    //store sticker or not to local storage
    localStorage.setItem("sticker", sticker);
    //make .customBox .disk visible
    $(".customBox .disk").css("display", "block");
  });
  //colour disk
  var isColour = true;
  var colour = $("#colourPicker").val();
  var opacity = $("#opacityPicker").val();
  //when colour disk checkbox ticked
  $("#isColour").click(function(){
    if($(this).prop("checked") == true){
      //removes image from disk
      $(".customSide.disk").empty();
      isColour = true;
      console.log($("#colourPicker").val());
      //sets css background-color of disk to colour picker value
      $(".customSide.disk").css({
        "background-color": colour,
        "opacity" : opacity
      });
    }
    //if box unchecked
    else {
      //check local storage
      if(localStorage.getItem("diskImg") != null) {
        var imgNo = localStorage.getItem("diskImg");
        //set disk back to having the image selected previously.
        $(".customSide.disk").empty().html("<img src='Assets/allTheDarkSides/darkSide"+imgNo+".jpg'> ");
      }
      else {
        $(".customSide.disk").empty().html("<img src='Assets/allTheDarkSides/darkSide"+diskNo+".jpg'> ");
      };
      isColour = false;
    };
    localStorage.setItem("isColour" , isColour);
  });

  //opacity change
  $("#opacityPicker").change(function(){
    //console.log("opacity changed");
    //reads value from slider
    opacity = $("#opacityPicker").val() / 100;
    //sets disk opacity to value on slider
    $(".customSide.disk").css("opacity" , opacity);
    //stores the slider value to local storage
    localStorage.setItem("opacity" , opacity);
  });
  //colour change
  $("#colourPicker").change(function(){
    //stores value from colourPicker
    colour = $("#colourPicker").val();
    //sets disk colour to value from colourPicker
    $(".customSide.disk").css("background-color" , colour);
    //save colour to local storage
    localStorage.setItem("colour", colour);
  })

  //local storage retrieval on load
  $(document).ready(function(){
      //load from local localStorage
    if (localStorage.getItem("frontCover") != null) {
        var imgNo = localStorage.getItem("frontCover");
        $(".customFront").empty().html("<img src='Assets/allTheDarkSides/darkSide"+imgNo+".jpg'> ");
      };
    if (localStorage.getItem("backCover") != null) {
      imgNo = localStorage.getItem("backCover");
      $(".customBack").empty().html("<img src='Assets/allTheDarkSides/darkSide"+imgNo+".jpg'> ");
    };
    if (localStorage.getItem("diskImg") != null) {
      imgNo = localStorage.getItem("diskImg");
      $(".customSide.disk").empty().html("<img src='Assets/allTheDarkSides/darkSide"+imgNo+".jpg'> ");
    };
    if (localStorage.getItem("colour") != null) {
      colour = localStorage.getItem("colour");
      $("#colourPicker").val(colour);
      if (localStorage.getItem("isColour") == "true") {
        $(".customSide.disk").empty().css("background-color" , colour);
        //ticks colour checkbox
        $("#isColour").prop("checked", true);
      };
    };
    if (localStorage.getItem("opacity") != null) {
      opacity = localStorage.getItem("opacity");
      $(".customSide.disk").css("opacity" , opacity);
    };
    if (localStorage.getItem("sticker") == "true") {
      $(".ringsDiv").empty().html("<img src='Assets/darkCentre.png' class='vinylRings  disk'> ");
      $("#sticker").prop("checked", true);
    }
    //load tracker width
    trackerWidth(1);
  });

  function trackerWidth(step){
    var width = $(".step1").outerWidth() * step;
    console.log(width.toString());
    $(".tracker").animate({
      width : width.toString()
    })
  };

  var disk = false;
  //change to front cover
  $(".step1").click(function(){
    trackerWidth(1);
    //turn album right way around
    $(".customFront").css("transform", "rotateY(0deg)");
    $(".customBack").css("transform", "rotateY(180deg)");
    //fade out steps 2 & 3
    //fade in step 1
    $(".customMenu.back, .disk").fadeOut(300);
    $(".customMenu.front").delay(300).fadeIn(300);
    if(disk == true) {
      $(".disk").fadeOut(300);
      $(".customAlbum").delay(300).fadeIn(300);
    };

    disk = false;
  });
  //change to back
  $(".step2").click(function(){
    $(".customFront").css("transform", "rotateY(-180deg)");
    $(".customBack").css("transform", "rotateY(0deg)");
    $(".customMenu.front, .disk").fadeOut(300);
    $(".customMenu.back").delay(300).fadeIn(300);
    console.log("click");
    trackerWidth(2);
    if(disk == true) {
      $(".disk").fadeOut(300);
      $(".customAlbum").delay(300).fadeIn(300);
    }

   disk = false;
 });
 //change to DISK
 $(".step3").click(function(){
   trackerWidth(3);
   console.log("disk clicked");
   $(".customMenu.front, .customMenu.back").fadeOut(300);
   $(".customAlbum").fadeOut(300);
   $(".disk").delay(300).fadeIn(300);
   disk = true;

 });
 $(".step4").click(function(){
   trackerWidth(4);
 });
});
