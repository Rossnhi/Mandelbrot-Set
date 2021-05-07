let popToggle = false;
function popUp() {
  let menu = document.getElementById("menu");
  let line1 = document.getElementById("menuItem1");
  let line2 = document.getElementById("menuItem2");
  let line3 = document.getElementById("menuItem3");
  let line4 = document.getElementById("menuItem4");
  if (popToggle){
    line1.style.opacity="1";
    line4.style.opacity="1";
    line2.style.transform="translateY(0px) rotate(0deg)";
    line3.style.transform="translateY(0px) rotate(0deg)";
    menu.style.height="0px";
  }
  else{
    line1.style.opacity="0";
    line4.style.opacity="0";
    line2.style.transform="rotate(45deg) translateY(5px)";
    line3.style.transform="rotate(-45deg) translateY(-5px)";
    menu.style.height="650px";
  }
  popToggle = !popToggle
}