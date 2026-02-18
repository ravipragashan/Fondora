import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const supplierTable = document.getElementById("supplierTable");

window.addSupplier = async function () {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  await addDoc(collection(db, "suppliers"), {
    name, address, phone, email
  });

  loadSuppliers();
};

async function loadSuppliers() {
  supplierTable.innerHTML = "";
  const snapshot = await getDocs(collection(db, "suppliers"));

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    supplierTable.innerHTML += `
      <tr>
        <td>${data.name}</td>
        <td>${data.phone}</td>
        <td>
          <button onclick="deleteSupplier('${docSnap.id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

window.deleteSupplier = async function (id) {
  await deleteDoc(doc(db, "suppliers", id));
  loadSuppliers();
};

loadSuppliers();
