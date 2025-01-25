import { calculateSummary, processPayment } from "../../controllers/summary.js";

class SummaryComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = /*html*/ `
      <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
      <br>
      <div class="container card">
        <div class="row text-center card-header">
          <h3>Resumen de Factura</h3>
        </div>
        <div class="card-body">
          <div class="row mb-3">
            <label class="col-sm-4 col-form-label">Subtotal</label>
            <div class="col-sm-8">
              <input id="subtotal" class="form-control text-center" type="text" value="$0.00" disabled readonly>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-sm-4 col-form-label">IVA (19%)</label>
            <div class="col-sm-8">
              <input id="iva" class="form-control text-center" type="text" value="$0.00" disabled readonly>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-sm-4 col-form-label">Total</label>
            <div class="col-sm-8">
              <input id="total" class="form-control text-center" type="text" value="$0.00" disabled readonly>
            </div>
          </div>
          <div class="row">
            <button id="payButton" class="btn btn-success col-sm-12">Pagar</button>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    calculateSummary(this);


    // Evento click para el pago de la factura
    const payButton = this.shadowRoot.querySelector("#payButton");
    payButton.addEventListener("click", () => {
      processPayment(this);
    });
  }
}

customElements.define("summary-component", SummaryComponent);
