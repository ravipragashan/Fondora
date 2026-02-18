
import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const table = document.getElementById("poTable");

window.createPO = async function(){
  const supplier = supplierInput.value;
  await addDoc(collection(db,"purchaseOrders"),{
    supplier,
    status:"OPEN",
    date:new Date().toISOString().slice(0,10)
  });
  loadPO();
}

async function loadPO(){
  table.innerHTML="";
  const snap = await getDocs(collection(db,"purchaseOrders"));
  snap.forEach(doc=>{
    const d = doc.data();
    table.innerHTML += `<tr class="border-t fade-in">
      <td class="p-4">${d.supplier}</td>
      <td class="p-4">${d.date}</td>
      <td class="p-4">
        <span class="px-3 py-1 rounded-full text-sm ${d.status==='OPEN'?'badge-open':'badge-closed'}">${d.status}</span>
      </td>
    </tr>`;
  });
}

loadPO();
