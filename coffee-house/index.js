
// Handlers
////////////////////////////////////////////////

let menu_open_button = document.querySelectorAll(".menu_open_button")
let full_menu_display = document.querySelector(".full_menu")
let section_intro = document.querySelector(".Enjoy")
let section_coffee = document.querySelector(".choose_coffee")
let section_pics = document.querySelector(".pictures")
let section_app = document.querySelector(".application")
let menu_right_top_line = document.querySelector(".menu_button .line")
let coffe_tea_dess_buttons = document.querySelectorAll(".full_menu_button")

let menu_cards_coffee = document.querySelector(".menu_cards_coffee")
let menu_cards_tea = document.querySelector(".menu_cards_tea")
let menu_cards_dessert = document.querySelector(".menu_cards_dessert")
let menu_cards_all = document.querySelectorAll(".menu_cards_wrapper")
let slider = document.querySelector(".slider")
let nav_link = document.querySelectorAll(".adaptive_menu li")
let burger_open_all = document.querySelectorAll(".header_open_menu_adaptive")
let burger_close = document.querySelector(".burger_close")
let adaptive_menu = document.querySelector(".adaptive_menu")

let coffee_progress = document.querySelector(".coffee_progress_bar")
let coffee_lines_all = document.querySelectorAll(".menu_choose label")

let slider_for_swipes = document.querySelector('.slider_wrapper')
// let more_items_button = document.querySelector(".more_items")s

let more_items_coffee = document.querySelector('.menu_cards_coffee .more_items')
let more_items_dessert = document.querySelector('.menu_cards_dessert .more_items')

let items_coffee = document.querySelectorAll('.menu_cards_coffee  .item_menu')
let items_dessert = document.querySelectorAll('.menu_cards_dessert  .item_menu')

let all_items_menu = document.querySelectorAll('.item_menu')

let modal_buy_item_window = document.querySelector('.buy_item')
let h2_modal_buy_item = document.querySelector('.buy_item_h2')
let description_modal_buy_item = document.querySelector('.buy_description')
let img_modal_buy_item = document.querySelector('.buy_item_img img')
let price_modal_buy_item = document.querySelector('.total_price')

let close_modal_btn = document.querySelector('.buy_item_text .close')
let size_modal_btn = document.querySelectorAll('.size_button')
let addictives_btn = document.querySelectorAll('.addictive_button')

////////////////////////////////////////////////
// Default values
////////////////////////////////////////////////

// let menu_open_flag = false
let countMargin = 0
let flag_opened = false

////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////


  burger_open_all.forEach((elem) => {
  elem.onclick = () => {
    if (flag_opened === false) {
      open_menu()
}  else {
  close_menu()
} 
}})

function open_menu() {
  adaptive_menu.classList.add("adaptive_menu_active")
  header.classList.add("header_adaptive_changes")
  header_open_menu_adaptive.classList.add("closed")
  // burger_close.style.display = 'flex'c
  upper_icon.style.transform = "rotate(45deg)";
  lower_icon.style.transform = "rotate(-45deg)";
  flag_opened = true
}

function close_menu() {
  adaptive_menu.classList.remove("adaptive_menu_active")
  header.classList.remove("header_adaptive_changes")
  header_open_menu_adaptive.classList.remove("closed")
  // header_open_menu_adaptive.style.display = 'flex'
  // burger_close.style.display = 'none'
  upper_icon.style.transform = "rotate(0deg)";
  lower_icon.style.transform = "rotate(0deg)";
  flag_opened = false
}


nav_link.forEach((elem) => {
  console.log(elem)

  elem.onclick = () => {
    console.log('click')
    close_menu()
}
})



//////////
// Carousel
////////////////////////////////////////////////

