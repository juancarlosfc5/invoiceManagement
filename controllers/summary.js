import { getInvoiceDetails } from "./detail.js";

// Initialicion desde localStorage y set de valores por defecto
let facturas = JSON.parse(localStorage.getItem("facturas")) || [];

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

// Funcion para el pago de la factura
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

  // Obtener el número de factura desde el Shadow DOM de header-component
  const headerComponent = document.querySelector("header-component").shadowRoot;
  const invoiceID = headerComponent.querySelector("#invoiceID").value.trim();

  if (!invoiceID) {
    alert("No se pudo generar un número de factura. Verifique el componente de cabecera.");
    return;
  }

  // Crear objeto factura
  const factura = {
    nroFactura: invoiceID,
    header,
    detailFact,
    summary: { subtotal, iva, total },
  };

  // Agregar a facturas y actualizar localStorage
  facturas.push(factura);
  localStorage.setItem("facturas", JSON.stringify(facturas));

  // Mostrar mensaje y recargar la página
  alert("¡Factura generada con éxito!");
  reloadPage();
}

// Extraer los datos personales del cliente en el header
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

// Recargar pagina para limpiar campos y actualizar numero de factura
export function reloadPage() {
  setTimeout(() => {
    location.reload(); // Recargar la página
  }, 500); // Esperar 500 ms antes de recargar
}