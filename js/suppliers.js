
import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const table = document.getElementById("supplierTable");

window.addSupplier = async function(){
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  await addDoc(collection(db,"suppliers"),{name,phone,email});
  loadSuppliers();
}

async function loadSuppliers(){
  table.innerHTML="";
  const snap = await getDocs(collection(db,"suppliers"));
  snap.forEach(doc=>{
    const d = doc.data();
    table.innerHTML += `<tr>
      <td class="p-3">${d.name}</td>
      <td class="p-3">${d.phone}</td>
      <td class="p-3">${d.email}</td>
    </tr>`;
  });
}

loadSuppliers();
