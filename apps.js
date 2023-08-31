// Variables
const productsDOM = document.querySelector('.products');
const btnCategory = document.querySelectorAll('.btn');
const cartItemQuantity = document.querySelector('.item-quantity');
const cartTotal = document.querySelector('.cart-total');
const cartSingleItemContainerDOM = document.querySelector('.cart-single-item');
const clearCartBtn = document.querySelector('.clear-cart-btn');

// Cart array 
let cart = [];
// Buttons
let buttonsDOM = [];

// Get products
class Products{
    getProducts(){
        allDataProduct.map((product)=>{
            const id = product.id;
            const brand = product.brand;
            const countInStock = product.countInStock;
            const image = product.image;
            const price = product.price;
            const category = product.category;
            const name = product.name;
        return {id , brand, countInStock, image, price, category, name};
        })
    return allDataProduct
    }
}

// Display products
class UI{
    displayProducts(products){
        let result = '';
        products.forEach((products)=> {
            result +=`
            <ul class="product">
                <li>
                    <button class="btn-add-to-cart" data-id="${products.id}">ADD TO CART</button>
                    <a class="image-anchor" href=""><img class="product-image" src="${products.image}" alt=""></a>
                    <h4 class="product-name">${products.name}</h4>
                    <h4 class="product-brand">${products.brand}</h4>
                    <h4 class="product-price">${products.price}</h4>
                </li>
            </ul>
            `
        })
        productsDOM.innerHTML = result;
        const btnAddToCart = [...document.querySelectorAll('.btn-add-to-cart')];
        this.getBtnAddToCart(btnAddToCart);

    }

    filterProducts(products){
        btnCategory.forEach((buttons)=>{
            buttons.addEventListener('click', (event)=>{
                let getBtnCategoryId = event.currentTarget.dataset.id;

                let resultFilterProducts = products.filter((products)=>{
                    if(products.category === getBtnCategoryId){
                        return products;
                    }
                })
                if(getBtnCategoryId === "all"){
                    this.displayProducts(products);
                }else{
                    this.displayProducts(resultFilterProducts);
                }
            })
        })
    }

    getBtnAddToCart(btnAddToCart){
        buttonsDOM = btnAddToCart;
        btnAddToCart.forEach((buttons)=>{
            let singleIdProduct = buttons.dataset.id;
            let inCart = cart.find(product => product.id === singleIdProduct);
            
            if(inCart){
                buttons.innerText = "IN CART";
                buttons.disabled = true;
            }else{
                buttons.addEventListener('click',(event)=>{
                    event.currentTarget.innerText = 'IN CART';
                    event.currentTarget.disabled = true;
                    
                    // Get product from products
                    let cartItem = {...Storage.getProducts(singleIdProduct), quantity: 1};
                    // Add product to the cart
                    cart = [...cart, cartItem];
                    // Save cart in local storage
                    Storage.saveCart(cart);
                    // set cart value
                    this.setCartValues(cart);
                    // Display cart item
                    this.addCartItem(cartItem);
                    // Show the cart
                })
            }
        })
    }

    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;

        cart.map((singleProduct)=>{
            tempTotal += singleProduct.price * singleProduct.quantity;
            itemsTotal += singleProduct.quantity;
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItemQuantity.innerText = itemsTotal;
    }

    addCartItem(cartItemGetFromStorage){
        const div = document.createElement('div');
        div.classList.add('cart-item-container');
        
        div.innerHTML +=`
            <img class="cart-image" src="${cartItemGetFromStorage.image}" alt="">
            <div class="cart-item-detail-container">
                <div class="cart-item-name-price-btn">
                    <h4 class="cart-product-name">${cartItemGetFromStorage.name}</h4>
                    <h4 class="brand">${cartItemGetFromStorage.brand}</h4>
                    <h4 class="cart-item-price">${cartItemGetFromStorage.price}</h4>
                    <button class="cart-btn-remove-item" data-id="${cartItemGetFromStorage.id}">remove</button>
                </div>
                
                <div class="cart-item-quantity-container">
                    <button class="increase" data-id="${cartItemGetFromStorage.id}">+</button>
                    <h4 class="quantity">${cartItemGetFromStorage.quantity}</h4>
                    <button class="decrease" data-id="${cartItemGetFromStorage.id}">-</button>
                </div>
            </div>
        `
        cartSingleItemContainerDOM.appendChild(div);
    }

    setupApp(){
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
    }

    populateCart(cart){
        cart.forEach(singleProductItem => this.addCartItem(singleProductItem));
    }

    cartLogic(){
        // Clear all cart
        clearCartBtn.addEventListener('click', ()=>{
            this.clearCart();
        });
        // Cart functionality
        cartSingleItemContainerDOM.addEventListener('click', event =>{
            if(event.target.classList.contains('cart-btn-remove-item')){
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                cartSingleItemContainerDOM.removeChild(removeItem.parentElement.parentElement.parentElement)
                this.removeItem(id);
            }else if(event.target.classList.contains('increase')){
                let addItemQuantity = event.target;
                let id = addItemQuantity.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.quantity = tempItem.quantity + 1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addItemQuantity.nextElementSibling.innerText = tempItem.quantity;
            }else if(event.target.classList.contains('decrease')){
                let lowerItemQuantity = event.target;
                let id = lowerItemQuantity.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.quantity = tempItem.quantity - 1;

                if(tempItem.quantity > 0){
                    Storage.saveCart();
                    this.setCartValues(cart);
                    lowerItemQuantity.previousElementSibling.innerText = tempItem.quantity;

                }else{
                    cartSingleItemContainerDOM.removeChild(lowerItemQuantity.parentElement.parentElement.parentElement);
                    this.removeItem(id);
                }
            }
        })
    }

    clearCart(){
        // Get product item from cart
        let cartItem = cart.map(product => product.id);
        cartItem.forEach(id => this.removeItem(id));
        while(cartSingleItemContainerDOM.children.length > 0){
            cartSingleItemContainerDOM.removeChild(cartSingleItemContainerDOM.children[0]);
        }
    }

    removeItem(id){
        cart = cart.filter(item => item.id !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart);

        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = "ADD TO CART";
    }

    getSingleButton(id){
        return buttonsDOM.find(button => button.dataset.id === id);
    }
}

class Storage{
    static saveProducts(products){
        localStorage.setItem('products', JSON.stringify(products));
    }

    static getProducts(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(products => products.id === id);
    }

    static saveCart(singleProduct){
        localStorage.setItem('cart', JSON.stringify(singleProduct))
    }

    static getCart(){
        return localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): [];
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    const products = new Products();
    const ui = new UI();
    Storage.saveProducts(products.getProducts())
    // Setup app
    ui.setupApp()
    // Get all products
    ui.displayProducts(products.getProducts());
    ui.filterProducts(products.getProducts());
    ui.cartLogic()
})