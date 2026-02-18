import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const itemTable=document.getElementById("itemTable");

window.addItem=async function(){
await addDoc(collection(db,"items"),{
name:itemName.value,description:description.value,unitPrice:unitPrice.value
});
loadItems();
};

async function loadItems(){
itemTable.innerHTML="";
const snapshot=await getDocs(collection(db,"items"));
snapshot.forEach(docSnap=>{
const data=docSnap.data();
itemTable.innerHTML+=`
<tr>
<td>${data.name}</td>
<td>${data.unitPrice}</td>
</tr>`;
});
}

loadItems();