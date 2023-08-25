const displayProducts = document.querySelector('.products');
const allBtn = document.querySelectorAll('.btn');


window.addEventListener('DOMContentLoaded', ()=>{
    allProductDisplay(allDataProduct)    
})

allBtn.forEach((btns)=>{
    btns.addEventListener('click', (e)=>{
        const btnCategory = e.currentTarget.dataset.id;
        console.log(typeof btnCategory);
        const filterAllDataProduct = allDataProduct.filter((allProduct)=>{
            if(allProduct.category === btnCategory){
                return allProduct;
            }

        })
        if(btnCategory === 'all'){
            allProductDisplay(allDataProduct)
        }else{
            allProductDisplay(filterAllDataProduct)
        }
    })
})

function allProductDisplay(renderItems){
    let renderProduct = renderItems.map((items)=>{
        return`
        <ul class="product">
            <li>
                <a href=""><img class="product-image" src="${items.image}" alt="${items.category}"></a>
                <h4 class="product-name">${items.name}</h4>
                <h4 class="product-brand">${items.brand}</h4>
                <h4 class="product-price"><span>$</span>${items.price}</h4>
            </li>
        </ul>
        `

    })
    renderProduct = renderProduct.join("");
    displayProducts.innerHTML = renderProduct;
}






