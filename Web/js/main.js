//Gets the current year for footer
window.addEventListener("load", (event) => {
    let copyright = document.getElementById("year");
    let currentYear = new Date().getFullYear();
    copyright.innerHTML = currentYear;
});

//Toggles mobile nav menu
function toggleMobileNav(){
    let menu = document.getElementById("navigation");
    let bars = document.querySelectorAll('.bar')
    
    menu.classList.toggle("navFlex");
    console.log("toggle");

    bars.forEach(bar => bar.classList.toggle('x'))
}
