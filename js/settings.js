
import { state } from "./state.js";

window.toggleAutoNumber = function(val){
  state.settings.soAutoNumber = val;
}

window.saveSettings = function(){
  alert("Settings saved locally (connect to Firestore for persistence).");
}
