
import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const table = document.getElementById("itemTable");

window.addItem = async function(){
  const name = itemName.value;
  const price = priceInput.value;
  await addDoc(collection(db,"items"),{name,price});
  loadItems();
}

async function loadItems(){
  table.innerHTML="";
  const snap = await getDocs(collection(db,"items"));
  snap.forEach(doc=>{
    const d = doc.data();
    table.innerHTML += `<tr class="border-t fade-in">
      <td class="p-4">${d.name}</td>
      <td class="p-4">${d.price}</td>
    </tr>`;
  });
}

loadItems();
