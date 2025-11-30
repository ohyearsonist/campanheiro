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
  document.getElementsByTagName("body").item(0).style.justifyContent =
    "flex-start";
}

let statsPage = document.getElementById("stats");
let statsLink = document.getElementById("statsLink");
let skillsPage = document.getElementById("skills");
let skillsLink = document.getElementById("skillsLink");
let inventoryPage = document.getElementById("inventory");
let inventoryLink = document.getElementById("inventoryLink");
let campaignPage = document.getElementById("campaign");
let campaignLink = document.getElementById("campaignLink");

campaignPage.style.display = "none";
skillsPage.style.display = "none";
inventoryPage.style.display = "none";
statsLink.style.fontWeight = "bold";

statsLink.addEventListener("click", () => {
  statsPage.style.display = "flex";
  campaignPage.style.display = "none";
  skillsPage.style.display = "none";
  inventoryPage.style.display = "none";
  statsLink.style.fontWeight = "bold";
  campaignLink.style.fontWeight = "normal";
  inventoryLink.style.fontWeight = "normal";
  skillsLink.style.fontWeight = "normal";
});
skillsLink.addEventListener("click", () => {
  skillsPage.style.display = "flex";
  campaignPage.style.display = "none";
  statsPage.style.display = "none";
  inventoryPage.style.display = "none";
  skillsLink.style.fontWeight = "bold";
  statsLink.style.fontWeight = "normal";
  inventoryLink.style.fontWeight = "normal";
  campaignLink.style.fontWeight = "normal";
});
inventoryLink.addEventListener("click", () => {
  inventoryPage.style.display = "flex";
  campaignPage.style.display = "none";
  skillsPage.style.display = "none";
  statsPage.style.display = "none";
  inventoryLink.style.fontWeight = "bold";
  statsLink.style.fontWeight = "normal";
  campaignLink.style.fontWeight = "normal";
  skillsLink.style.fontWeight = "normal";
});
campaignLink.addEventListener("click", () => {
  campaignPage.style.display = "flex";
  statsPage.style.display = "none";
  skillsPage.style.display = "none";
  inventoryPage.style.display = "none";
  campaignLink.style.fontWeight = "bold";
  statsLink.style.fontWeight = "normal";
  inventoryLink.style.fontWeight = "normal";
  skillsLink.style.fontWeight = "normal";
});

let allTextInputs = document.querySelectorAll('input[type="text"]');
allTextInputs.forEach((i) => {
  i.addEventListener("input", resizeInput);
  i.addEventListener("input", () => {
    if (!alteredElements.includes(i)) {
      alteredElements.push(i);
    }
  });
});

let destinyDiv = document.getElementById("destiny");
for (let i = 0; i < destinyDiv.children.length; i++) {
  const e = destinyDiv.children[i];
  e.addEventListener("click", () => {
    if (e.children[0].children[0].style.fill !== "black") {
      e.children[0].children[0].style.fill = "black"
    } else {
      e.children[0].children[0].style.fill = "none"
    }

  })
}

function resizeInput() {
  this.style.width = this.value.length + "ch";
}

function changeImage() {
  let a = document.createElement("input");
  a.type = "file";
  a.accept = "image/*";
  a.onchange = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      sheetData.character.picture = e.target.result;
      loadCharPicture();
    };
    for (const file of a.files) {
      reader.readAsDataURL(file);
    }
  };
  a.click();
}

baseFileButton.onclick = () => {
  var link = document.createElement("a");
  link.download = "nome do seu personagem.json";
  link.href = "./assets/baseSheet.json";
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
  } catch (e) {}
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

  setField("statSTR", char.stats.STR);
  setField("statINS", char.stats.INS);
  setField("statINT", char.stats.INT);
  setField("statCHA", char.stats.CHA);
  setField("statAGI", char.stats.AGI);

  setField("statLifeDMN", char.stats.lifeDMN);
  setField("statLifeDMX", char.stats.lifeDMX);
  setField("statSanityDMN", char.stats.sanityDMN);
  setField("statSanityDMX", char.stats.sanityDMX);

  setField("statLuckDie", char.stats.luckDie);
  setField("statSpeed", char.stats.speed);
  setField("statArmor", char.stats.armor);
  setField("statInspiration", char.stats.inspiration);

  for (let i = 0; i < char.stats.destiny; i++) {
    destinyDiv.children[i].click();
  }

  allAbilities = document.querySelectorAll("input[type='checkbox']");

  allAbilities.forEach((i) => {
    let property = (i.id + " ").slice(4, -1).toLowerCase();
    if (sheetData.character.stats.abilities[property]) {
      i.checked = true;
    }
  });

  Object.keys(sheetData.character.talents).forEach((e) => {
    let t = document.createElement("div");

    let title = document.createElement("input");
    title.type = "text";
    title.value = sheetData.character.talents[e].title;
    title.style = "font-weight: bold;";
    t.appendChild(title);

    let desc = document.createElement("textarea");
    desc.value = sheetData.character.talents[e].desc;
    t.appendChild(desc);

    document.getElementById("talents").appendChild(t);
  });

  allTextInputs.forEach((i) => {
    resizeInput.call(i);
  });
}

let saveButton = document.getElementById("saveSheet");
let sendButton = document.getElementById("sendToGM");

saveButton.addEventListener("click", saveSheet);
sendButton.addEventListener("click", sendSheet);

function sendSheet() {
  updateSheet();
  let link = document.createElement("a");
  link.href =
    "mailto:" +
    (sheetData.campaign.GMsEmail +
      "?subject=" +
      sheetData.campaign.name +
      "%2C%20" +
      sheetData.character.name +
      "%20-%20Ficha%20atualizada&body=Ol%C3%A1%20" +
      sheetData.campaign.GM +
      "!%0A%0AEu%20atualizei%20minha%20ficha%20de%20" +
      sheetData.campaign.name +
      "%2C%20e%20aqui%20est%C3%A1%20ela%20em%20formato%20.json.%20Boa%20mestreagem!%0A%0A---%0A%0AN%C3%83O%20MEXER%20A%20PARTIR%20DESSE%20PONTO!%0A%0A" +
      JSON.stringify(sheetData).replace(/\n/g, "").replace(/:/g, "%3A"));
  console.log(link.href);
  link.click();
}

function download(data, filename, type) {
  var file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

function updateSheet() {
  for (const i in alteredElements) {
    let property = (alteredElements[i].id + " ").slice(4, -1).toLowerCase();
    if (alteredElements[i].id.slice(0, 4) == "char") {
      sheetData["character"][property] = alteredElements[i].value;
    } else if (alteredElements[i].id.slice(0, 4) == "stat") {
      sheetData["character"]["stats"][property] = alteredElements[i].value;
    }
  }

  allAbilities = document.querySelectorAll("input[type='checkbox']");
  allAbilities.forEach((i) => {
    let property = (i.id + " ").slice(4, -1).toLowerCase();
    if (i.checked) {
      sheetData.character.stats.abilities[property] = true;
    } else {
      sheetData.character.stats.abilities[property] = false;
    }
  });

  dCounter = 0;
  for (let i = 0; i < destinyDiv.children.length; i++) {
    if (destinyDiv.children[i].children[0].children[0].style.fill == "black") {
      dCounter++;
    }
  }
  sheetData.character.stats.destiny = dCounter;
}

function saveSheet() {
  updateSheet();

  download(
    JSON.stringify(sheetData),
    sheetData.character.name + ".json",
    "text"
  );
}
