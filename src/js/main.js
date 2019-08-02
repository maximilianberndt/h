"use strict";


// Service Worker initialisieren
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../sw.js');
  });
}


// Document Ready Function
r(function(){
    console.log("Hello from h.");
});
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