if (typeof coffee != "undefined") {

function check_buttons() {
    for (let i = 1; i <=3; i++) {
      let p = document.querySelector(`#r${i}`)
      clear_buttons_progress(i)
      if (p.checked === true) {
        currentSlideId = i
      }
    }
  }

function clear_buttons_progress(i) {
  let progress = document.querySelector(`label.r${i} span`)
  progress.classList.remove('coffee_progress_bar')
  progress.style.background = "#C1B6AD"
  perCentCount = 0

}


    arrow_left.onclick = () => {
      check_buttons()
      if (currentSlideId > 1) {
        let p = document.querySelector(`#r${currentSlideId-1}`)
        let progress = document.querySelector(`label.r${currentSlideId-1} span`)
        p.checked = true
        addEventListens(`r${currentSlideId-1}`)
        progress.classList.add('coffee_progress_bar')
        clearInterval(interval)
        progressBar() 
      }  else {
        r3.checked = true
        let progress = document.querySelector(`label.r3 span`)
        progress.classList.add('coffee_progress_bar')
        addEventListens(`r3`)
        clearInterval(interval)
        progressBar() 
      }
    }
 
  arrow_right.onclick = () => {
    check_buttons()
    if (currentSlideId < 3) {
      let p = document.querySelector(`#r${currentSlideId+1}`)
      let progress = document.querySelector(`label.r${currentSlideId+1} span`)
      p.checked = true
      progress.classList.add('coffee_progress_bar')
      addEventListens(`r${currentSlideId+1}`)
      clearInterval(interval)
      progressBar() 
    } else {
      r1.checked = true
      let progress = document.querySelector(`label.r1 span`)
      progress.classList.add('coffee_progress_bar')
      clearInterval(interval)
      addEventListens(`r1`)
      progressBar() 
    }
  
  }


function carousel() { 
  if (r3.checked === true) {
    r1.checked = true
    check_buttons()
    perCentCount = 0
    let progress = document.querySelector(`label.r1 span`)
    progress.classList.add('coffee_progress_bar')
    addEventListens(`r1`)
  } else arrow_right.click() 
}

let interval
let perCentCount = 0

function progressBar() {
  const divider = 20
  clearInterval(interval)

  interval = setInterval(() => {

let coffee_progress = document.querySelector(".coffee_progress_bar")
    perCentCount += 17/divider
    coffee_progress.style.background = `linear-gradient(to right, #665F55 ${perCentCount}%, #C1B6AD ${perCentCount}%)`
    // console.log(perCentCount)
    if (perCentCount >= 100) {
      perCentCount = 0
      carousel()
      // clearInterval(interval)
    }
}, 1000/divider)
}



// console.log(coffee_lines_all)

for (let i = 0; i < coffee_lines_all.length; i++) {
  coffee_lines_all[i].addEventListener("click",() => {

        addEventListens(`r${i+1}`)
        clearInterval(interval)
        console.log(interval)
        check_buttons()
        perCentCount = 0
        // console.log(coffee_lines_all[i].querySelector(`span`))
        let progress = coffee_lines_all[i].querySelector(`span`)
        progress.classList.add('coffee_progress_bar')
        progressBar() 
        } ,false)
}

addEventListens(`r1`)

function addEventListens(r) {

let sss = document.querySelector(`.menu_choose .${r}`)
console.log(sss)
refreshRemoveEventListens()
sss.addEventListener("mouseover",clear, false)
sss.addEventListener("mouseout", progressBar, false)

}

function clear() {
  clearInterval(interval)
}

function refreshRemoveEventListens() {
  coffee_lines_all.forEach(elem => {
    console.log(elem)
    elem.removeEventListener("mouseover", clear, false)
    elem.removeEventListener("mouseout",progressBar, false)
  })
}


slider_for_swipes.addEventListener('touchstart', function (event) {
  touchStartX = event.changedTouches[0].screenX;
}, false);

slider_for_swipes.addEventListener('touchend', function (event) {
  touchEndX = event.changedTouches[0].screenX;
  handle();
}, false);


function handle() {
  if (touchEndX < touchStartX) {
      console.log('Swiped Left');
      arrow_right.click() 
     
  }

  if (touchEndX > touchStartX) {
      console.log('Swiped Right');
      arrow_left.click() 
  }

}
progressBar()
}
//////////
// Carousel END
////////////////////////////////////////////////




//////////
// MENU OPEN
////////////////////////////////////////////////
// menu_open_button.onclick = 
coffe_tea_dess_buttons.forEach((button) => {

  button.onclick = () => {
          // console.log(coffe_tea_dess_buttons)
      coffe_tea_dess_buttons.forEach((elem) => {
              elem.classList.remove("active")
              menu_cards_coffee.style.display = "none"
              menu_cards_tea.style.display = "none"
              menu_cards_dessert.style.display = "none"
          })
          
      if (!button.classList.contains("active")) {
          button.classList.add("active")

          if(button.classList.contains("coffee")) {
              menu_cards_coffee.style.display = "flex"
          } else if(button.classList.contains("tea")) {
              menu_cards_tea.style.display = "flex"
          } else if (button.classList.contains("dessert")) {
              menu_cards_dessert.style.display = "flex"
          }
      } 
  }
}) 


