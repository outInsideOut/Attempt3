// make sure the no script is executed before all dom is complete
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

//bool variable to track if the mosaic is full screen
  var isFullScreen = false;
  //mosaic fullscreen button click event listener
  $("#fullBttn").click(function(){
    //if the mosaic isn't allready fullscreen
    if (isFullScreen == false) {
      // change z-index in css to make sure the buttons stay on top
      $(".miniButtons").css("z-index" , "4");
      // make mosaic fullscreen
      $(".mosaicContainer").animate({
        top: "0rem",
        height: "100vh"
      });
      //bring mosaic above the storm button
      $(".mosaicContainer").css("z-index", "3");
      // move shuffle button to top of screen
      $("#shuffleBttn").animate({
        top: "0.5rem"
      });
      // show the reset button and save button
      $("#refreshBttn").fadeIn(300);
      $("#saveBttn").fadeIn(300);
      // make the images opaque
      $(".mosaicContainer img").css("opacity", "1" );
      //track that mosaic is fullscreen
      isFullScreen = true;
    }
    //if the mosaic is already fullscreen
    else {
      //move the shuffle button back down
      $("#shuffleBttn").animate({
        top: "5.5rem"
      });
      //make the mosaic original size and position
      $(".mosaicContainer").animate({
        top: "5rem",
        height: "-=5rem"
      });
      // make the reset and save buttons dissapear
      $("#refreshBttn").fadeOut(300);
      $("#saveBttn").fadeOut(300);
      //bring buttons back down a layer
      $(".miniButtons").css("z-index" , "3");
      // move mosaic back to behind the storm button
      //set timeout stops the function from firing for 300ms
      setTimeout(function(){
        $(".mosaicContainer").css({
          "z-index": "0"
          // "height": "calc(100vh - 5rem)"
        });
      }, 340);
      //bring images to original translucency
      $(".mosaicContainer img").css("opacity", "0.8" );
      // track that mosaic is no longer full screen
      isFullScreen = false;
    };
  });
  //array to store the image ids
