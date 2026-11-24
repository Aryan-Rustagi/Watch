# Chronos — Luxury Watch Showcase

> A luxury mechanical watch. Engineered in silence.

Production-grade Next.js 14 project skeleton configured for a scroll-driven 3D and high-resolution video advertisement experience.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **UI & State**: [React 18](https://react.dev/) + TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with PostCSS & Autoprefixer
- **Motion & Smooth Scroll**: [GSAP](https://greensock.com/gsap/) + [Lenis](https://github.com/darkroomengineering/lenis) + [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Code Quality**: ESLint + Prettier with `prettier-plugin-tailwindcss`

## Project Structure

```
chronos-watch/
├── app/
│   ├── layout.tsx              # root layout with metadata & fonts
│   ├── page.tsx                # home page (empty shell)
│   ├── globals.css             # tailwind directives & base styles
│   └── fonts.ts                # next/font config (Inter + Cormorant Garamond)
├── components/
│   ├── SmoothScroll.tsx        # Lenis smooth scroll provider placeholder
│   ├── Hero/                   # Hero section components
│   ├── Sections/               # Content / narrative sections
│   └── ui/                     # Reusable UI primitives
├── hooks/                      # Custom React hooks
├── lib/
│   ├── frames.ts               # Video/canvas frame sequence helper
│   └── utils.ts                # cn() className utility helper
├── public/
│   ├── frames/
│   │   ├── desktop/            # Desktop frame sequence
│   │   └── mobile/             # Mobile frame sequence
│   ├── audio/                  # Ambient soundscapes & effects
│   └── models/                 # 3D GLB/GLTF models
├── types/
│   └── index.ts                # Shared TypeScript types
├── .env.local.example          # Environment variables template
├── .prettierrc
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── next.config.js
└── package.json
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Frame Pipeline

A fully automated video processing and frame extraction pipeline designed to transform cinematic source clips into high-performance, web-optimized frame sequences.

### Source Video Directory
Place the 5 high-resolution video clips into the `source-videos/` directory:
- `source-videos/clip1.mp4`
- `source-videos/clip2.mp4`
- `source-videos/clip3.mp4`
- `source-videos/clip4.mp4`
- `source-videos/clip5.mp4`

*(Note: Raw video masters and concat manifests are automatically excluded by `.gitignore` to keep the repository lightweight).*

### One-Shot Frame Build
Run the complete automated pipeline end-to-end:
```bash
npm run frames:build
```

### Pipeline Steps & Individual Commands

1. **Continuity Verification (`npm run frames:verify`)**:
   - Extracts the last frame of `clipN` and the first frame of `clip(N+1)`.
   - Computes structural similarity index (SSIM) across all 4 handoffs.
   - Requires SSIM >= 0.90 to pass (warns if between 0.90 and 0.95).

2. **Master Video Concatenation (`npm run frames:stitch`)**:
   - Generates `source-videos/clips.txt` and losslessly concatenates the 5 clips into `source-videos/watch_master.mp4`.
   - Verifies ~50s total duration with `ffprobe`.

3. **Cinematic Color Grading (`npm run frames:grade`)**:
   - Applies custom contrast, saturation, and gold color balance curves (`eq` and `colorbalance` filters).
   - Encodes high-fidelity master: `source-videos/watch_graded.mp4` (H.264, CRF 16, slow preset).

4. **Multi-Resolution Frame Extraction (`npm run frames:extract`)**:
   - Desktop: 24 fps, 1920px wide, quality 82 WebP (`public/frames/desktop/frame_%04d.webp`).
   - Mobile: 14 fps, 1080px wide, quality 78 WebP (`public/frames/mobile/frame_%04d.webp`).

5. **Low-Quality Image Placeholder (`npm run frames:lqip`)**:
   - Downsamples initial desktop frame to 40px wide at quality 50 WebP (`public/frames/desktop/lqip.webp`, <2KB).

