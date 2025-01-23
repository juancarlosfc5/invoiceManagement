import { dataBase } from "../../js/data.js";

class ProductsComponent extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = /*html*/ `
      <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
      <div class="container card">
        <div class="row text-center card-header">
          <h3>Selección de producto</h3>
        </div>
        <div class="card-body">
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Codigo de Producto</label>
            <div class="col-sm-10">
              <input class="form-control text-center" type="text" value="cod" aria-label="Disabled input example" disabled readonly>
            </div>
          </div>
          
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Nombre de Producto</label>
            <div class="col-sm-10">
              <select class="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>

          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Valor Unitario</label>
            <div class="col-sm-4">
              <input class="form-control text-center" type="text" value="value" aria-label="Disabled input example" disabled readonly>
            </div>
            <label class="col-sm-2 col-form-label">Cantidad</label>
            <div class="col-sm-4">
              <input class="form-control" id="quantity">
            </div>
          </div>
        </div>
      </div>
    `;
    }
    connectedCallback() {

    }
  }
  
  customElements.define('products-component', ProductsComponent);