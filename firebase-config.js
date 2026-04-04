// ─────────────────────────────────────────────────────────
//  NOIR Detective Portal — Firebase Configuration
//  Replace the values below with your Firebase project config
// ─────────────────────────────────────────────────────────
//
//  HOW TO GET THESE VALUES:
//  1. Go to https://console.firebase.google.com
//  2. Create a new project (or open existing)
//  3. Click the gear ⚙ → "Project settings"
//  4. Under "Your apps", click Web (</>)
//  5. Register your app and copy the firebaseConfig object
//
export const firebaseConfig = {
  apiKey:            "AIzaSyCRF3vyE3Sg2pvQEcCGMT7UtL7Gr637sPw",
  authDomain:        "sherlocked-again.firebaseapp.com",
  projectId:         "sherlocked-again",
  storageBucket:     "sherlocked-again.firebasestorage.app",
  messagingSenderId: "974750600091",
  appId:             "1:974750600091:web:a78af10390c29b9791ef3e",
  measurementId:     "G-EJG2ZS0T9S"
};

// ── CONFIG GUARD ──
if (firebaseConfig.apiKey === "YOUR_API_KEY") {
  document.addEventListener("DOMContentLoaded", () => {
    const banner = document.createElement("div");
    banner.style.cssText = `
      position:fixed; inset:0; z-index:9999;
      background:#1a1208; color:#f2e8d5;
      font-family:'Special Elite',cursive;
      display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      gap:1rem; padding:2rem; text-align:center;
    `;
    banner.innerHTML = `
      <div style="font-size:2rem">🔒</div>
      <div style="font-size:1.1rem; letter-spacing:0.15em">FIREBASE NOT CONFIGURED</div>
      <div style="font-size:0.8rem; color:#a8957a; max-width:420px; line-height:1.7">
        Open <strong style="color:#f2e8d5">firebase-config.js</strong> and replace the
        placeholder values with your actual Firebase project credentials.
      </div>
    `;
    document.body.appendChild(banner);
  });
}

