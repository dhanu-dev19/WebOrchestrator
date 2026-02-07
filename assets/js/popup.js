
function showSuccessPopup() {
  document.getElementById("successPopup").style.display = "flex";
}

function closeSuccessPopup() {
  document.getElementById("successPopup").style.display = "none";
}

// Close popup when clicking outside
window.addEventListener("click", function (e) {
  const popup = document.getElementById("successPopup");
  if (e.target === popup) {
    closeSuccessPopup();
  }
});


