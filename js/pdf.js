const PDF_SRC = "/docs/ebook.pdf"; 

const openBtn = document.getElementById("openBook");
const closeBtn = document.getElementById("closeReader");
const reader = document.getElementById("reader");
const frame = document.getElementById("readerFrame");

function openReader() {
  frame.src = PDF_SRC; 
  reader.hidden = false;
  document.body.style.overflow = "hidden";
  closeBtn.focus();
}
function closeReader() {
  reader.hidden = true;
  frame.src = ""; 
  document.body.style.overflow = "";
  openBtn.focus();
}

openBtn.addEventListener("click", openReader);
closeBtn.addEventListener("click", closeReader);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !reader.hidden) closeReader();
});