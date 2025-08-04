/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      fontSize: {
        xxxl: [
          "24px",
          {
            lineHeight: "150%",
          },
        ],
        xxl: [
          "22px",
          {
            lineHeight: "150%",
          },
        ],
        xl: [
          "20px",
          {
            lineHeight: "150%",
          },
        ],
        lg: [
          "18px",
          {
            lineHeight: "150%",
          },
        ],
        md: [
          "16px",
          {
            lineHeight: "150%",
          },
        ],
        sm: [
          "14px",
          {
            lineHeight: "150%",
          },
        ],
        xs: [
          "12px",
          {
            lineHeight: "150%",
          },
        ],
        xxs: [
          "10px",
          {
            lineHeight: "120%",
          },
        ],
        xxxs: [
          "8px",
          {
            lineHeight: "110%",
          },
        ],
      },
      fontWeight: {
        bold: "700",
        semibold: "600",
        medium: "500",
        regular: "400",
      },
      colors: {
        gray: {
          5: "#F7F7F8",
          10: "#E9E9ED",
          20: "#CDCDD6",
          30: "#B0B0BF",
          40: "#9494A8",
          50: "#787891",
          60: "#606076",
          70: "#49495A",
          80: "#32323E",
          85: "#272730",
          90: "#1C1C22",
        },
        sub: {
          10: "#E5F2FF",
          sub: "#007AFF",
        },
        metro: {
          KA: "#0090D1",
          S: "#D4013B",
          UI: "#B0CE1A",
          rail1: "#77C4A3",
          rail2: "#F5A202",
          rail4: "#0C8E71",
          line1: "#0032A0",
          line2: "#00B140",
          line3: "#FC4C02",
          line4: "#00A9E0",
          line5: "#A05EB5",
          line6: "#A9431E",
          line7: "#67823A",
          line8: "#E31C79",
          line9: "#BB8336",
        },
        kakao: {
          yellow: "#FEE500",
          black: "#1E1E20",
        },
        error: "#D4013B",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      height: {
        "screen-dvh": "100dvh",
      },
      boxShadow: {
        bt01: "0px -4px 24px 0px rgba(28, 28, 34, 0.10)",
        pin01: "0px 0px 24px 0px rgba(28, 28, 34, 0.25)",
        pin02: "0px 4px 8px 0px rgba(28, 28, 34, 0.15)",
        list: "0px 0px 16px 0px rgba(0, 0, 0, 0.05)",
        back: "0px 0px 32px 0px rgba(28, 28, 34, 0.20)",
        box: "0 0 12px 0 rgba(28, 28, 34, 0.14)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
