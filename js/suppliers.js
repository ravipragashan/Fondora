
import { db } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const table = document.getElementById("supplierTable");

window.addSupplier = async function(){
  const name = nameInput.value;
  const phone = phoneInput.value;
  const email = emailInput.value;
  await addDoc(collection(db,"suppliers"),{name,phone,email});
  loadSuppliers();
}

async function loadSuppliers(){
  table.innerHTML="";
  const snap = await getDocs(collection(db,"suppliers"));
  snap.forEach(docSnap=>{
    const d = docSnap.data();
    table.innerHTML += `<tr class="border-t fade-in">
      <td class="p-4">${d.name}</td>
      <td class="p-4">${d.phone}</td>
      <td class="p-4">${d.email}</td>
      <td class="p-4 text-right">
        <button onclick="deleteSupplier('${docSnap.id}')" class="text-red-500">Delete</button>
      </td>
    </tr>`;
  });
}

window.deleteSupplier = async function(id){
  await deleteDoc(doc(db,"suppliers",id));
  loadSuppliers();
}

loadSuppliers();
