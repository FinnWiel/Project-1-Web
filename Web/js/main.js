window.addEventListener("load", (event) => {
  //Gets the current year for footer
  let copyright = document.getElementById("year");
  let currentYear = new Date().getFullYear();
  copyright.innerHTML = currentYear;
});

//Toggles mobile nav menu
function toggleMobileNav() {
  let menu = document.getElementById("navigation");
  let bars = document.querySelectorAll(".bar");

  menu.classList.toggle("navFlex");
  console.log("toggle");

  bars.forEach((bar) => bar.classList.toggle("x"));
}

//Bike on footer
document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){

    //Create canvas
    var can = document.getElementById('canvas');
    can.height = 40; can.width = window.innerWidth;
    var ctx = can.getContext('2d');

    var x = 0, y = can.height;
    var speed = 1;

    function draw() {
        //Draw canvas
        can.width = window.innerWidth
        ctx.fillStyle = "#56BDE9";
        ctx.fillRect(0, 0, can.width, can.height);
      
        //Draw bike
        ctx.beginPath();
        ctx.font = '30px FontAwesome';
        ctx.fillStyle = 'white';
        ctx.fillText('\uf206', x, y); //'\uf206' is unicode for the bike 
        ctx.fill();
      
        //Move bike
        x += speed;
        
        if(x >= can.width + 100){
          x = -50;
        }
        requestAnimationFrame(draw);
      } 
    draw();
}

// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get all elements with the class "Delete"
  var deleteButtons = document.querySelectorAll('.Delete');

  // Loop through each delete button
  deleteButtons.forEach(function(button) {
      // Add click event listener to each delete button
      button.addEventListener('click', function(event) {
          // Get the parent element of the clicked delete button (which is the container div)
          var productContainer = event.target.closest('.Products');

          // Check if the parent container exists
          if (productContainer) {
              // Remove the parent container from the DOM
              productContainer.remove();
          }
      });
  });
});
