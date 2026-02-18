
import { state } from "./state.js";
import { formatCurrency } from "./ui.js";

export function recalc(){
  let subtotal = 0;
  let taxTotal = 0;

  state.items.forEach(row=>{
    let base = row.qty * row.rate;
    let tax = 0;

    if(state.taxMode === "exclusive"){
      tax = base * (row.tax/100);
    } else {
      tax = base - (base/(1+row.tax/100));
      base = base - tax;
    }

    row.lineTotal = base;
    row.taxAmount = tax;

    subtotal += base;
    taxTotal += tax;
  });

  document.getElementById("subtotal").innerText = formatCurrency(subtotal);
  document.getElementById("taxTotal").innerText = formatCurrency(taxTotal);
  document.getElementById("grandTotal").innerText = formatCurrency(subtotal + taxTotal);
}
