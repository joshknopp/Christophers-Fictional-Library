(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();let d=[],s=null,i=0;async function f(){try{const e=await fetch("books.json");if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);d=await e.json()}catch(e){console.error("Could not fetch books:",e)}}function p(){const e=document.getElementById("app");if(!e)return;const r=d.map(o=>`
    <div class="book-cover" data-book-id="${o.id}">
      <img src="${o.cover}" alt="${o.title}" loading="lazy">
    </div>
  `).join("");e.innerHTML=r}function a(e){const r=document.querySelector(".pages-wrapper");if(!r)return;const o=-e*100;r.style.transform=`translateX(${o}%)`,i=e}function g(e){if(s=d.find(o=>o.id===e),!s)return;const r=document.getElementById("reader-view-pages");r.innerHTML=`
    <div class="pages-wrapper" style="width: ${s.pages.length*100}%">
      ${s.pages.map(o=>`
        <div class="reader-page">
          <img src="${o}" alt="Page from ${s.title}" loading="lazy">
        </div>
      `).join("")}
    </div>
  `,document.getElementById("reader-view").style.display="flex",a(0)}function u(){document.getElementById("reader-view").style.display="none",s=null}function m(){document.getElementById("app").addEventListener("click",e=>{const r=e.target.closest(".book-cover");r&&g(r.dataset.bookId)}),document.getElementById("close-reader").addEventListener("click",u),document.getElementById("next-page").addEventListener("click",()=>{s&&i<s.pages.length-1&&a(i+1)}),document.getElementById("prev-page").addEventListener("click",()=>{s&&i>0&&a(i-1)}),window.addEventListener("keydown",e=>{s&&(e.key==="ArrowRight"?document.getElementById("next-page").click():e.key==="ArrowLeft"?document.getElementById("prev-page").click():e.key==="Escape"&&u())})}async function y(){await f(),p(),m()}y();
