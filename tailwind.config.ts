import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        bodoni: ['var(--font-bodoni)', 'Bodoni Moda', 'Didot', 'serif'],
        helvetica: ['"Helvetica LT Pro"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          foreground: 'hsl(var(--brand-foreground))',
          hover: 'hsl(var(--brand-hover))',
          active: 'hsl(var(--brand-active))'
        },
        mint: {
          DEFAULT: 'hsl(var(--mint))',
          foreground: 'hsl(var(--mint-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        // Product-page palettes (/cases/*) — use these tokens, not raw hex.
        // toza — TOZA KO'ZA (wet wipes), green/gold on cream
        toza: {
          ink: '#052439',          // headings
          gold: '#B89A56',         // ornaments, accents
          green: '#084B37',        // hero text, benefit labels
          'green-soft': '#0B7152', // hover
          pine: '#234C43',         // lineup numerals
          body: '#4D5563',         // body text
          gray: '#6E6E6E',         // lineup descriptions
          'gray-deep': '#5C5C5C',  // table values
          cream: '#FAF7F1',        // section background
          ivory: '#FDFBF7',        // design section background
          shell: '#F7F1E8',        // lineup card background
          'card-from': '#FFFDF9',  // card gradient start
          'card-to': '#F2EBDD',    // card gradient end
          sand: '#E6D9C2',         // card borders
          line: '#E6E2D9',         // rings, dividers
          'table-head': '#F2F0EA',
          'table-line': '#E8E4DB',
        },
        // gilam — GILAM PLYÖNKASI (stretch film), brown on warm cream
        gilam: {
          ink: '#2A1A14',
          brown: '#7B4A2C',
          'brown-deep': '#5E3720', // hover
          rust: '#6B2F12',         // feature icons
          body: '#4A4038',
          muted: '#7D7269',
          cream: '#F6F1EA',        // section background
          hero: '#E8E3D4',         // hero background
          card: '#F0E8DF',
          'icon-bg': '#E8D8C7',
          line: '#DDD1C3',
        },
        // dast — DASTURXON PLYÖNKASI (food cling film), navy on cool cream
        dast: {
          ink: '#223B63',
          navy: '#1F426E',
          'navy-deep': '#15314F',  // hover
          body: '#344B68',
          muted: '#6B7A92',
          cream: '#F8F6F2',        // section background
          sky: '#EEF2F8',          // CTA background
          'head-bg': '#E9EEF4',    // table head row
          'row-line': '#E1E5EC',   // table row divider
          line: '#DCE2EA',
          night: '#001532',        // hero background (dark theme)
          lime: '#709921',         // hero accent text + icons
          'lime-deep': '#5C7D1B',  // lime button hover
        },
        // shared CTA button color on the toza & gilam pages
        'amber-cta': '#D49038',
        'amber-cta-deep': '#B97A26', // hover
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
    }
  },
  corePlugins: {
    container: false,
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
