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

document.addEventListener('DOMContentLoaded', function() {

  // Select all delete buttons
  var deleteButtons = document.querySelectorAll('.Delete');

  // Function to check if there are any products left
  function checkProducts() {
      var productHolder = document.getElementById('Product-holder');
      var products = productHolder.querySelectorAll('.Products');

      // If there are no products left, remove the CheckoutHolder and display text
      if (products.length === 0) {
          var checkoutHolder = document.querySelector('.CheckoutHolder');
          if (checkoutHolder) {
              checkoutHolder.remove();
          }

          // Create a text element
          var Leeg = document.createElement('p');
          Leeg.textContent = "U heeft geen producten in uw winkelwagen";
          Leeg.style.textAlign = "center";

          // Append the text element to the main page
          var mainPage = document.querySelector('.main-page');
          mainPage.appendChild(Leeg);
      }
  }

  // Loop through each delete button
  deleteButtons.forEach(function(button) {
      button.addEventListener('click', function(event) {
          // Get the parent element of the clicked delete button (which is the container div)
          var productContainer = event.target.closest('.Products');
          if (productContainer) {
              productContainer.remove();
              checkProducts();
          }
      });
  });

  // Select all plus, minus, and number elements
  var plusButtons = document.querySelectorAll(".plus");
  var minusButtons = document.querySelectorAll(".minus");
  var numberDisplays = document.querySelectorAll(".number");

  // Loop through each plus button
  plusButtons.forEach(function(plusButton, index) {
      plusButton.addEventListener("click", function() {
          var currentValue = parseInt(numberDisplays[index].textContent);
          numberDisplays[index].textContent = currentValue + 1;
      });
  });

  // Loop through each minus button
  minusButtons.forEach(function(minusButton, index) {
      minusButton.addEventListener("click", function() {
          var currentValue = parseInt(numberDisplays[index].textContent);
          if (currentValue > 1) {
              numberDisplays[index].textContent = currentValue - 1;
          }
      });
  });

  checkProducts();
});

