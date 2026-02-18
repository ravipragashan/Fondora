
import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const table = document.getElementById("itemTable");

window.addItem = async function(){
  const name = document.getElementById("itemName").value;
  const rate = document.getElementById("rate").value;
  const tax = document.getElementById("tax").value;

  await addDoc(collection(db,"items"),{name,rate,tax});
  loadItems();
}

async function loadItems(){
  table.innerHTML="";
  const snap = await getDocs(collection(db,"items"));
  snap.forEach(doc=>{
    const d = doc.data();
    table.innerHTML += `<tr>
      <td class="p-3">${d.name}</td>
      <td class="p-3">${d.rate}</td>
      <td class="p-3">${d.tax}%</td>
    </tr>`;
  });
}

loadItems();
