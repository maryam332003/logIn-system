let prodName = document.getElementById("prodName");
let prodPrice = document.getElementById("prodPrice");
let prodDesc = document.getElementById("prodDesc");
let addProduct = document.getElementById("addProduct");
let updateProductBtn = document.getElementById("updateProductBtn");
let search = document.getElementById("search");
search.addEventListener("click", searchForProduct);
let productArray = [];
let productIndex;

updateProductBtn.addEventListener("click", updateProduct);
addProduct.addEventListener("click", getProduct);
if (localStorage.getItem("products") != null) {
  productArray = JSON.parse(localStorage.getItem("products"));
  displayProduct();
}

function displayProduct() {
  var productStore = "";
  for (let i = 0; i < productArray.length; i++) {
    productStore += `
  <tr>
    <td>${i + 1}</td>
    <td>${productArray[i].name}</td>
    <td>${productArray[i].price}</td>
    <td>${productArray[i].description}</td>
    <td><button class="btn btn-add py-2 px-3" onclick="deleteProduct(${i})">DELETE</button></td>
    <td> <button class="btn btn-update  py-2 px-3 mx-2"  onclick="setValueForUpdate(${i})">UPDATE</button></td>
    
    </tr>
  
  `;
  }
  document.getElementById("demo").innerHTML = productStore;
}
function deleteProduct(index) {
  productArray.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productArray));

  displayProduct();
}
function clear() {
  (prodName.value = ""), (prodPrice.value = ""), (prodDesc.value = "");
}
function setValueForUpdate(index) {
  prodName.value = productArray[index].name;
  prodPrice.value = productArray[index].price;
  prodDesc.value = productArray[index].description;
  displayProduct();
  addProduct.style.display = "none";
  updateProductBtn.style.display = "block";
  productIndex = index;
}
function updateProduct() {
  productArray[productIndex].name = prodName.value;
  productArray[productIndex].price = prodPrice.value;
  productArray[productIndex].description = prodDesc.value;
  localStorage.setItem("products", JSON.stringify(productArray));
  displayProduct();
  clear();
  addProduct.style.display = "block";
  updateProductBtn.style.display = "none";
}

function searchForProduct(searchedValue) {
  let searchedProductArr = [];
  let productStore = ``;
  for (let i = 0; i < productArray.length; i++) {
    if (
      productArray[i].name
        .toLowerCase()
        .includes(searchedValue.toLowerCase()) == true
    ) {
      productStore += `
      <tr>
      <td>${i + 1}</td>
        <td>${productArray[i].name}</td>
        <td>${productArray[i].price}</td>
        <td>${productArray[i].description}</td>
        <td>
        <button class="btn btn-outline-primary py-2 px-3" onclick="deleteProduct(${i})">DELETE</button></td>
        <td> <button class="btn btn-outline-danger py-2 px-3 mx-2"  onclick="setValueForUpdate(${i})">UPDATE</button>
        </td>
        </tr>
      
      `;
    }
    document.getElementById("demo").innerHTML = productStore;
  }
}

const logOutBtn = document.getElementById("logOutBtn");
const welcomedUser = document.getElementById("welcomedUser");

logOutBtn.addEventListener("click", logOut);
function logOut() {
  location.replace("login.html");
}

const productNameRegex = /^[A-Z]{1}[a-z ]{4,}$/;
const productPriceRegex = /^[0-9]+$/;
const productDescRegex = /^[a-zA-Z0-9c ]{5,}$/;

function validate(regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
  }
}
console.log(prodName.nextElementSibling);

prodName.addEventListener("input", () => {
  validate(productNameRegex, prodName);
});
prodPrice.addEventListener("input", () => {
  validate(productPriceRegex, prodPrice);
});
prodDesc.addEventListener("input", () => {
  validate(productDescRegex, prodDesc);
});

function getProduct() {

  if (
    validate(productNameRegex, prodName) &&
    validate(productPriceRegex, prodPrice) &&
    validate(productDescRegex, prodDesc)
  ) {
    product = {
      name: prodName.value,
      price: prodPrice.value,
      description: prodDesc.value,
    };
    productArray.push(product);
    localStorage.setItem("products", JSON.stringify(productArray));
    displayProduct();
    clear();
  }
  

}
