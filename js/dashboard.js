
import { db } from "./firebase.js";
import { collection, getDocs } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadStats(){
  const snap = await getDocs(collection(db,"purchaseOrders"));
  let total=0, open=0, closed=0;

  snap.forEach(doc=>{
    total++;
    const d = doc.data();
    if(d.status==="OPEN") open++;
    if(d.status==="CLOSED") closed++;
  });

  document.getElementById("totalOrders").innerText=total;
  document.getElementById("openOrders").innerText=open;
  document.getElementById("closedOrders").innerText=closed;
}

loadStats();
