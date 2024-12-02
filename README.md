# Website Screenshot and Metadata Capture

A Node.js tool that captures screenshots and metadata from websites using Playwright.

## Features

- Takes full-page screenshots of websites
- Captures website metadata (title, description)
- Organizes captures by domain name
- Saves metadata in JSON format

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd playwright-screenshot
```

2. Install dependencies:
```bash
npm install
```

## Usage

Run the script with a URL:
```bash
node index.js https://example.com
```

### Output

The script will create a folder named after the website's domain (e.g., `example.com`) containing:

1. A screenshot file (`screenshot-[timestamp].png`)
2. A metadata file (`site.json`) with:
   - Website title
   - Meta description
   - URL
   - Capture timestamp

### Example

```bash
node index.js https://vercel.com
```

This will create:
```
vercel.com/
├── screenshot-2024-12-02T06-57-23-776Z.png
└── site.json
```

## Dependencies

- playwright: Web automation library
- Node.js built-in modules (fs, path)
