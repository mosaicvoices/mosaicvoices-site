Assets downloaded from Figma

This folder currently contains a manifest (`manifest.json`) that lists temporary Figma-hosted asset URLs.

Important:
- The URLs in `manifest.json` are short-lived (approximately 7 days). Download the files now to keep permanent copies.
- After downloading, save the files in this folder (use the `name` from the manifest) and update `styles.css` and `index.html` to reference the local files instead of the Figma URLs.

How to download (PowerShell):

```powershell
Invoke-WebRequest -Uri "https://www.figma.com/api/mcp/asset/1423ee59-a5c2-452f-8630-0b97514e1d68.png" -OutFile mosaic-pattern.png
Invoke-WebRequest -Uri "https://www.figma.com/api/mcp/asset/59c7b242-962a-4052-8b8d-6c313cd4c874.png" -OutFile hero-1.png
Invoke-WebRequest -Uri "https://www.figma.com/api/mcp/asset/11027f94-2b29-456b-ab7a-1be5a63c9049.png" -OutFile hero-2.png
Invoke-WebRequest -Uri "https://www.figma.com/api/mcp/asset/e51330f4-6987-42a7-9fd7-00ddbf9b7709.png" -OutFile hero-3.png
Invoke-WebRequest -Uri "https://www.figma.com/api/mcp/asset/a0c5a552-807a-460a-abd6-e4d5fb8a813e.png" -OutFile hero-4.png
```

After downloading, open `styles.css` and replace the `--mosaic-bg` URL and any inline `background-image` URLs in `index.html` to point to the local files (e.g. `assets/mosaic-pattern.png`).
