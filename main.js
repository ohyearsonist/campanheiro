let fileInput = document.getElementById("sheetUpload");
let baseFileButton = document.getElementById("baseFile");

baseFileButton.onclick = () => {
    var link = document.createElement("a");
    link.download = "nome do seu personagem.json";
    link.href = "./baseSheet.json";
    link.click();
}

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
