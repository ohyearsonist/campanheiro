let fileInput = document.getElementById("sheetUpload");
let baseFileButton = document.getElementById("baseFile");
let main = document.getElementsByTagName("main").item(0);
let intro = document.getElementById("intro");
let alteredElements = [];
let sheetData;

main.style.display = "none";

function hideIntro() {
  intro.style.display = "none";
  main.style.display = "flex";
}

let allTextInputs = document.querySelectorAll('input[type="text"]');
allTextInputs.forEach((i) => {
  i.addEventListener("input", resizeInput);
  i.addEventListener("input", () => {
    if (!alteredElements.includes(i)) {
      alteredElements.push(i);
    }
  });
});

function resizeInput() {
  this.style.width = this.value.length + "ch";
}

function changeImage() {
    let a = document.createElement("input");
    a.type = "file"
    a.accept = "image/*"
    a.onchange = () => {
        const reader = new FileReader();
        reader.onload = (e) => {
            sheetData.character.picture = e.target.result;
            loadCharPicture();
        }
        for (const file of a.files) {
            reader.readAsDataURL(file);
        }
    }
    a.click()
}

baseFileButton.onclick = () => {
  var link = document.createElement("a");
  link.download = "nome do seu personagem.json";
  link.href = "./baseSheet.json";
  link.click();
};

fileInput.onchange = () => {
  const reader = new FileReader();
  reader.onload = (e) => {
    sheetData = JSON.parse(e.target.result);

    hideIntro();
    loadSheet();
  };

  for (let file of fileInput.files) {
    reader.readAsText(file);
  }
};

function setField(field, value) {
  document.getElementById(field).value = value;
}

function loadCharPicture() {
    try {
        document.getElementById("charPicture").remove();
    } catch (e) {
        
    }
  let parent = document.getElementById("charInfo");
  let pic = document.createElement("img");
  pic.id = "charPicture";
  pic.src = sheetData.character.picture;
  pic.onclick = changeImage;
  parent.appendChild(pic);
}

function loadSheet() {
  let char = sheetData.character;
  setField("charName", char.name);
  setField("charClass", char.class);
  setField("charLevel", char.level);
  setField("charSpecies", char.species);
  loadCharPicture();

  allTextInputs.forEach((i) => {
    resizeInput.call(i);
  });
}

let saveButton = document.getElementById("saveSheet");
let sendButton = document.getElementById("sendToGM");

saveButton.addEventListener("click", saveSheet);

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function saveSheet() {
  for (const i in alteredElements) {
    let property = (alteredElements[i].id + " ").slice(4, -1).toLowerCase();
    if (alteredElements[i].id.slice(0, 4) == "char") {
      sheetData["character"][property] = alteredElements[i].value;
    }
  }

  download(JSON.stringify(sheetData), sheetData.character.name+".json", "text")
}