var mosaicContents;
  //shuffle mosaic
  $("#shuffleBttn").click(function(){
    // variable to store a random number
    var rndm = 0;
    //declare variable is an array
    mosaicContents = [];
    //log below was just to check the function runs
    //console.log("running");
    //loops through each tile of mosaic
    for (var i = 1; i < 10; i++) {
      //variable for looping purposes
      var checker = true;
      //more log to check function of function
      console.log("still running");
      //checks to see if image already picked
      while (checker == true)
      {
        console.log("long running");
        //new random number between 1 & 16
        rndm = Math.floor((Math.random() * 16) + 1);
        checker = false;
        //checks array for number
        if (i > 1)
        {
          // loops though each element of array
          $.each(mosaicContents, function(index, num)
          {
            //checks to see if the random number generated is already stored in the array
            if (rndm == num)
            {
              //just for checking again
              // console.log("repeated number random, executed again");
              //causes to loop again by changing checker value
              checker = true;
            }
          })
        }
      }
      //add random number to array if it isn't there already
      mosaicContents.push(rndm);
      console.log("adding: "+rndm);
      //use the for loop var to  make a string which will equal a tile of the mosaic's class
      var tile = ".mos"+i;
      //find relevant tile and empty contents of div
      $(tile).empty();
      //write html in the div which will retrieve the random image using the variables generated
      $(tile).html("<img src='Assets/slider/img"+rndm+".jpg' class='tile' id='"+rndm+"'>");
    };
    // foreach loop to check array
    // $.each( mosaicContents, function(index, num)
    // {
    //   console.log(num);
    // });
    //if fullscreen keep images opaque by changing the css
    if (isFullScreen == true) {
      $(".mosaicContainer img").css("opacity", "1" );
    };
  });

    //save button
  $("#saveBttn").click(function(){
    //parse js array to json string array
    var mosaicLocations = JSON.stringify(mosaicContents);
    //save json array to local storage
    localStorage.setItem("mosaic", mosaicLocations);
  });
  //refresh array button event listener
  $("#refreshBttn").click(function(){
    //just for checking function is fired
    // console.log("clicked");
    localStorage.removeItem("mosaic");
    //refreshes page
    location.reload();
  });
  //to load saved mosaic
    //check for localStorage
    if(localStorage.getItem("mosaic") != null) {
      // log for checking below
      // console.log("Saved mosaic loaded");
      //parse json string array back to js[]
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

  var windowWidth = window.innerWidth;
  //fullscreen gallery
  //variable to count which image is shown in the gallery
  var imgCounter = 1;
  //variable to hold the last image shown which needs to be faded out
  var lastImg;

  var img;
  // if tile clicked
  $('.tile').click(function(){
    console.log("clicked");
    //store the id from the image clicked on
    imgCounter = parseInt($(this).children("img").attr("id"));

    // console.log(imgCounter); //for checking
    //see function changeImage();
    changeImage();
    //changes the display value so that gallery appears
    $("#gallery").fadeIn(300);
  });
  //event listener for if left button clicked
  $("#left").click(function(){
    //log to check funtion fired
    // console.log("left clicked");
    //decrease image counter
    imgCounter -= 1;
    //loop around if first image
    if (imgCounter == 0){
      imgCounter = 16;
    };
    //track prev image
    lastImg = "#img"+parseInt(imgCounter + 1);
    //loop around to first image if it is the final image
    if (imgCounter == 16) {
      lastImg = "#img1";
    }
    //fucntion to change theimage shown (see below)
    changeImage();
  });
  //event listener for right button clicked
  $("#right").click(function(){
    // log to check function fires
    // console.log("right clicked");
    //increase counter
    imgCounter += 1;
    //loop around if last image
    if (imgCounter == 17){
      imgCounter = 1
    };
    //looparound if first image
    lastImg = "#img"+parseInt(imgCounter - 1);
    if (imgCounter == 1) {
      lastImg = "#img16";
    }
    //log for checking
    // console.log("imgCounter="+imgCounter);
    changeImage();
  });
  //close button close gallery and last image
  //event listener for close button clicked
  $("#close").click(function(){
    //fade out gallery
    $("#gallery").fadeOut(300);
    //hide image
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

        // get image width
        width = $(img).width();
        //get image height
        height = $(img).height();
        //log to check working
        console.log(width);

        // string to center image using width var
        var left = "calc(50vw - "+parseInt(width/2)+"px)";
        // string to centre image using height var
        var top = "calc(50vh - "+parseInt(height/2)+"px)";
        $(img).css("left" , left);
        //if smaller screen then positions vertical centre
        windowWidth = window.innerWidth
        if (windowWidth < 1055){
          //set css top at concatenated string and var "top"
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
    //log to check correct image is being loded from clicked image
    // console.log(imgNo);
    //empties div and then writes in an img element using the imgNo
    $(".customFront").empty().html("<img src='Assets/allTheDarkSides/darkSide"+imgNo+".jpg'> ");
    //Save to local storage
    localStorage.setItem("frontCover", imgNo);
  });
  //sets back cover
  $(".customMenu.back img").click(function(){
    //stores the id attribute of clicked img
    var imgNo = $(this).attr("id");
    //empties the div for .customback and writes in concatenated string which will be an img tag
    $(".customBack").empty().html("<img src='Assets/allTheDarkSides/darkSide"+imgNo+".jpg'> ");
    //save to local storage
    localStorage.setItem("backCover", imgNo);
  });
  var diskNo;
  //event listener for clicking on an image in the custom menu for disks
  $(".customMenu.disk img").click(function(){
    diskNo = $(this).attr("id");
    //empties the div for .customSide.disk and writes in concatenated string which will be an img tag
    $(".customSide.disk").empty().html("<img src='Assets/allTheDarkSides/darkSide"+diskNo+".jpg'> ");
    //save to local storage with namen "diskImg"
    localStorage.setItem("diskImg", diskNo);
    //unchecks colour disk box
    $("#isColour").prop("checked", false);
    //sets local storage for checking if it's a colour disk
    isColour = false;
    localStorage.setItem("isColour", isColour);
  });
  //stores if sticker checkbox is ticked
  var sticker = true;
  //event listener for checking / unchecking the sticker input
  $("#sticker").click(function(){
    //if box is CHECKED
    if($(this).prop("checked") == true){
      //empty div and write in img for the sticker graphic tag
      $(".ringsDiv").empty().html("<img src='Assets/darkCentre.png' class='vinylRings  disk'> ");
      //store that there is a sticker on the image
      sticker = true;
    }
    //if box is unchecked
    else{
      //empty div and write in img tag for graphic with no sticker
      $(".ringsDiv").empty().html("<img src='Assets/vinylRings.png' class='vinylRings disk'> ");
      //store there is no sticker
      sticker = false;
    };
    //store sticker or not to local storage
    localStorage.setItem("sticker", sticker);
    //make .customBox .disk visible
    $(".customBox .disk").css("display", "block");
  });
  //colour disk
  var isColour = true;
  //var to hold the value of the colour input
  var colour = $("#colourPicker").val();
  //var to hold the value of the range input for opacity
  var opacity = $("#opacityPicker").val() / 100;
  //when colour disk checkbox ticked
  $("#isColour").click(function(){
    //check if box is checked
    if($(this).prop("checked") == true){
      //removes image from disk
      $(".customSide.disk").empty();
      //stores that it is a colour disk
      isColour = true;
      //log the selected colour to console just for checking
      // console.log($("#colourPicker").val());
      //sets css background-color and opacity of disk to colour picker value and range value
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
        //if no local storage
        $(".customSide.disk").empty().html("<img src='Assets/allTheDarkSides/darkSide"+diskNo+".jpg'> ");
      };
      //record that it is no longer a colour disk
      isColour = false;
    };
    //store that it isnt a colour disk for reload
    localStorage.setItem("isColour" , isColour);
  });

  //opacity change
  $("#opacityPicker").change(function(){
    //console.log("opacity changed");
    //reads value from slider and then / by 100 to make it a valid css opacity value
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
      //load from local localStorage
    if (localStorage.getItem("frontCover") != null) {
      imgNo = localStorage.getItem("frontCover");
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
    }
    if (localStorage.getItem("opacity") != null) {
      opacity = localStorage.getItem("opacity");
      $(".customSide.disk").css("opacity" , opacity);
    };
    //checks local storage to see if there should be a sticker on the disk
    if (localStorage.getItem("sticker") == "true") {
      //empty div and load sticker img
      $(".ringsDiv").empty().html("<img src='Assets/darkCentre.png' class='vinylRings  disk'> ");
      // checks sticker box if sticker is loaded
      $("#sticker").prop("checked", true);
    }
    //load tracker width
    trackerWidth(1);

  //function to change the size of the tracker bar in customiser topbar
  //function takes a parameter to set the width depending on the clicked div
  function trackerWidth(step){
    //set width to a multiple of the width of one of the divs of the topbar
    var width = $(".step1").outerWidth() * step;
    // log width
    // console.log(width.toString());
    // change width of .tracker element
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
    //checks to see if the disk is currently loaded
    if(disk == true) {
      //loads in the album rather than the disk
      $(".customAlbum").delay(300).fadeIn(300);
    };
    //record that album is showing, not disk
    disk = false;
  });
  //change to back
  $(".step2").click(function(){
    //turn album right way around
    $(".customFront").css("transform", "rotateY(-180deg)");
    $(".customBack").css("transform", "rotateY(0deg)");
    //fade out step 3
    $(".customMenu.front, .disk").fadeOut(300);
    $(".customMenu.back").delay(300).fadeIn(300);
    //set trakcer width
    trackerWidth(2);
    //fade album in if disk shown
    if(disk == true) {
      $(".customAlbum").delay(300).fadeIn(300);
    }
   disk = false;
 });
 //change to DISK
 $(".step3").click(function(){
   //set tracker width
   trackerWidth(3);
   $(".customMenu.front, .customMenu.back").fadeOut(300);
   $(".customAlbum").fadeOut(300);
   $(".disk").delay(300).fadeIn(300);
   disk = true;
 });

});
