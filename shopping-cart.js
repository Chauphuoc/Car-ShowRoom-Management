class Product {
    constructor(id, name, avatar, price) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.price = price;
        this.amount = 1;
    }
    sumCash() {
        return this.price * this.amount
    }
    getAmount() {
        return this.amount;
    }
    setAmount(amount) {
        this.amount = amount
    }
}
const products = [
    new Product(1, "C 200 Avantgarde", "image/c200-avantgarde-plus.png", 1669000000),
    new Product(2, "C 200 Avantgarde Plus", "image/c200-avantgarde-plus.png", 1789000000),
    new Product(3, "C 300 AMG", "image/c300.jpg", 2089000000),
    new Product(4, "E180 2022", "image/E-180-2022.jpg", 2099000000),
    new Product(5, "E200 2022", "image/e200-2022.png", 2470000000),
    new Product(6, "E300 2022", "image/E300_AMG-2022.png", 3129000000),
    new Product(7, "GLC 200 2022", "image/GLC_200_2022.png", 1859000000),
    new Product(8, "GLC 200 4MATIC", "image/GLC-200-4M.jpg", 2669000000),
    new Product(9, "E200 2022", "image/e200-2022.png", 2470000000),
    new Product(10, "C 200 Avantgarde Plus", "image/c200-avantgarde-plus.png", 1789000000),
]
let perPage = 4;
let currentPage = 1;
let start = 0;
let end = perPage;
const btnNext = document.querySelector(".btn-paging-right");
const totalPage = Math.ceil(products.length/(perPage)) ;
const btnPrevious = document.querySelector(".btn-paging-left");

function renderProduct() {
    let htmls = products.map(function (product, index) {
        if(index>=start&&index<end){
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
        }
    })
    document.querySelector(`.row`).innerHTML = htmls.join("")
}
btnPrevious.addEventListener("click",()=>{
    currentPage--;
    if (currentPage<1){
        currentPage=1;
        console.log(currentPage);
    }
    start = (currentPage-1)*perPage;
    end = currentPage * perPage;
    renderProduct();
})
btnNext.addEventListener("click",()=>{
    currentPage++;
    if (totalPage<currentPage){
        currentPage = totalPage
        console.log(currentPage);
    }
    start = (currentPage-1)*perPage;
    end = currentPage*perPage;
    renderProduct();
})
renderProduct();
function renderListPage (){
    let html = "";
    
    for (i = 1;i<=totalPage;i++){
        html +=`<li class='active'><pre id="id-number">${i}</pre></li>`;
    }
    document.getElementById("number-page").innerHTML = html;
}
renderListPage();
function findCurrentPage (){
    let numberPage =document.querySelectorAll(".active pre"); 
    console.log(numberPage);
    for (i = 0; i<numberPage.length;i++){
        numberPage[i].addEventListener("click",()=>{
            console.log(i);
        })
    }
}
findCurrentPage()


class ProductCart {
    constructor(id, name, avatar, price) {
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

    
    for(let cartItem of productcarts){
        if(cartItem.id == productId){
            alert(`${cartItem.name} đã tồn tại!`)
            return;
        }
    }
    for (let i = 0; i < products.length; i++) {
            if (productId == products[i].id) {
                productcarts.push(products[i])
            }
        }
    //

    renderPurchase();
    Calculating();
}
function renderPurchase() {
    let htmls2 = productcarts.map(function (productcart) {
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
                <input class="inp" type="number" min="0" name="" id="inp" value="${productcart.amount}" oninput="quantity(this,${productcart.id})">
                <button class="btn btn-danger" onclick="removeProduct(${productcart.id})">REMOVE</button>
            </div>
        </div>
        `
    })
    document.querySelector(`.cart-items`).innerHTML = htmls2.join("")
}
function removeProduct(productcartid) {
    let confirm = window.confirm("Do you wanna remove this product from your cart?");
    if (confirm) {
        let index = productcarts.findIndex(function (productcartid) {
            return productcartid;
        })
        productcarts.splice(index, 1);
        renderPurchase();
        Calculating()

    }
}

function quantity(input, idCart) {
    // Thực hiện chức năng nếu người dùng nhập vào số quantity<1 thì hiển thị 1
    // Cách này chạy được
    // for (let product of productcarts) {
    //     let valueProduct = Number(input.value)
    //     if (product.id == idCart) {
    //         if (valueProduct > 0) {
    //             product.setAmount(Number(input.value));
    //         }
    //         else { 
    //             product.setAmount(1) 
    //         }
    //     }
    // }


    for (let product of productcarts) {
        if (product.id == idCart) {
            if (Number(input.value) > 0) {
                product.setAmount(Number(input.value))
            }
            else { product.setAmount(1) }
            
        }
    }
    renderPurchase()
    Calculating()
}



function Calculating() {
    var total = 0;
    for (let item of productcarts) {
        total += item.sumCash();
    }

    document.querySelector(".total-price").innerText = currencyFormat(total);
}

function currencyFormat(number) {
    return number.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

function openModel() {
    document.querySelector(".model-container").classList.toggle("show");
}
function closeModel() {
    document.querySelector(".model-container").classList.toggle("show");
}

