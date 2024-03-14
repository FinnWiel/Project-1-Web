

window.addEventListener("load", (event) => {
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


function huurFietsen() {
    let checkbox = document.querySelectorAll(".cb");
    let oneChecked = false;
    //Check if any boxes are checked
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked == true) {
            oneChecked = true
        }
    }

    //If atleast one box was checed alert in browser with name and price
    if (oneChecked) {
        for (let i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked == true) {
                let row = checkbox[i].parentElement.parentElement;
                let soortfiets = row.children[0];
                let prijs = row.children[1];
                alert(`${soortfiets.innerHTML} voor ${prijs.innerHTML}`);
                console.log(row)
            }
        }
    } else {
        alert("Er zijn geen fietsen geselecteerd.");
    }
    oneChecked = false;
}

//Bike on footer
document.addEventListener('DOMContentLoaded', domloaded, false);
function domloaded() {
    //Create canvas
    var can = document.getElementById('canvas');
    can.height = 40; can.width = window.innerWidth;
    var ctx = can.getContext('2d');

    var x = 0, y = can.height;
    var speed = 6;

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

        if (x >= can.width + 100) {
            x = -50;
        }
        requestAnimationFrame(draw);
    }
    draw();
}


//Dynamic open/closed message on homepage
function OpenClose() {
    var spanText = document.getElementById("openspan");
    var today = new Date();
    var weekDay = today.getDay();
    var curHour = today.getHours();
    var curMinute = today.getMinutes();

    if (weekDay === 0) { // Day 0 = sunday
        spanText.innerHTML = "Gesloten";
    }
    else if (weekDay === 1) {
        if ((curHour > 12 || (curHour === 12 && curMinute >= 30)) && curHour < 18) {
            spanText.innerHTML = "Open";
        } else {
            spanText.innerHTML = "Gesloten";
        }
    }
    else if (weekDay >= 2 && weekDay <= 4) {
        if ((curHour > 8 || (curHour === 8 && curMinute >= 30)) && curHour < 18) {
            spanText.innerHTML = "Open";
        } else {
            spanText.innerHTML = "Gesloten";
        }
    }
    else if (weekDay === 5) {
        if ((curHour > 8 || (curHour === 8 && curMinute >= 30)) && (curHour < 19 || (curHour === 19 && curMinute < 30))) {
            spanText.innerHTML = "Open";
        } else {
            spanText.innerHTML = "Gesloten";
        }
    }
    else if (weekDay === 6) {
        if (curHour >= 9 && curHour < 17) {
            spanText.innerHTML = "Open";
        } else {
            spanText.innerHTML = "Gesloten";
        }
    }
}
// Run OpenClose when page loads
window.onload = function () {
    OpenClose();

    // Run OpenClose every 30s to update status
    setInterval(OpenClose, 30000);
};
