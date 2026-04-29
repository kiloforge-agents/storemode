# StoreMode

Mobile-first web app with **in-store mode** — using the device camera, GPS, and BLE to overlay digital maps, promotions, and step-by-step navigation onto physical retail spaces.

Consumers now rank app experiences as the #1 in-store UX enhancer (above AI agents). Most retailers haven't caught up. StoreMode is the missing layer between the digital shelf and the physical one.

## What's in this repo

- **`/`** — Marketing landing page with the live phone-framed demo.
- **`/app`** — Full-screen interactive demo (mobile) / framed demo (desktop).
- **`components/InStoreApp.tsx`** — The end-to-end app: home, AR view, map view, list view, product detail sheet, bottom nav.
- **`components/ARView.tsx`** — Simulated AR camera viewport with reticle, floating product overlays, perspective floor decals, scan-line, and bearing-based nav arrow.
- **`components/StoreMap.tsx`** — Hand-drawn vector floor plan with aisles, promotion zones, walking-route renderer, and live user marker.
- **`lib/store-data.ts`** — Demo data: store, aisles, products, promotions, saved lists.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS 4 (custom theme tokens, dot-grid + grain utilities, AR animations)
- Framer Motion
- Lucide icons

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Notes

The AR experience is a high-fidelity simulation. In a production build, the same components would consume:

- `navigator.geolocation` for outdoor positioning
- `getUserMedia` for the live camera feed
- Web Bluetooth / proprietary SDK for in-store beacons
- WebXR or AR.js for fixture-anchored overlays

The components are structured so those data sources slot in cleanly behind the existing visual layer.
