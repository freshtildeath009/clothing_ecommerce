const displayProducts = document.querySelector('.products');
const btnAll = document.querySelector('.btn-all');
const btnNike = document.querySelector('.btn-nike');
const btnShein = document.querySelector('.btn-shein');

window.addEventListener('DOMContentLoaded', ()=>{
    allProduct(products)
})

function allProduct(renderItems){
    let renderProduct = renderItems.map((items)=>{
        return`
        <ul class="product">
            <li>
                <a href=""><img class="product-image" src="${items.image}" alt="${items.category}"></a>
                <h4 class="product-name">${items.name}</h4>
                <h4 class="product-brand">${items.brand}</h4>
                <h4 class="product-price">${items.price}</h4>
            </li>
        </ul>
        `
    })
    renderProduct = renderProduct.join("");
    displayProducts.innerHTML = renderProduct;
}



btnShein.addEventListener('click',()=>{
    
    allProduct(filterData('Shein'))
})
btnNike.addEventListener('click',()=>{
    allProduct(filterData('Nike'))
})
btnAll.addEventListener('click',()=>{
    allProduct(products)
})
function filterData(params) {
    // products.forEach((items)=>{
    //     if(items.brand == params ){
    //         console.log(items);
    //     }
    // })
    const product = products.filter((item)=>{
       if(item.brand === params ){
          return item;
         }
    })
    console.log(product);
    return product;
}

// const displayProducts = document.querySelector('.products');

// window.addEventListener('DOMContentLoaded', ()=>{
//     filterProduct(products)
// })

// function filterProduct(renderItems){
//     let renderProduct = renderItems.map((items)=>{
//         return`
//         <ul class="product">
//             <li>
//                 <a href=""><img class="product-image" src="${items.image}" alt="${items.category}"></a>
//                 <h4 class="product-name">${items.name}</h4>
//                 <h4 class="product-brand">${items.brand}</h4>
//                 <h4 class="product-price">${items.price}</h4>
//             </li>
//         </ul>
//         `
//     })
//     renderProduct = renderProduct.join("");
//     displayProducts.innerHTML = renderProduct;
// }


