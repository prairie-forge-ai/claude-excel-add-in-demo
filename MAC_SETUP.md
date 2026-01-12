# Mac Installation Guide - Claude for Excel

Quick start guide for macOS users.

## Prerequisites

✅ Excel for Mac (Office 365 or Excel 2016+)  
✅ Node.js installed  
✅ Anthropic API key

## Step-by-Step Setup

### 1. Check if Node.js is Installed

Open Terminal and run:
```bash
node --version
```

If you see a version number (like `v20.x.x`), you're good!

If not, install Node.js:
```bash
# Using Homebrew (recommended)
brew install node

# Or download from: https://nodejs.org
```

### 2. Navigate to the Add-in Folder

```bash
cd ~/Downloads/excel-claude-addin
# (or wherever you saved it)
```

### 3. Install Dependencies

```bash
npm install
```

This installs Express (the web server).

### 4. Start the Server

```bash
npm start
```

You should see:
```
✅ Excel Claude Add-in server running at http://localhost:3000
```

**Keep this Terminal window open!** The server needs to run while you use the add-in.

### 5. Load the Add-in in Excel

#### Option A: Via Insert Tab (Recommended)

1. Open Excel for Mac
2. Click **Insert** tab in the ribbon
3. Click **Add-ins** → **Get Add-ins**
4. Click **My Add-ins** (top tabs)
5. Click **Upload My Add-in** (bottom)
6. Navigate to the add-in folder
7. Select `manifest.xml`
8. Click **Upload**

#### Option B: Via Add-in Menu

1. Open Excel for Mac
2. Go to **Tools** → **Excel Add-ins**
3. Click **Browse** or **+** button
4. Select `manifest.xml`
5. Click **OK**

### 6. Find the Add-in Button

After loading:
- Look for **Claude** group in the **Home** tab
- Click **Ask Claude** button
- A task pane opens on the right side

### 7. Get Your API Key

1. Go to https://console.anthropic.com
2. Sign in (or create account)
3. Click **API Keys** in the left sidebar
4. Click **Create Key**
5. Copy the key (starts with `sk-ant-...`)

### 8. Use the Add-in!

1. Paste your API key in the task pane
2. Select some cells in Excel
3. Type a question like: "Summarize this data"
4. Click **Ask Claude**
5. Get instant analysis!

## Quick Test

Try this to verify everything works:

1. In Excel, enter these values:
   ```
   A1: Product    B1: Sales
   A2: Widget     B2: 1500
   A3: Gadget     B3: 2300
   A4: Doohickey  B4: 1100
   ```

2. Select cells A1:B4

3. In the add-in, ask: **"Which product has the highest sales?"**

4. Claude should respond with "Gadget" and explain why!

## Common Issues

### "Add-in not loading"
- ✅ Check Terminal - is the server still running?
- ✅ Restart the server: Ctrl+C, then `npm start`
- ✅ Reload Excel

### "Cannot find module 'express'"
- Run: `npm install` in the add-in folder

### "Port 3000 already in use"
- Close other applications using port 3000
- Or edit `server.js` to use a different port (e.g., 3001)
- Update manifest.xml URLs to match

### "API key invalid"
- Double-check your key from console.anthropic.com
- Make sure you have API credits
- Try generating a new key

### "Selection not detected"
- Select cells BEFORE asking Claude
- The task pane should show: "Selected: A1:B4 (4×2 = 8 cells)"
- If not, try selecting again

## Stopping the Server

When you're done:
1. Go to the Terminal window
2. Press `Ctrl + C`
3. Server stops

## Running Again Later

Next time you want to use the add-in:

1. Open Terminal
2. `cd` to the add-in folder
3. Run `npm start`
4. Open Excel
5. The add-in should still be loaded (if not, upload manifest.xml again)

## Uninstalling

To remove the add-in:

1. In Excel, go to **Insert** → **Add-ins**
2. Click **My Add-ins**
3. Find "Claude Assistant"
4. Click the **...** menu → **Remove**

Or:

1. Go to **~/Library/Containers/com.microsoft.Excel/Data/Documents/wef**
2. Delete the manifest.xml file

## Next Steps

### Try These Prompts

- "Find any blank cells or errors"
- "Calculate the average and show outliers"
- "Create a SUM formula for this column"
- "What patterns do you see in this data?"
- "Suggest improvements to this spreadsheet"

### Enhance the Add-in

- Add your company logo to the UI
- Create custom prompt templates for your team
- Build saved prompts for common tasks
- White-label it for clients

## Need Help?

- Email: connect@prairieforge.ai
- The server Terminal window shows errors if something breaks
- Check the Console in Developer Tools (Excel → Developer → Console)

---

🎉 **You're ready!** Start asking Claude about your Excel data.
