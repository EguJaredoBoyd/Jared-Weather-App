//Target all the buttons necessary
const swipeSection = document.getElementById("swipe-section");
const sheetHandle = document.getElementById("sheet-handle");
const iconHandle = document.getElementById("icon-handle");

//Create a function to handle swipe
function handleSwipe() {
  sheetHandle.addEventListener("click", () => {
    const isOpen = swipeSection.classList.toggle("is-open");

    //Add accessibilty and optimization
    swipeSection.setAttribute("aria-hidden", !isOpen);
  });
}
