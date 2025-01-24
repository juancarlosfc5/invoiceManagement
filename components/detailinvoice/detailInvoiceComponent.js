import { removeProductFromDetail } from "../../controllers/detail.js";

class DetailComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = /*html*/ `
      <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
      <br>
      <div class="container card">
        <div class="row text-center card-header">
          <h3>Detalle de Compra</h3>
        </div>
        <div class="card-body">
          <table id="detailTable" class="table table-striped">
            <thead>
              <tr>
                <th>Cod</th>
                <th>Nombre</th>
                <th>Valor Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    const tableBody = this.shadowRoot.querySelector("tbody");

    document.addEventListener("detailUpdated", (event) => {
      const details = event.detail;

      // Limpiar la tabla antes de volver a renderizar
      tableBody.innerHTML = "";

      // Renderizar cada fila
      details.forEach((product) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${product.cod}</td>
          <td>${product.product}</td>
          <td>$${product.price}</td>
          <td>${product.quantity}</td>
          <td>$${product.subtotal.toFixed(2)}</td>
          <td>
            <button class="btn btn-danger btn-sm remove-btn" data-cod="${product.cod}">Eliminar</button>
          </td>
        `;

        tableBody.appendChild(row);
      });

      // Agregar evento a los botones de eliminar
      tableBody.querySelectorAll(".remove-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
          const cod = event.target.dataset.cod;
          removeProductFromDetail(cod); // Eliminar producto
        });
      });
    });
  }
}

customElements.define("detail-component", DetailComponent);