//////////
// Load more Items 
////////////////////////////////////////////////

if (typeof more_items_id != "undefined") {

more_items_coffee.onclick = () => {
  items_coffee.forEach(elem => elem.style.display = "flex")
  more_items_coffee.style.display = 'none'
}

more_items_dessert.onclick = () => {
  items_dessert.forEach(elem => elem.style.display = "flex")
  more_items_dessert.style.display = 'none'
}
}

//////////
// Modal menu
////////////////////////////////////////////////


// main number
let price
let price_main
let price_adj = 0
let price_final = 0


all_items_menu.forEach(elem => {
  elem.onclick = () => {
    modal_buy_item_window.style.display = 'block'
    backdrop.style.display = 'block'

    let h2_buy_item = elem.querySelector('.title')
    let description_item = elem.querySelector('.descrption')
    let price_buy_item = elem.querySelector('.price')
    let img_buy_item = elem.querySelector('img')
// console.log(h2_buy_item)
// console.log(img_buy_item.src)

    h2_modal_buy_item.innerHTML = h2_buy_item.textContent
    description_modal_buy_item.innerHTML = description_item.textContent
    price_modal_buy_item.innerHTML = price_buy_item.textContent
    img_modal_buy_item.src = img_buy_item.src
    
    price = +price_modal_buy_item.innerHTML.slice(1)

    document.querySelector('body').style = "overflow-y: hidden"; // hide vertical
  }
})


document.addEventListener('mousedown', function handleClickOutsideBox(event) {
  // const box = document.getElementById('box');
if (backdrop.style.display === 'block') {
  if (!modal_buy_item_window.contains(event.target)) {
    close_modal_window()
  }}
});

close_modal_btn.onclick = () => {
  close_modal_window()
}

function close_modal_window() {
  backdrop.style.display = 'none';
  modal_buy_item_window.style.display = 'none'
  document.querySelector('body').style = "overflow: auto";
}

size_modal_btn.forEach(elem => {
  // price = +price_modal_buy_item.innerHTML.slice(1)

  elem.onclick = () => {
    console.log("price="+price)
    let price_m = price + 0.5
    let price_l = price + 1
  

    let active_btn = document.querySelector('.size_button.active')
    active_btn.classList.remove('active')
    elem.classList.add('active')

    if (elem.classList.contains('size_s') === true) {
      price_main = price
      price_final = price_main + price_adj
      price_modal_buy_item.innerHTML = `\$${(price_final).toFixed(2)}`
      document.querySelector('.size_m.size_button').classList.remove('calclated_summ')
      document.querySelector('.size_l.size_button').classList.remove('calclated_summ')
    }
    if (elem.classList.contains('size_m') === true  && elem.classList.contains('calclated_summ') === false) {
      price_main = price_m
      price_final = price_main + price_adj
      price_modal_buy_item.innerHTML = `\$${(price_final).toFixed(2)}`
      document.querySelector('.size_l.size_button').classList.remove('calclated_summ')
    }
    if (elem.classList.contains('size_l') === true  && elem.classList.contains('calclated_summ') === false) {
      price_main = price_l
      price_final = price_main + price_adj
      price_modal_buy_item.innerHTML = `\$${(price_final).toFixed(2)}`
      document.querySelector('.size_m.size_button').classList.remove('calclated_summ')
     
    }

   
    console.log("price_main="+price_main)
console.log("price_final="+price_final)
    elem.classList.add('calclated_summ')
  }
})

addictives_btn.forEach(elem => {
  elem.onclick = () => {
    let price_copy_temp = +price_modal_buy_item.innerHTML.slice(1)

    if (elem.classList.contains('active') === true) {
      elem.classList.remove('active')
      price_adj-=0.5
      price_modal_buy_item.innerHTML = `\$${(price_copy_temp-=0.5).toFixed(2)}`

    } else {
      elem.classList.add('active') 
      price_adj+=0.5
      price_modal_buy_item.innerHTML = `\$${(price_copy_temp+=0.5).toFixed(2)}`
    }

   console.log(price_adj)
  }
})


