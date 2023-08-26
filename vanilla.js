const menToggle = document.querySelector('.men');
const menCategory = document.querySelector('.men-category');
const womenToggle = document.querySelector('.women');
const womenCategory = document.querySelector('.women-category');
const kidToggle = document.querySelector('.kids');
const kidCategory = document.querySelector('.kids-category');

menToggle.addEventListener('click',()=>{
    menCategory.classList.toggle('active');
    if(menCategory.classList){
        womenCategory.classList.remove('active');
        kidCategory.classList.remove('active');
    }
})
womenToggle.addEventListener('click',()=>{
    womenCategory.classList.toggle('active');
    if(womenCategory.classList){
        menCategory.classList.remove('active');
        kidCategory.classList.remove('active');
    }
})
kidToggle.addEventListener('click',()=>{
    kidCategory.classList.toggle('active');
    if(kidCategory.classList){
        menCategory.classList.remove('active');
        womenCategory.classList.remove('active');
    }
})


