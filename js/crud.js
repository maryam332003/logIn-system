let ProdName = document.getElementById("ProdName");
let ProdPrice = document.getElementById("ProdPrice");
let ProdDesc = document.getElementById("ProdDesc");
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
function getProduct() {
  product = {
    name: ProdName.value,
    price: ProdPrice.value,
    description: ProdDesc.value,
  };
  productArray.push(product);
  clear();
  localStorage.setItem("products", JSON.stringify(productArray));
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
    <td><button class="btn btn-outline-danger py-2 px-3" onclick="deleteProduct(${i})">DELETE</button></td>
    <td> <button class="btn btn-outline-success  py-2 px-3 mx-2"  onclick="setValueForUpdate(${i})">UPDATE</button></td>
    
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
  (ProdName.value = ""), (ProdPrice.value = ""), (ProdDesc.value = "");
}
function setValueForUpdate(index) {
  ProdName.value = productArray[index].name;
  ProdPrice.value = productArray[index].price;
  ProdDesc.value = productArray[index].description;
  displayProduct();
  addProduct.style.display = "none";
  updateProductBtn.style.display = "block";
  productIndex = index;
}
function updateProduct() {
  productArray[productIndex].name = ProdName.value;
  productArray[productIndex].price = ProdPrice.value;
  productArray[productIndex].description = ProdDesc.value;
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

logOutBtn.addEventListener("click",logOut)
function logOut(){
  location.replace("login.html");
}