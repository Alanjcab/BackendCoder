const socket = io();

const form = document.getElementById("form");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const inputCode = document.getElementById("code");
const inputCategoria = document.getElementById("categoria");
const inputStock = document.getElementById("stock");
const products = document.getElementById("products");

form.onsubmit = (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const description = inputDescription.value;
  const price = inputPrice.value;
  const code = inputCode.value;
  const categoria = inputCategoria.value;
  const stock = inputStock.value;
  const product = {
    title,
    description,
    price,
    code,
    categoria,
    stock,
  };
  socket.emit("newProduct", product);
};

socket.on("products", (arrayProducts) => {
  let infoProducts = "";
  arrayProducts.map((prod) => {
    infoProducts += `${prod.title} - ${prod.description} - $${prod.price} - ${prod.code} - ${prod.categoria} - ${prod.stock}</br>`;
  });
  products.innerHTML = infoProducts;
});

const deleteForm = document.getElementById("deleteForm");
deleteForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const productId = document.getElementById("productId").value;

  socket.emit("deleteProduct", productId);
});

socket.on("products", (products) => {
  renderProducts(products);
});

function deleteProduct(productId) {
  socket.emit("deleteProduct", productId);
}
