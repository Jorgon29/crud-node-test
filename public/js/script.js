var count;
const form = document.querySelector("form");


async function fetchWaifu() {
  console.log("fetching");
  var baseUrl = "https://api.waifu.im/search";
  const parameter = document
    .querySelector(".search-input")
    .value.toLowerCase()
    .split(" ")[0];

   console.log(parameter);
    
  try {
    let params = {
      included_tags: parameter,
    };
    let queryParams = new URLSearchParams();
    for (const key in params) {
      if (Array.isArray(params[key])) {
        params[key].forEach((value) => {
          queryParams.append(key, value);
        });
      } else {
        queryParams.set(key, params[key]);
      }
    }
    let response = await fetch(`${baseUrl}?${queryParams.toString()}`);
    let result = await response.json();

    let list = document.querySelector(".waifu-list");
    let item = document.createElement("li");
    item.id = count;
    let img = document.createElement("img");
    let close = document.createElement("button");
    let buttons = document.createElement("div");
    let edit = document.createElement("button");
    buttons.classList.add("item-buttons");
    close.innerHTML = '<i class="fa-2xl fa-solid fa-circle-xmark"></i>';
    edit.innerHTML = '<i class="fa-2xl fa-solid fa-pencil"></i>';
    img.src = result["images"][0]["url"];
    item.classList.add("list-item");
    close.classList.add("image-button");
    edit.classList.add("image-button");
    close.addEventListener("click", () => removeItem(item));
    edit.addEventListener("click", () => activateUpdate(img));
    item.appendChild(img);
    buttons.appendChild(edit);
    buttons.appendChild(close);
    item.appendChild(buttons);
    list.appendChild(item);

    count += 1;
  } catch (error) {
    alert("An error ocurred while retrieving the image: " + error);
  }
}

function removeItem(item) {
  let list = document.querySelector(".waifu-list");
  list.removeChild(item);
}

async function updateImage(image) {
  let input = document.querySelector(".search-input");
  let buttonUpd = document.querySelector(".search-button");
  var baseUrl = "https://api.waifu.im/search";
  const parameter = document.querySelector(".search-input").value.toLowerCase();
  try {
    let params = {
      included_tags: parameter,
    };
    let queryParams = new URLSearchParams();
    for (const key in params) {
      if (Array.isArray(params[key])) {
        params[key].forEach((value) => {
          queryParams.append(key, value);
        });
      } else {
        queryParams.set(key, params[key]);
      }
    }
    let response = await fetch(`${baseUrl}?${queryParams.toString()}`);
    let result = await response.json();
    image.src = result["images"][0]["url"];
  } catch (error) {
    alert("Couldnt update image");
  } finally {
    buttonUpd.replaceWith(buttonUpd.cloneNode(true));
    buttonUpd = document.querySelector(".search-button");
    buttonUpd.innerText = "Look it up!!";
    buttonUpd.addEventListener("click", () => fetchWaifu());
  }
}

function activateUpdate(image) {
  let buttonUpd = document.querySelector(".search-button");
  buttonUpd.replaceWith(buttonUpd.cloneNode(true));
  buttonUpd = document.querySelector(".search-button");
  console.log("After cloning inside activate update");
  buttonUpd.innerText = "UPDATE!!";
  buttonUpd.addEventListener("click", () => updateImage(image));
}

function init() {
  var count = 1;
  document
    .querySelector(".search-button")
    .addEventListener("click", (event) => {
      event.preventDefault();
      fetchWaifu();
      form.submit();
    });
}

init();
