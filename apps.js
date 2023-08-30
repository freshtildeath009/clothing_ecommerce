// Variables
const productsDOM = document.querySelector('.products');
const btnCategory = document.querySelectorAll('.btn');
const cartSingleItem = document.querySelector('.cart-single-item');

// cart
let cart = [];
// buttons
let buttonsDOM = [];

// get products
class Products {
    getProducts(){
        allDataProduct.map((product)=>{
            const id = product.id;
            const brand = product.brand;
            const category = product.category;
            const countInStock = product.countInStock;
            const image = product.image;
            const price = product.price;
            const name = product.name;
            return {brand, category, countInStock, image, price, name, id};
        })
        return allDataProduct
    }
}

// display products
class UI{
    displayProduct(products){
        let result = '';
        products.forEach(items => {
            result +=`
            <ul class="product">
                <li>
                    <button class="btn-add-to-cart" data-id="${items.id}">ADD TO CART</button>
                    <a class="image-anchor" href=""><img class="product-image" src="${items.image}" alt="${items.category}"></a>
                    <h4 class="product-name">${items.name}</h4>
                    <h4 class="product-brand">${items.brand}</h4>
                    <h4 class="product-price">$${items.price}</h4>
                </li>
            </ul>
            `
        });
        productsDOM.innerHTML = result;
        
        const btnAddTocart = document.querySelectorAll('.btn-add-to-cart');
        this.getBtnAddToCart(btnAddTocart, products);
        
    }

    filterProducts(products){
    
        btnCategory.forEach((btn)=>{
            btn.addEventListener('click',(event)=>{
                let category = event.currentTarget.dataset.id;
                
                let resultFilter = products.filter((products)=>{
                    if(products.category === category){
                        return products
                    }
                })
                if(category === 'all'){
                    this.displayProduct(products)
                }else{
                    this.displayProduct(resultFilter)
                }

            })
        })
    }

    getBtnAddToCart(buttons, products){
        buttons.forEach((button)=>{
            button.addEventListener('click',(e)=>{
                let id = e.currentTarget.dataset.id;
                
                if(cart.some((item) => item.id === id)){
                    alert("IN CART!");
                }else{
                    e.target.innerText = 'IN CART';
                    e.target.style.background = 'HSL(12, 100%, 50%)';
                    const item = products.find(item => item.id === id);
                    cart.push({...item, quantity: 1});
                    this.updateCart()
                    
                }
            })
            
        })
        
    }

   
    updateCart(){
        this.displayCartItem();
        this.changeQtyItem()
    }

    displayCartItem(){
        const createDiv = document.createElement('div');
        createDiv.classList.add('cart-item-container');
        cart.forEach((item)=>{
            createDiv.innerHTML =`
                <img class="cart-image" src="${item.image}" alt="">
                <div class="cart-item-detail-container">
                    <div class="cart-item-name-price-btn">
                        <h4 class="cart-product-name">${item.name}</h4>
                        <h4 class="brand">${item.brand}</h4>
                        <h4 class="cart-item-price">$${item.price}</h4>
                        <button class="cart-btn-remove-item">remove</button>
                    </div>
                    
                    <div class="cart-item-quantity-container">
                        <button class="increase btnQty" onclick="this.changeQtyItem('increase', ${item.id})">+</button>
                        <h4 class="quantity">${item.quantity}</h4>
                        <button class="decrease btnQty" onclick="this.changeQtyItem('decreaese', ${item.id})">-</button>
                    </div>
                </div>
            `
        cartSingleItem.appendChild(createDiv);
        })
    }

    changeQtyItem(action, id){
        cart = cart.map((item)=>{
            console.log(item);
        })
   
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    const ui = new UI()
    const products = new Products();
    // ui.updateCart();
    ui.displayProduct(products.getProducts());
    ui.filterProducts(products.getProducts());
    ui.changeQtyItem()
})
