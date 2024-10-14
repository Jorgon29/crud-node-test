var count;
const form = document.querySelector("form");

async function fetchWaifu() {

  console.log("fetching");

  var baseUrl = "https://api.waifu.im/search";

  const parameterElement = document.querySelector(".search-input");
  const parameter = parameterElement.value.trim().toLowerCase().split(" ")[0];

  console.log("Parameter:", parameter);

  if (!parameter) {
    alert("Please enter a valid search term!");
    return;
  }

  let params = {
    included_tags: parameter,
  };
  
  let queryParams = new URLSearchParams(params);

  try {
    let response = await fetch(`${baseUrl}?${queryParams.toString()}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let result = await response.json();

    let list = document.querySelector(".waifu-list");
    let item = document.createElement("li");
    let img = document.createElement("img");
    let buttons = document.createElement("div");
    let close = document.createElement("button");
    let edit = document.createElement("button");

    buttons.classList.add("item-buttons");
    close.innerHTML = '<i class="fa-2xl fa-solid fa-circle-xmark"></i>';
    edit.innerHTML = '<i class="fa-2xl fa-solid fa-pencil"></i>';

    close.classList.add("image-button");
    edit.classList.add("image-button");
    item.classList.add('list-item');

    close.addEventListener("click", () => removeItem(item));
    edit.addEventListener("click", () => activateUpdate(img));

    item.appendChild(img);
    buttons.appendChild(edit);
    buttons.appendChild(close);
    item.appendChild(buttons);
    list.appendChild(item);

    // Adding a slight delay before setting the image URL
    setTimeout(() => {
      img.src = result["images"][0]["url"];
      img.onload = function() {
        console.log("Image fully loaded");
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      };
      console.log("Image URL set to:", img.src);
    }, 100);

  } catch (error) {
    console.error("Fetch error:", error);
    alert("Error: " + error.message + " Here's parameter: " + parameter);
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
    document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const button = document.querySelector('.search-button');
  
    button.addEventListener('click', async (event) => {
      event.preventDefault(); 
      await fetchWaifu();
      form.submit();
    });
  });
}

init();

