class Product {
    constructor(id,name,avatar,price){
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.price = price;
        this.amount =1;
    }
    sumCash (){
        return this.price * this.amount
    }
    setAmount (amount) {
        this.amount = amount
    }
}
const products = [
    new Product(1,"C 200 Avantgarde","image/c200-avantgarde-plus.png",1669000000),
    new Product(2,"C 200 Avantgarde Plus","image/c200-avantgarde-plus.png",1789000000),
    new Product(3,"C 300 AMG","image/c300.jpg",2089000000),
    new Product(4,"E180 2022","image/E-180-2022.jpg",2099000000),
    new Product(5,"E200 2022","image/e200-2022.png",2470000000),
    new Product(6,"E300 2022","image/E300_AMG-2022.png",3129000000),
    new Product(7,"GLC 200 2022","image/GLC_200_2022.png",1859000000),
    new Product(8,"GLC 200 4MATIC","image/GLC-200-4M.jpg",2669000000),
]

function renderProduct () {
    let htmls = products.map(function(product){
        return `
        <div class="cell-big">
        <div class="cell-small">
        <div>
        <img class="product-logo" src="${product.avatar}" alt="">
        </div>
        <div class="product-name">
        <span class="identify">${product.id}</span>${product.name}</div>
        <div class="produc-price">${currencyFormat(product.price)}</div>
        <div class="add-cart">
        <div class="btn btn-add" onclick="addProduct(${product.id})">ADD TO CART</div>
        </div>
        </div>
        </div>`
    })
    document.querySelector(`.row`).innerHTML = htmls.join("")
}
renderProduct();

class ProductCart {
    constructor(id,name,avatar,price) {
        this.name = name;
        this.avatar = avatar;
        this.price = price;
        this.id = id;
    }
}

const productcarts = [
    // new ProductCart(1,"C 200 Avantgarde","/image/c200-avantgarde-plus.png","Price: 1.669.000.000 vnd"),
    // new ProductCart(2,"C 200 Avantgarde Plus","/image/c200-avantgarde-plus.png","Price: 1.789.000.000 vnd"),
];

function addProduct(productId) {
  for (i=0;i<products.length;i++){
    if (productId === products[i].id){
        
        productcarts.push(products[i]);
    }
  }
  renderPurchase ();
  Calculating ();
}
function renderPurchase () {
    let htmls2=productcarts.map(function(productcart,index){
        return `
        <div class="cart-row">
            <div class="cart-row-item">
                <img class="cart-row-img" src="${productcart.avatar}" alt="">
                <span class="cart-row-name">${productcart.name}</span>
            </div>
            <div class="cart-row-price">
                <span class="cart-row-price-tag">${currencyFormat(productcart.sumCash())}</span>
            </div>
            <div class="cart-row-quantity">
                <input class="inp" type="number" name="" id="inp" value="${productcart.amount}" oninput="quantity(this,${productcart.id})">
                <button class="btn btn-danger" onclick="removeProduct(${index})">REMOVE</button>
            </div>
        </div>
        `
    })
    document.querySelector(`.cart-items`).innerHTML = htmls2.join("")
    
}
function removeProduct (index) {
    let confirm = window.confirm("Do you wanna remove this product from your cart?");
    if (confirm) {
        
        productcarts.splice(index,1);
        renderPurchase ();
        Calculating ()

    }
}

function quantity(input,idCart) {
    for (let product of productcarts){
        if (product.id == idCart) {
            product.setAmount(Number(input.value))
        }
    }
    renderPurchase()
    Calculating ()
}



function Calculating () {
    var total = 0;
    for(let item of productcarts){
        total += item.sumCash();
    }
   
    document.querySelector(".total-price").innerText = currencyFormat(total);
}

function currencyFormat(number){
    return number.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

function openModel() {
    document.querySelector(".model-container").classList.toggle("show");
}
function closeModel () {
    document.querySelector(".model-container").classList.toggle("show");
}