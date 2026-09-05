# Weather Intelligence App

A modern, responsive web application for searching city weather, viewing 7-day forecasts, and getting smart activity recommendations. Built using Google AI Studio App Build and public Open-Meteo APIs.

---

## 1. Google AI Studio to GitHub Integration

1. **App Generation:** The application source code was built inside **Google AI Studio App Build** using React, Vite, and Tailwind CSS.
2. **Direct GitHub Sync:** 
   - Clicked the **GitHub** connection option directly within Google AI Studio.
   - Authorized GitHub access and selected the repository: `jagadeeshwarkorra-source/weather-intelligence-app`.
   - Pushed the generated source files directly to the target GitHub repository root.
3. **Repository Verification:** Confirmed that `package.json`, `src/`, `vite.config.ts`, and `README.md` are present in the primary branch.

---

## 2. Cloudflare Pages Deployment Instructions

1. **Connect Cloudflare to GitHub:**
   - Logged into the **Cloudflare Dashboard** and navigated to **Workers & Pages**.
   - Selected **Create Application** > **Pages** > **Connect to Git**.
   - Selected the GitHub repository `jagadeeshwarkorra-source/weather-intelligence-app`.

2. **Build Configuration:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Build Output Directory:** `dist`
   - **Production Branch:** `main`

3. **Deploy & Validate:**
   - Triggered **Save and Deploy**.
   - Monitored the deployment log until completion.
   - Accessed the live production app via the generated `*.pages.dev` URL.

---

## 3. API Endpoints Used

- **Geocoding API:** `https://geocoding-api.open-meteo.com/v1/search`
- **Forecast API:** `https://api.open-meteo.com/v1/forecast`

---

## 4. Features & Verification
- **Valid City Search:** Verified using cities such as *Chennai* and *London*.
- **Error Handling:** Verified using invalid strings (e.g., *InvalidCityXYZ*) to display graceful "City not found" error messages.
