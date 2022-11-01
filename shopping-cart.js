class Product {
    constructor(name,avatar,price){
        this.name = name;
        this.avatar = avatar;
        this.price = price;
    }
}
const products = [
    new Product("C 200 Avantgarde","/image/c200-avantgarde-plus.png","Price: 1.669.000.000 vnd"),
    new Product("C 200 Avantgarde Plus","/image/c200-avantgarde-plus.png","Price: 1.789.000.000 vnd"),
    new Product("C 200 Avantgarde","/image/c300.jpg","Price: 2.089.000.000 vnd"),
    new Product("C 200 Avantgarde","/image/E-180-2022.jpg","Price: 2.099.000.000 vnd"),
    new Product("C 200 Avantgarde","/image/e200-2022.png","Price: 2.470.000.000 vnd"),
    new Product("C 200 Avantgarde","/image/E300_AMG-2022.png","Price: 3.129.000.000 vnd"),
    new Product("C 200 Avantgarde","/image/GLC_200_2022.png","Price: 1.859.000.000 vnd"),
    new Product("C 200 Avantgarde","/image/GLC-200-4M.jpg","Price: 2.129.000.000 vnd"),
]
function renderProduct () {
    let htmls = products.map(function(product){
        return `
        <div class="cell-big">
                    <div class="cell-small">
                        <div>
                            <img class="product-logo" src="${product.avatar}" alt="">
                        </div>
                        <div class="product-name">${product.name}</div>
                        <div class="produc-price">${product.price}</div>
                        <div class="add-cart">
                            <div class="btn btn-add">ADD TO CART</div>
                        </div>
                    </div>
        </div>`
    })
    document.querySelector(`.row`).innerHTML = htmls.join("")
}
renderProduct();

const removeCartItemButton = document.getElementsByClassName("btn-danger")
console.log(removeCartItemButton);
for (let i=0; i<removeCartItemButton.length;i++) {
    let button = removeCartItemButton[i];
    button.addEventListener("click",function(event){
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal ()
    })
}
function updateCartTotal () {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName(`cart-row`);
    for (let i=0; i<cartRows.length; i++){
        var cartRow = cartRows[i];
        var cartRowPrice = cartRow.getElementsByClassName("cart-row-price")[0].getElementsByClassName("cart-row-price-tag")[0];
        var cartRowQuantity = cartRow.getElementsByClassName("cart-row-quantity")[0].getElementsByClassName("inp")[0];
        console.log(cartRowPrice,cartRowQuantity);
        var Price = parseFloat(cartRowPrice.innerText);
        var Quantity = cartRowQuantity.value;

        console.log(Price*Quantity);
    }
}
