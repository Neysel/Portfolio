const client_id = 'SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo'
const clientid1 = 'Pxz_KcGxu7rkM7gi5K4AEXN8UAOBUYzfd98HSJysmpA'
let searchRes
let state = []
search.focus()

let url = `https://api.unsplash.com/photos/random?client_id=${clientid1}&count=16` 

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(searchRes)
    console.log(data);
if(res.ok && data.length) {
  state = data
  setPhotos()
  console.log(url)
}
  }
  getData();


const renderItem = () => {
 return state.map(({ urls: {regular}}) => {
    return `<div class="img" style="background-image: url(${regular})"></div>`
  }).join("")
}


const setPhotos = () => {
  images.innerHTML = renderItem()
}


document.forms.searchPic.onsubmit = function() {
  searchRes = searchPic.search.value;
  // console.log(searchRes)
  url = `https://api.unsplash.com/photos/random?client_id=${clientid1}&count=16&query=${searchRes}`
  search.value = searchRes
  getData()
  return false;
};

search.addEventListener('input', () => {
  // console.log(search.value)
  if (search.value.length > 0) {
    cancel.style.display = 'block'
  } else if (search.value === '') {
    cancel.style.display = 'none'
  }
})

cancel.onclick = () => {
  search.value = ''
  cancel.style.display = 'none'
}

// const img = document.createElement('img');
// img.classList.add('gallery-img')
// img.src = `полученный от API адрес изображения`;
// img.alt = `image`;
// images.append(img);

  // data.urls.regular;

  // showData(data)



  

