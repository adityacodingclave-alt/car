# BAIC UAE Homepage Clone

A Next.js recreation of the [baicuae.com](https://baicuae.com/) homepage.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm start
```

## What's included

- **Homepage only** (`/`) — header, hero slider, car models, innovation/future/ability sections, connected vehicle, vision, overview, distributor, feature services, test drive form, and footer
- **Live API data** from `baicserver.baicuae.com` with local JSON fallbacks in `src/data/`
- **Static assets** from the original site in `public/images/`
- **Fonts**: Poppins & Roboto (matching the original)

## Project structure

```
src/
  app/           # Next.js App Router (layout, page, globals.css)
  components/    # Header, HeroSlider, CarModels, Footer, etc.
  data/          # Fallback JSON from BAIC API
  lib/           # API helpers and fetch utilities
public/images/   # Background images, car animations, banners
```
