// =============================
// PRODUCTS
// =============================

const products = [
{
    id:1,
    name:"Classic Beige Top",
    category:"Tops",
    price:699,
    image:"images/top1.jpg"
},
{
    id:2,
    name:"Oversized White T-Shirt",
    category:"T-Shirts",
    price:799,
    image:"images/tshirt1.jpg"
},
{
    id:3,
    name:"Minimal Linen Dress",
    category:"Dresses",
    price:1499,
    image:"images/dress1.jpg"
},
{
    id:4,
    name:"Pleated Skirt",
    category:"Skirts",
    price:999,
    image:"images/skirt1.jpg"
},
{
    id:5,
    name:"Wide Leg Trouser",
    category:"Trousers",
    price:1299,
    image:"images/trouser1.jpg"
},
{
    id:6,
    name:"Neutral Co-ord Set",
    category:"Co-ords",
    price:1899,
    image:"images/coord1.jpg"
}
];

// =============================
// CART
// =============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCartCount();

// =============================
// DISPLAY PRODUCTS
// =============================

const productContainer = document.getElementById("product-container");

function displayProducts(items){

    if(!productContainer) return;

    productContainer.innerHTML="";

    items.forEach(product=>{

        productContainer.innerHTML += `
        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <span class="category">${product.category}</span>

                <h3>${product.name}</h3>

                <p class="price">₹${product.price}</p>

                <div class="rating">★★★★★</div>

                <button class="cart-btn"
                onclick="addToCart(${product.id})">
                Add to Cart
                </button>

            </div>

        </div>
        `;

    });

}

displayProducts(products);

// =============================
// ADD TO CART
// =============================

function addToCart(id){

    const product = products.find(item=>item.id===id);

    cart.push(product);

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " added to cart.");

}

// =============================
// CART COUNT
// =============================

function updateCartCount(){

    const count=document.getElementById("cart-count");

    if(count){

        count.innerText=cart.length;

    }

}

// =============================
// SEARCH
// =============================

const search=document.getElementById("search");

if(search){

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

const filtered=products.filter(product=>

product.name.toLowerCase().includes(value) ||

product.category.toLowerCase().includes(value)

);

displayProducts(filtered);

});

}

// =============================
// PRICE FILTER
// =============================

const priceRange=document.getElementById("priceRange");
const priceValue=document.getElementById("priceValue");

if(priceRange){

priceRange.addEventListener("input",()=>{

priceValue.innerText=priceRange.value;

const filtered=products.filter(product=>

product.price<=priceRange.value

);

displayProducts(filtered);

});

}

// =============================
// CATEGORY FILTER
// =============================

const checkboxes=document.querySelectorAll(
'.filter-group input[type="checkbox"]'
);

checkboxes.forEach(box=>{

box.addEventListener("change",filterProducts);

});

function filterProducts(){

const selected=[];

checkboxes.forEach(box=>{

if(box.checked){

selected.push(box.value);

}

});

if(selected.length===0){

displayProducts(products);

return;

}

const filtered=products.filter(product=>

selected.includes(product.category)

);

displayProducts(filtered);

}

// =============================
// SORT
// =============================

const sort=document.getElementById("sort");

if(sort){

sort.addEventListener("change",()=>{

let sorted=[...products];

if(sort.value==="Price Low to High"){

sorted.sort((a,b)=>a.price-b.price);

}

else if(sort.value==="Price High to Low"){

sorted.sort((a,b)=>b.price-a.price);

}

displayProducts(sorted);

});

}

// =============================
// CART PAGE
// =============================

const cartContainer=document.getElementById("cart-items");
const totalPrice=document.getElementById("total-price");

function loadCart(){

if(!cartContainer) return;

cartContainer.innerHTML="";

let total=0;

cart.forEach((item,index)=>{

total+=item.price;

cartContainer.innerHTML+=`

<div class="cart-item">

<img src="${item.image}" width="80">

<div>

<h3>${item.name}</h3>

<p>₹${item.price}</p>

<button onclick="removeItem(${index})">
Remove
</button>

</div>

</div>

`;

});

if(totalPrice){

totalPrice.innerText="₹"+total;

}

}

loadCart();

// =============================
// REMOVE ITEM
// =============================

function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

location.reload();

}

// =============================
// CHECKOUT
// =============================

function checkout(){

if(cart.length===0){

alert("Your cart is empty.");

return;

}

window.location.href="checkout.html";

}

// =============================
// PLACE ORDER
// =============================

function placeOrder(){

const name=document.getElementById("name")?.value;
const phone=document.getElementById("phone")?.value;
const address=document.getElementById("address")?.value;

if(!name || !phone || !address){

alert("Please fill all details.");

return;

}

localStorage.setItem("customer",JSON.stringify({

name,
phone,
address

}));

window.location.href="receipt.html";

}

// =============================
// RECEIPT
// =============================

function loadReceipt(){

const receipt=document.getElementById("receipt");

if(!receipt) return;

const customer=JSON.parse(localStorage.getItem("customer"));

let total=0;

let html="";

cart.forEach(item=>{

total+=item.price;

html+=`
<p>${item.name} - ₹${item.price}</p>
`;

});

receipt.innerHTML=`

<h2>Order Successful 🎉</h2>

<hr>

<p><b>Name:</b> ${customer.name}</p>

<p><b>Phone:</b> ${customer.phone}</p>

<p><b>Address:</b> ${customer.address}</p>

<hr>

${html}

<hr>

<h3>Total : ₹${total}</h3>

<p><b>Expected Delivery:</b> 3 - 5 Days</p>

`;

}

loadReceipt();