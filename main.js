let fileInput = document.getElementById("sheetUpload");

function loadSheet(sheetFile) {
   sheetData = JSON.parse(sheetFile);

   console.log(sheetData);
}

fileInput.onchange = () => {
  const reader = new FileReader();
  reader.onload = (e) => loadSheet(e.target.result);

  for (let file of fileInput.files) {
    reader.readAsText(file);
  }
};
