class HeaderComponent extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      let id = Date.now().toString(16).toUpperCase();
      shadow.innerHTML = /*html*/ `
      <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
      <br>
      <div class="container text-center card">
        <div class="row align-items-start card-header">
          <h3>Apple Store - No. Factura</h3>
          <div class="col">
            <input class="form-control text-center" type="text" value="${id}" aria-label="Disabled input example" disabled readonly>
          </div>
        </div>
        <div class="card-body">
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">No. Id</label>
            <div class="col-sm-10">
              <input class="form-control" id="idClient">
            </div>
          </div>

          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Nombres</label>
            <div class="col-sm-4">
              <input class="form-control" id="nameClient">
            </div>
            <label class="col-sm-2 col-form-label">Apellidos</label>
            <div class="col-sm-4">
              <input class="form-control" id="lastNameClient">
            </div>
          </div>

          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Dirección</label>
            <div class="col-sm-10">
              <input class="form-control" id="direction">
            </div>
          </div>

          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label" type="email">Email</label>
            <div class="col-sm-10">
              <input class="form-control" id="email">
            </div>
          </div>
        </div>
      </div>
    `;
    }
    connectedCallback() {
      
    }
  }
  
  customElements.define('header-component', HeaderComponent);