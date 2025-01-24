import { getInvoiceDetails } from "./detail.js";

// Initialize from localStorage or set default values
let facturas = JSON.parse(localStorage.getItem("facturas")) || [];
let invoiceNumber = JSON.parse(localStorage.getItem("invoiceNumber")) || 1;

export function calculateSummary(summaryComponent) {
  const subtotalInput = summaryComponent.shadowRoot.querySelector("#subtotal");
  const ivaInput = summaryComponent.shadowRoot.querySelector("#iva");
  const totalInput = summaryComponent.shadowRoot.querySelector("#total");

  document.addEventListener("detailUpdated", (event) => {
    const details = event.detail;

    // Calcular valores
    const subtotal = details.reduce((acc, item) => acc + item.subtotal, 0);
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    // Actualizar inputs
    subtotalInput.value = `$${subtotal.toFixed(2)}`;
    ivaInput.value = `$${iva.toFixed(2)}`;
    totalInput.value = `$${total.toFixed(2)}`;
  });
}

export function processPayment(summaryComponent) {
  const header = getHeaderInfo();
  const detailFact = getInvoiceDetails();

  if (!header || detailFact.length === 0) {
    alert("Por favor complete todos los campos y registre productos en la factura.");
    return;
  }

  const subtotal = parseFloat(
    summaryComponent.shadowRoot.querySelector("#subtotal").value.replace("$", "")
  );
  const iva = parseFloat(
    summaryComponent.shadowRoot.querySelector("#iva").value.replace("$", "")
  );
  const total = parseFloat(
    summaryComponent.shadowRoot.querySelector("#total").value.replace("$", "")
  );

  // Crear objeto factura
  const factura = {
    nroFactura: invoiceNumber,
    header,
    detailFact,
    summary: { subtotal, iva, total },
  };

  // Agregar a facturas y actualizar localStorage
  facturas.push(factura);
  localStorage.setItem("facturas", JSON.stringify(facturas));

  // Incrementar y guardar número de factura
  invoiceNumber++;
  localStorage.setItem("invoiceNumber", JSON.stringify(invoiceNumber));

  // Mostrar mensaje y limpiar
  alert("¡Factura generada con éxito!");
  clearAllData();
}

function getHeaderInfo() {
  const headerComponent = document.querySelector("header-component").shadowRoot;

  const identificacion = headerComponent.querySelector("#idClient").value.trim();
  const nombres = headerComponent.querySelector("#nameClient").value.trim();
  const apellido = headerComponent.querySelector("#lastNameClient").value.trim();
  const direccion = headerComponent.querySelector("#direction").value.trim();
  const email = headerComponent.querySelector("#email").value.trim();

  if (!identificacion || !nombres || !apellido || !direccion || !email) {
    return null;
  }

  return { identificacion, nombres, apellido, direccion, email };
}

function clearAllData() {
  // Limpiar header
  const headerComponent = document.querySelector("header-component").shadowRoot;
  headerComponent.querySelector("#idClient").value = "";
  headerComponent.querySelector("#nameClient").value = "";
  headerComponent.querySelector("#lastNameClient").value = "";
  headerComponent.querySelector("#direction").value = "";
  headerComponent.querySelector("#email").value = "";

  // Limpiar detalle
  const detailTable = document.querySelector("detail-component").shadowRoot.querySelector("tbody");
  detailTable.innerHTML = "";

  // Limpiar resumen
  const summaryComponent = document.querySelector("summary-component").shadowRoot;
  summaryComponent.querySelector("#subtotal").value = "$0.00";
  summaryComponent.querySelector("#iva").value = "$0.00";
  summaryComponent.querySelector("#total").value = "$0.00";

  // Emitir evento para limpiar detalle
  document.dispatchEvent(new CustomEvent("detailUpdated", { detail: [] }));
}