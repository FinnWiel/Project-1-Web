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
