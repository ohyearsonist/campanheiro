let fileInput = document.getElementById("sheetUpload");
let baseFileButton = document.getElementById("baseFile");

baseFileButton.onclick = () => {
  var link = document.createElement("a");
  link.download = "nome do seu personagem.json";
  link.href = "./baseSheet.json";
  link.click();
};

fileInput.onchange = () => {
  const reader = new FileReader();
  reader.onload = (e) => {
    sheetData = e.target.result;

    var link = document.createElement("a");
    link.href = "./sheet.html?sheetData=" + encodeURI(sheetData);
    link.click();
  };

  for (let file of fileInput.files) {
    reader.readAsText(file);
  }
};
