import { listProduct } from "../../controllers/products.js";
import { addProductToDetail } from "../../controllers/detail.js";

class ProductsComponent extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = /*html*/ `
      <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
      <br>
      <div class="container card">
        <div class="card-body text-center ">
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Codigo de Producto</label>
            <div class="col-sm-10">
              <input id="productIdInput" class="form-control text-center" type="text" value="" aria-label="Disabled input example" disabled readonly>
            </div>
          </div>
          
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Nombre de Producto</label>
            <div class="col-sm-10">
              <select id="productList" class="form-select" aria-label="Default select example">
                <option value="">Choose your product</option>
              </select>
              <div id="productSelect"></div>
            </div>
          </div>

          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Valor Unitario</label>
            <div class="col-sm-4">
              <input id="unitaryValue" class="form-control text-center" type="text" value="" aria-label="Disabled input example" disabled readonly>
            </div>
            <label class="col-sm-2 col-form-label">Cantidad</label>
            <div class="col-sm-4">
              <input id="quantity" class="form-control" type="number" min="1" step="1" id="productPriceInput">
            </div>
          </div>

          <div class="mb-3 row">
              <button id="addButton" type="button" class="btn btn-outline-success col-sm-12">Add</button>
            </div>
        </div>
      </div>
    `;
    }
    connectedCallback() {
      listProduct(this);

      const shadow = this.shadowRoot;
    const addButton = shadow.getElementById("addButton");
    const productIdInput = shadow.getElementById("productIdInput");
    const productList = shadow.getElementById("productList");
    const unitaryValueInput = shadow.getElementById("unitaryValue");
    const quantityInput = shadow.getElementById("quantity");

    // Conectar evento al botón Add
    addButton.addEventListener("click", () => {
      const productId = productIdInput.value;
      const productName = productList.options[productList.selectedIndex]?.textContent;
      const unitaryValue = parseFloat(unitaryValueInput.value.replace("$", "").trim());
      const quantity = parseInt(quantityInput.value, 10);

      if (productId && productName && unitaryValue && quantity > 0) {
        const product = {
          cod: productId,
          product: productName,
          price: unitaryValue,
          quantity: quantity,
        };

        addProductToDetail(product);

        // Limpiar campos de entrada
        quantityInput.value = "";
        productList.value = "";
        productIdInput.value = "";
        unitaryValueInput.value = "";
      } else {
        alert("Por favor, seleccione un producto y una cantidad válida.");
      }
    });
    }
  }
  
  customElements.define('products-component', ProductsComponent);