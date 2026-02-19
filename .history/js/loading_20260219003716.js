const loadingScreen = document.getElementById("loading-screen");
const loadingBar = document.getElementById("loading-bar");

//Create function for loading
function startLoading() {
  loadingScreen.style.display = "flex";
  loadingBar.style.width = "0%";

  let progress = 0;

  const interval = setInterval(() => {
    progress += 10;
    loadingBar.style.width = progress + "%";

    if (progress >= 90) {
      clearInterval(interval);
    }
  }, 200);
}
