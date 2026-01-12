# Claude Assistant for Excel

A simple Excel add-in that lets you ask Claude questions about your spreadsheet data.

## What It Does

- **Select & Ask**: Highlight cells in Excel and ask Claude to analyze them
- **Natural Language**: Ask questions in plain English (or any language)
- **Smart Analysis**: Claude can find patterns, errors, create formulas, and more
- **Live Integration**: Works directly in Excel's task pane

## Features

✅ Analyze selected data
✅ Find errors and anomalies  
✅ Generate Excel formulas
✅ Summarize data in plain language
✅ Get insights and recommendations

## Setup Instructions

### Prerequisites

1. **Excel for Mac** (Office 365 or Excel 2016+)
2. **Node.js** installed (for local development server)
3. **Anthropic API Key** (get from https://console.anthropic.com)

### Installation Steps

#### 1. Install Dependencies

```bash
cd /path/to/excel-claude-addin
npm install
```

#### 2. Start the Development Server

```bash
npm start
```

You should see:
```
✅ Excel Claude Add-in server running at http://localhost:3000
```

#### 3. Load Add-in in Excel

**On Mac:**

1. Open Excel
2. Go to **Insert** tab → **Add-ins** → **Get Add-ins**
3. Click **My Add-ins** at the top
4. Click **Upload My Add-in** (at the bottom)
5. Browse to `manifest.xml` in this folder
6. Click **Upload**

The add-in should now appear in your Excel ribbon under the **Home** tab.

#### 4. Use the Add-in

1. Click the **Ask Claude** button in the Excel ribbon
2. A task pane will open on the right
3. Enter your Anthropic API key (it will be saved locally)
4. Select some cells in your spreadsheet
5. Ask Claude a question
6. Get instant analysis!

## Example Use Cases

### 1. Data Summarization
**Select:** A column of sales numbers  
**Ask:** "What's the average, and are there any outliers?"

### 2. Error Detection
**Select:** A range with formulas  
**Ask:** "Find any errors or anomalies in this data"

### 3. Formula Generation
**Select:** Two columns (price and quantity)  
**Ask:** "Create a formula to calculate total revenue"

### 4. Pattern Analysis
**Select:** Monthly revenue data  
**Ask:** "What trends do you see in this data?"

### 5. Data Explanation
**Select:** Complex financial data  
**Ask:** "Explain what this data represents in simple terms"

## How It Works

1. **Selection**: The add-in tracks which cells you select
2. **API Call**: When you ask a question, it sends the selected data + your question to Claude
3. **Response**: Claude analyzes the data and returns insights
4. **Display**: The response appears in the task pane

## Technical Details

- **Model**: Claude Sonnet 4 (claude-sonnet-4-20250514)
- **Max Tokens**: 2000 per request
- **API**: Anthropic Messages API (direct integration)
- **Storage**: API key stored in browser localStorage (never sent to Prairie Forge)

## Pricing

- The add-in itself is **free**
- You pay Anthropic directly for Claude API usage
- Claude Sonnet 4 costs ~$3 per million input tokens, ~$15 per million output tokens
- Typical query: <$0.01

## Privacy & Security

✅ Your API key is stored **locally** in your browser  
✅ Data is sent **directly** to Anthropic (not through Prairie Forge)  
✅ No data is logged or stored by Prairie Forge  
✅ All communication uses HTTPS

## Troubleshooting

### Add-in doesn't load
- Make sure the dev server is running (`npm start`)
- Check that you're using `http://localhost:3000` in manifest.xml
- Try reloading Excel

### API key error
- Verify your API key from https://console.anthropic.com
- Make sure you have API credits available
- Check for typos in the key

### Selection not detected
- Make sure you've selected cells **before** clicking "Ask Claude"
- The selection info should update automatically
- Try selecting again

### CORS errors (in production)
- For production deployment, you'll need proper HTTPS
- Use a service like Vercel, Netlify, or Azure
- Update manifest.xml with your production URL

## Development

### Project Structure

```
excel-claude-addin/
├── manifest.xml         # Office Add-in manifest
├── taskpane.html        # Main UI (task pane)
├── commands.html        # Function file (required)
├── server.js           # Local dev server
├── package.json        # Node.js dependencies
└── README.md          # This file
```

### Making Changes

1. Edit `taskpane.html` for UI or logic changes
2. Save the file
3. Refresh the task pane in Excel (right-click → Reload)

### Deploying to Production

1. Host files on HTTPS server (Vercel, Netlify, Azure Static Web Apps)
2. Update manifest.xml URLs to your production domain
3. Use proper SSL certificates
4. Distribute manifest.xml to users

## Next Steps / Ideas

### Potential Enhancements

1. **Write to Cells**: Let Claude write results back to Excel
2. **Saved Prompts**: Store frequently used prompts
3. **Team Templates**: Share prompt libraries across teams
4. **Multi-Sheet Analysis**: Analyze data across worksheets
5. **Custom Functions**: Create Excel functions that call Claude
6. **Batch Processing**: Analyze multiple ranges at once
7. **Export Reports**: Generate formatted reports based on analysis

### Business Applications

- **Financial Analysis**: Variance analysis, journal entry validation
- **Sales Data**: Trend analysis, forecasting insights
- **Operations**: Identify bottlenecks, optimize workflows
- **Data Cleaning**: Find errors, suggest corrections
- **Report Generation**: Summarize data for stakeholders

## Support

For issues or questions:
- Email: connect@prairieforge.ai
- Website: https://prairieforge.ai

## License

MIT License - feel free to modify and use for your own projects!

---

Built with ❤️ by Prairie Forge
