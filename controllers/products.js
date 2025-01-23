import { dataBase } from "../js/data.js";

export function listProduct (productsComponent) {
    const item = productsComponent.shadowRoot.getElementById('productList');
    const productsDiv = productsComponent.shadowRoot.getElementById('productSelect');
    dataBase.forEach(element => {
        const option = document.createElement("option");
        option.value = element.id;
        option.textContent = `${element.product}`;
        item.appendChild(option);
    });

    item.addEventListener('change', (event) => {
        const productId = event.target.value;
        if (productId) {
            const selectProduct = dataBase.find(p => p.id === productId);
            const productDiv = productsComponent.shadowRoot.createElement('div');
            productDiv.textContent = `${element.product}`;
            productsDiv.appendChild(productDiv);
            event.target.value = '';
        }
    });
}