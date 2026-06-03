# Rugscope

Rugscope helps you spot token risk while you browse crypto trading pages. It looks for the token on the page, checks public market and risk data, shows a TradingView-style chart, and marks tracked wallet trades on the candle where they happened.

## Try The Website

```powershell
npm run dev
```

Then open `http://localhost:5173`.

## Install Rugscope

1. Unzip `downloads/rugscope-extension.zip`.
2. Open `chrome://extensions`.
3. Turn on Developer mode. Chrome uses this switch for extensions you add manually.
4. Click Load unpacked.
5. Select the unzipped extension folder.

## How It Works

Open `docs.html` in the website, or visit `http://localhost:5173/docs.html` while the dev server is running.

Rugscope scans public page text and URLs for crypto contract or mint addresses. It sends detected addresses to public market and risk APIs so it can create the report. It does not read wallet keys, seed phrases, passwords, cookies, or private messages.

You can also add wallet addresses to track. Rugscope will mark matching buys and sells on the token chart and show Chrome alerts for newly seen tracked-wallet trades while the extension is running.

The on-page Rugscope panel is movable and resizable. Drag the top of the panel to move it, and use the lower-right handle to change its size.

Rugscope is an informational risk scanner, not financial advice.
