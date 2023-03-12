const maxLimit = 40;
const url = `https://todon.eu/api/v1/accounts/109041141266410694/statuses?limit=${maxLimit}&exclude_reblogs=true&exclude_replies=true`;
var i = 0;
var flag = true;
let crows = [];
const h2 = document.getElementById("crow-text");
const img = document.getElementById("crow-img");

window.addEventListener("load", loadData);

const btn = document.getElementById("crow-btn");
btn.addEventListener("click", () => {
  if (i === maxLimit - 1) i = -1;
  ++i;
  flag = true;
  checkData(crows);
});

function loadData() {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      crows = res;
      checkData(crows);
    })
    .catch(console.log);
}

function setUI(media, content) {
  let content_info = content.content;
  h2.textContent = content_info.match(/C[a-zA-Z\s()-]*\./g).toString();
  let source = media[0].url;
  img.src = source;
}

function checkData(data) {
  console.log(i);
  while (flag) {
    let media = data[i].media_attachments;
    if (media.length != 0 && media[0].type === "image") {
      setUI(media, data[i]);
      flag = false;
    } else {
      i++;
    }
  }
}
