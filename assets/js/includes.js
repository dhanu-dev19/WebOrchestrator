// Load Header
fetch("includes/header.html")
  .then(res => res.text())
  .then(data => {
    const header = document.getElementById("header-placeholder");
    if (header) header.innerHTML = data;
  })
  .catch(err => console.error("Header load error:", err));

// Load Footer
fetch("includes/footer.html")
  .then(res => res.text())
  .then(data => {
    const footer = document.getElementById("footer-placeholder");
    if (footer) footer.innerHTML = data;

    // Dynamic year (after footer loads)
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  })
  .catch(err => console.error("Footer load error:", err));
