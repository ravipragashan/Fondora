
import { state } from "./state.js";
import { recalc } from "./calculations.js";

const body = document.getElementById("itemsBody");

window.addRow = function(){
  state.items.push({item:"",qty:1,rate:0,tax:0,lineTotal:0});
  render();
}

function render(){
  body.innerHTML="";
  state.items.forEach((r,i)=>{
    body.innerHTML += `<tr>
      <td><input class="table-input" onchange="update(${i},'item',this.value)"></td>
      <td><input type="number" value="${r.qty}" onchange="update(${i},'qty',this.value)"></td>
      <td><input type="number" value="${r.rate}" onchange="update(${i},'rate',this.value)"></td>
      <td><input type="number" value="${r.tax}" onchange="update(${i},'tax',this.value)"></td>
      <td>${r.lineTotal.toFixed(2)}</td>
    </tr>`;
  });
}

window.update = function(i,field,val){
  state.items[i][field] = parseFloat(val) || val;
  recalc();
  render();
}

document.getElementById("taxMode").addEventListener("change",e=>{
  state.taxMode = e.target.value;
  recalc();
});

addRow();
