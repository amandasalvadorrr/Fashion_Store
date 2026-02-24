//1
function toggleTheme(){
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute('data-theme', newTheme);
    localStorage.getItem('theme', newTheme);
}

//2
async function fetchProducts(url) {
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
}

//3
const featuredList = document.getElementById("featured-list");

if (featuredList){
    loadFeaturedProducts();
}

async function loadFeaturedProducts(){
    const products = await fetchProducts("https://api.escuelajs.co/api/v1/products");
    const featured = products.slice(0,3);

    featuredList.innerHTML = "";

    featured.forEach(product => {
        featuredList.innerHTML += `
        <article class="card">
            <div class="card-img-wrapper">
                <img src="${product.images[0]}" class="card-img">
            </div>
            <div class="card-content">
                <span class="card-category">${product.category.name}</span>
                <h3 class="card-title">${product.title}</h3>
            <div class="card-footer">
                <span class="card-price">R$ ${product.price}</span>
                <a href="detail.html?id=${product.id}" class="btn-primary btn-small">Ver Detalhes</a>
            </div>
            </div>
        </article>
        `;
    });
}

//4
const productsList = document.getElementById("products-list");

if (productsList) {
  loadAllProducts();
}

async function loadAllProducts() {
  const products = await fetchProducts("https://api.escuelajs.co/api/v1/products");

  productsList.innerHTML = "";

  products.forEach(product => {
    productsList.innerHTML += `
      <article class="card">
        <div class="card-img-wrapper">
          <img src="${product.images[0]}" class="card-img">
        </div>
        <div class="card-content">
          <span class="card-category">${product.category.name}</span>
          <h3 class="card-title">${product.title}</h3>
          <div class="card-footer">
            <span class="card-price">R$ ${product.price}</span>
            <a href="detail.html?id=${product.id}" class="btn-primary btn-small">Ver Detalhes</a>
          </div>
        </div>
      </article>
    `;
  });
}

//5
async function filterProducts(categoryId) {
  let url = "https://api.escuelajs.co/api/v1/products";

  if (categoryId) {
    url += `/?categoryId=${categoryId}`;
  }

  const products = await fetchProducts(url);
  productsList.innerHTML = "";

  products.forEach(product => {
    productsList.innerHTML += `
      <article class="card">
        <div class="card-img-wrapper">
          <img src="${product.images[0]}" class="card-img">
        </div>
        <div class="card-content">
          <span class="card-category">${product.category.name}</span>
          <h3 class="card-title">${product.title}</h3>
          <div class="card-footer">
            <span class="card-price">R$ ${product.price}</span>
            <a href="detail.html?id=${product.id}" class="btn-primary btn-small">Ver Detalhes</a>
          </div>
        </div>
      </article>
    `;
  });
}

//6
const productDetail = document.getElementById("product-detail");

if (productDetail) {
  loadProductDetail();
}

async function loadProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const product = await fetchProducts(
    `https://api.escuelajs.co/api/v1/products/${productId}`
  );

  productDetail.innerHTML = `
    <img src="${product.images[0]}" class="detail-img">
    <div class="detail-info">
      <span class="card-category">Categoria: ${product.category.name}</span>
      <h1>${product.title}</h1>
      <div class="detail-price">R$ ${product.price}</div>
      <p class="detail-description">${product.description}</p>
      <button class="btn-primary">Adicionar ao Carrinho</button>
    </div>
  `;
}