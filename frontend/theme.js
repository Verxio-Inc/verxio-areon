// src/theme.ts
"use client";

import {  Inter} from "next/font/google";
import { createTheme } from "@mui/material/styles";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});


const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export default theme;
