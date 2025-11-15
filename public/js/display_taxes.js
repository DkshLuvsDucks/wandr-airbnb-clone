const taxSwitch = document.getElementById("flexSwitchCheckDefault");
const taxRate = 0.18;

// Restore switch state from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedState = localStorage.getItem("displayTaxes");

    if (savedState === "on") {
        taxSwitch.checked = true;
    }
    updatePrices(); // always refresh prices based on state
});

taxSwitch.addEventListener("change", () => {
    if (taxSwitch.checked) {
        localStorage.setItem("displayTaxes", "on");
    } else {
        localStorage.setItem("displayTaxes", "off");
    }
    updatePrices();
});

function updatePrices() {
    const prices = document.querySelectorAll(".price");

    prices.forEach(p => {
        const basePrice = Number(p.dataset.basePrice);

        if (taxSwitch.checked) {
            const taxAmt = Math.round(basePrice * taxRate);
            const finalPrice = basePrice + taxAmt;

            p.innerHTML = `
                ₹ ${finalPrice.toLocaleString("en-IN")} 
                <span style="color:#16a34a  ; font-weight:600;">
                    (+ ₹${taxAmt.toLocaleString("en-IN")} GST)
                </span>
                / night
            `;
        } else {
            p.innerHTML = `₹ ${basePrice.toLocaleString("en-IN")} / night`;
        }
    });
}