// Category Selector 
const menToggle = document.querySelector('.men');
const menCategory = document.querySelector('.men-category');
const womenToggle = document.querySelector('.women');
const womenCategory = document.querySelector('.women-category');
const kidToggle = document.querySelector('.kids');
const kidCategory = document.querySelector('.kids-category');
const removeCategory = document.querySelectorAll('.remove-category');

// End Category Selector

// Display and hide the category 
menToggle.addEventListener('click',(e)=>{
    menCategory.classList.toggle('show-men-category');
    if(menCategory.classList){
        kidCategory.classList.remove('show-kids-category');
        womenCategory.classList.remove('show-women-category');
    }
})
womenToggle.addEventListener('click',()=>{
    womenCategory.classList.toggle('show-women-category');
    if(womenCategory.classList){
        menCategory.classList.remove('show-men-category');
        kidCategory.classList.remove('show-kids-category');
    }
})
kidToggle.addEventListener('click',()=>{
    kidCategory.classList.toggle('show-kids-category');
    if(kidCategory.classList){
        menCategory.classList.remove('show-men-category');
        womenCategory.classList.remove('show-women-category');
    }
})

// Remove all show category
removeCategory.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        menCategory.classList.remove('show-men-category');
        womenCategory.classList.remove('show-women-category');
        kidCategory.classList.remove('show-kids-category');
    })
})
// End display and hide the category 

// Cart Selector
const cartBtn = document.querySelector('.cart-btn');
const cartContainer = document.querySelector('.cart-container');
const block = document.querySelector('.block');

cartBtn.addEventListener('click', ()=>{
    cartContainer.classList.toggle('show-cart');
    block.classList.toggle('blocker');
})

