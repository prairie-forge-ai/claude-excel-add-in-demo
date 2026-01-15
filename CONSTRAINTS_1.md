# Project Constraints & Design Principles

**Last Updated:** January 14, 2026  
**Project:** Excel AI Assistant (working title)  
**Owner:** Prairie Forge LLC  
**Distribution:** Microsoft AppSource Marketplace (Public)

---

## 🎯 Project Vision

**What:** AI-powered Excel assistant for general productivity  
**Who:** Any Excel user (not company-specific)  
**How:** Claude AI + Vector Database + Marketplace distribution  
**Why:** Professional-grade Excel help that understands business context

**Value Proposition:**
> "Your Excel AI assistant that knows what you need - whether that's formula help, workbook validation, data insights, or formatting. Built by people who understand business workflows, with embedded expertise in the instructions."

---

## 🚨 Critical Constraints - Phase 1 Priorities

### 1. GATING & MONETIZATION (HIGHEST PRIORITY)
**Rule:** User access and payment must be bulletproof  
**Why:** This is a paid product on a public marketplace

**Required Architecture:**
```
User Flow:
1. Download from AppSource (free)
2. Launch add-in → Gate screen
3. Trial: 7-day free trial (or X uses)
4. Payment: Stripe/Paddle integration
5. Validation: Check subscription status on every launch
6. Expiry: Graceful degradation when subscription ends
```

**Implementation Requirements:**
- [ ] License key system OR subscription API
- [ ] Trial period tracking (client + server-side)
- [ ] Payment integration (Stripe recommended)
- [ ] Subscription validation endpoint
- [ ] Offline grace period (24-48 hours)
- [ ] Clear upgrade/renewal prompts
- [ ] Refund handling

**Technical Spec:**
```javascript
// On every add-in launch
const userStatus = await validateSubscription(userId);

if (userStatus === 'trial') {
  showTrialBanner(daysRemaining);
} else if (userStatus === 'expired') {
  showPaymentGate();
  return; // Block access
} else if (userStatus === 'active') {
  proceedToApp();
}
```

**Database Schema:**
```sql
users (
  id, email, created_at,
  subscription_status, -- 'trial', 'active', 'expired', 'canceled'
  trial_ends_at,
  subscription_ends_at,
  stripe_customer_id
)

usage_logs (
  user_id, action, timestamp,
  ai_tokens_used
)
```

---

### 2. AI-FIRST ARCHITECTURE (CORE FEATURE)
**Rule:** Every feature routes through Claude AI with vector-based knowledge  
**Why:** The AI IS the product - it must be exceptional

**Required Components:**

**A. Vector Knowledge Base**
```
knowledge_vectors (
  id, content_type, category,
  title, content,
  embedding VECTOR(1536),
  metadata JSONB,
  created_at
)

Categories:
- 'formula-help'      → Excel function explanations
- 'best-practices'    → Formatting, structure, organization
- 'common-patterns'   → Business formulas, templates
- 'troubleshooting'   → Error solutions
- 'data-analysis'     → Analytical techniques
- 'visualization'     → Chart/graph recommendations
```

**B. Context-Aware System**
```javascript
// Every AI call includes:
{
  user_query: "Help me analyze this data",
  workbook_context: {
    sheet_name: "Sales Data",
    selected_range: "A1:D100",
    cell_values: [...],
    formulas_present: true,
    data_types: ['text', 'number', 'date'],
    patterns_detected: ['time_series', 'categories']
  },
  user_intent: 'analysis', // or 'formula', 'validation', 'formatting'
  retrieved_knowledge: [...] // From vector search
}
```

**C. Quality Requirements**
- Response time: <3 seconds for 95% of queries
- Token efficiency: Avg <2,000 tokens per interaction
- Accuracy: User satisfaction >4.5/5 stars
- Context retention: Remember last 5 interactions per session

---

### 3. MODULE STRUCTURE (NOT CLIENT-SPECIFIC)
**Rule:** Organize by task type, not business function  
**Why:** General users need general categories

**Module Categories:**

```
Module Selector (Hub)
├── Formula Assistant
│   ├── Generate formulas from description
│   ├── Explain existing formulas
│   ├── Debug formula errors
│   └── Optimize complex calculations
│
├── Workbook Validator
│   ├── Find errors and inconsistencies
│   ├── Check data quality
│   ├── Identify broken references
│   └── Suggest improvements
│
├── Data Insights
│   ├── Analyze patterns and trends
│   ├── Statistical summaries
│   ├── Outlier detection
│   └── Visualization recommendations
│
├── Formatting Helper
│   ├── Apply professional formatting
│   ├── Conditional formatting rules
│   ├── Table/chart styling
│   └── Cleanup and organization
│
└── Smart Templates
    ├── Budget templates
    ├── Project trackers
    ├── Data analysis sheets
    └── Report formats
```

**Anti-Pattern:** Don't build "Payroll Module" or "PTO Tracker" - keep it generic!

---

## 🎨 Design System Rules

### Colors (Same Dark Theme)
**Primary Palette:**
- Primary: `#2E30C9` (blue) - AI accent color
- Success: `#10B981` (green)
- Error: `#EF4444` (red)
- Warning: `#F59E0B` (amber)
- AI Highlight: `#8B5CF6` (purple) - for AI-generated content

**Surfaces:**
- Background: `linear-gradient(145deg, #000000, #1a1a2e)`
- Cards: `rgba(5, 7, 24, 0.45)` + `backdrop-filter: blur(20px)`
- Text Primary: `#F5F5F7`
- Text Secondary: `#C9C9D6`

**Rule:** Define once in `Common/design-tokens.css`, reference everywhere

---

### Typography
**Families:**
- UI: Inter (system fonts fallback)
- Monospace: 'Monaco', 'Courier New' (for formulas)

**Sizes:** 12px, 14px, 16px, 20px, 24px, 32px  
**Rule:** No arbitrary sizes

---

### Spacing Scale
**Base unit:** 4px  
**Scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

---

## 📁 File Structure

```
excel-ai-assistant/
├── CONSTRAINTS.md              ← This file
├── README.md
├── manifest.xml
├── DEPLOYMENT.md              ← AppSource submission guide
├── MONETIZATION.md            ← Payment/licensing logic
│
├── Common/
│   ├── design-tokens.css      ← ALL colors, fonts, spacing
│   ├── components/
│   │   ├── Card.js
│   │   ├── Button.js
│   │   ├── AIResponse.js      ← AI response formatter
│   │   ├── TrialBanner.js     ← Trial/subscription UI
│   │   └── PaymentGate.js     ← Payment required screen
│   └── utilities.css
│
├── gate/                       ← NEW: Access control
│   ├── index.html             ← License/subscription check
│   ├── trial.html             ← Trial signup
│   └── payment.html           ← Upgrade prompt
│
├── modules/
│   ├── hub/                   ← Module selector
│   ├── formula-assistant/
│   ├── workbook-validator/
│   ├── data-insights/
│   ├── formatting-helper/
│   └── templates/
│
├── ai/
│   ├── claude-integration.js  ← Claude API wrapper
│   ├── vector-search.js       ← Supabase vector queries
│   ├── context-builder.js     ← Workbook context extraction
│   └── system-prompts/        ← Category-specific prompts
│       ├── base.txt
│       ├── formula.txt
│       ├── validation.txt
│       ├── analysis.txt
│       └── formatting.txt
│
├── supabase/
│   ├── migrations/            ← Database schema
│   └── functions/             ← Edge functions
│       ├── validate-subscription/
│       ├── claude-chat/
│       └── vector-search/
│
└── assets/
    └── icons/
```

---

## 🔐 Security & Privacy Constraints

### User Data
**Rule:** NEVER store user spreadsheet data on our servers  
**Why:** Privacy concerns, legal liability, storage costs

**What We Store:**
- ✅ User email, subscription status
- ✅ Usage metrics (# of queries, features used)
- ✅ AI conversation metadata (not content)
- ✅ Vector embeddings of our knowledge base (not user data)

**What We DON'T Store:**
- ❌ Spreadsheet cell values
- ❌ File names or structure
- ❌ Business data or formulas
- ❌ AI conversation content (beyond 24 hours)

**Implementation:**
```javascript
// AI call structure
await sendToAI({
  context: workbookContext,  // Sent to Claude, not stored
  query: userQuery,          // Sent to Claude, not stored
  user_id: userId            // For billing only
});

// After response, log only:
await logUsage({
  user_id: userId,
  feature: 'formula-assistant',
  tokens_used: 1847,
  timestamp: Date.now()
  // NO content stored
});
```

---

## 💰 Monetization Constraints

### Pricing Model (To Be Determined)
**Options under consideration:**
1. Subscription: $X/month (unlimited use)
2. Token-based: Pay per AI query
3. Hybrid: Free tier + paid premium

**Requirements Regardless of Model:**
- [ ] Clear pricing on landing page
- [ ] Transparent usage tracking
- [ ] Easy upgrade/downgrade
- [ ] Refund policy (30 days recommended)
- [ ] Student/education discounts?

### Trial Period
**Recommended:** 7-day free trial OR 50 AI queries (whichever first)

**Implementation:**
```javascript
const canUseFeature = await checkAccess(userId);

if (!canUseFeature.allowed) {
  if (canUseFeature.reason === 'trial_expired') {
    showPaymentGate({
      message: "Your 7-day trial has ended",
      cta: "Upgrade to continue"
    });
  } else if (canUseFeature.reason === 'quota_exceeded') {
    showPaymentGate({
      message: "You've used all 50 trial queries",
      cta: "Upgrade for unlimited access"
    });
  }
  return;
}

// Proceed with AI call
await processAIQuery();
```

---

## 🚫 Anti-Patterns from ForgeSuite

### ❌ Don't Repeat These Mistakes

**1. Scattered Styles**
```
❌ Each module with duplicate CSS (thousands of lines)
✅ One design-tokens.css (~200 lines)
✅ Module CSS files <300 lines each
```

**2. Hardcoded Colors**
```css
❌ background: #2E30C9;
✅ background: var(--primary-color);
```

**3. Client-Specific Features**
```
❌ "Payroll Recorder for Company X"
✅ "Formula Assistant" (works for anyone)
```

**4. No Reusable Components**
```
❌ Copy-paste card HTML 15 times
✅ <Card> component used everywhere
```

**5. Poor AI Context**
```
❌ "You are Ada, helping with payroll" (too specific)
✅ "You are an Excel AI assistant helping users with [task]" (generic)
```

---

## ✅ Success Criteria

### Before Alpha Launch
- [ ] Gating system works (trial → payment flow)
- [ ] AI responses are helpful >90% of time
- [ ] All 5 modules functional
- [ ] Color-change test passes
- [ ] Works on Windows + Mac + Web Excel

### Before AppSource Submission
- [ ] Privacy policy live
- [ ] Support page live
- [ ] Payment integration tested
- [ ] Manifest validated
- [ ] Screenshots at 1366x768
- [ ] Icons: 32x32 and 64x64
- [ ] Test account credentials ready

### Post-Launch Metrics
- [ ] User satisfaction: >4.5/5 stars
- [ ] AI response time: <3 seconds (95th percentile)
- [ ] Trial-to-paid conversion: >15%
- [ ] Monthly active users: Track growth
- [ ] AI cost per user: <$2/month

---

## 🎯 Quality Gates

### Before Merging Any Code
- [ ] No hardcoded colors (except design-tokens.css)
- [ ] No duplicate components
- [ ] Module CSS <500 lines
- [ ] AI integration tested manually
- [ ] Subscription check works

### Before Each Release
- [ ] Color test passes (change primary → all updates)
- [ ] Trial expiry tested
- [ ] Payment flow tested (test Stripe mode)
- [ ] AI responses reviewed for quality
- [ ] No user data stored inappropriately
- [ ] Works in Excel (Windows + Mac + Web)

---

## 🤖 AI-Specific Constraints

### Claude Integration
**Model:** Claude Sonnet 4 (claude-sonnet-4-20250514)  
**Max Tokens:** 4,000 per request  
**API Key:** Stored as `ANTHROPIC_API_KEY` environment variable

**System Prompt Structure:**
```
Base Prompt (always)
  +
Category Prompt (formula/validation/analysis/formatting)
  +
Retrieved Knowledge (from vectors)
  +
Workbook Context (live Excel data)
  +
User Query
```

**Cost Management:**
- Average query target: <2,000 tokens
- Monitor high-cost users
- Implement rate limiting if needed
- Cache common responses (e.g., "what is VLOOKUP")

### Vector Database
**Provider:** Supabase pgvector  
**Embedding Model:** text-embedding-3-small (OpenAI)  
**Similarity Threshold:** 0.7  
**Results per query:** Top 3 matches

**Knowledge Base Size Target:** 500-1,000 articles covering:
- All Excel functions (400+)
- Common formulas (100+)
- Best practices (50+)
- Error solutions (100+)
- Data analysis techniques (50+)

---

## 📚 Documentation Requirements

### For Users
- [ ] Getting Started guide
- [ ] FAQ (20+ questions)
- [ ] Video tutorials (5+ videos)
- [ ] Formula cheat sheet
- [ ] Privacy policy
- [ ] Terms of service

### For Development
- [ ] API documentation (Supabase + Claude)
- [ ] Component library docs
- [ ] Deployment guide (AppSource)
- [ ] Database schema docs
- [ ] Troubleshooting guide

---

## 🔄 Development Workflow

### Phase 1: Foundation (Week 1-2)
1. Set up gating system (trial + payment)
2. Build design system (tokens + components)
3. Create module hub UI
4. Integrate Claude API
5. Build vector database

### Phase 2: Core Features (Week 3-4)
1. Formula Assistant (priority #1)
2. Workbook Validator
3. Data Insights
4. Formatting Helper

### Phase 3: Polish (Week 5)
1. Templates library
2. Onboarding flow
3. Help documentation
4. Performance optimization

### Phase 4: Launch (Week 6)
1. AppSource submission
2. Landing page
3. Support infrastructure
4. Marketing materials

---

## 🎨 Brand Guidelines

### Voice & Tone
- **Professional but friendly**
- **Helpful, not condescending**
- **Clear, not jargon-heavy**
- **Confident about AI capabilities**

**Example Microcopy:**
```
❌ "AI is thinking..." (too robotic)
✅ "Analyzing your data..." (clear action)

❌ "Error: Invalid input" (unhelpful)
✅ "I need a range of cells to analyze. Please select some cells and try again."

❌ "Purchase required" (harsh)
✅ "Your trial has ended. Upgrade to keep using AI-powered features."
```

---

## 🌍 Localization (Future)

**Not for V1, but plan for:**
- [ ] String externalization
- [ ] Multi-language support
- [ ] Date/number formatting per locale
- [ ] Currency symbols

**Implementation:**
```javascript
// Prepare for localization
const strings = {
  'en': { greeting: 'Hello', ... },
  'es': { greeting: 'Hola', ... }
};
```

---

## 📊 Analytics & Telemetry

### What We Track
- ✅ Feature usage (which modules)
- ✅ AI query categories
- ✅ Trial conversion rates
- ✅ Error rates
- ✅ Performance metrics

### What We Don't Track
- ❌ Actual spreadsheet content
- ❌ Business data
- ❌ Personal information beyond email

**Implementation:**
```javascript
// Simple event tracking
await logEvent({
  user_id: userId,
  event: 'feature_used',
  feature: 'formula-assistant',
  success: true,
  response_time_ms: 2847
});
```

---

## 🚀 AppSource Requirements

### Manifest Requirements
- Version: Semantic versioning (1.0.0)
- Provider: Prairie Forge LLC
- Icons: 32x32, 64x64 (exact sizes)
- Privacy URL: Required
- Support URL: Required
- Description: <500 characters

### Screenshots
- Size: Exactly 1366 x 768 pixels
- Count: 5 recommended
- Content: Show key features
- No text overlays
- Professional quality

### Testing Notes Template
```
TEST ACCOUNT:
Email: test@prairieforge.ai
Trial: Automatically activated on first use

TESTING INSTRUCTIONS:
1. Launch add-in from Excel ribbon
2. Sign up with any email (trial starts automatically)
3. Try each module from the hub
4. AI features will respond (test mode uses lower token limits)
5. Payment gate appears after trial expires (test with Stripe test mode)

For questions: connect@prairieforge.ai
```

---

## 🤝 For AI Agents Working on This Project

**When you start work:**
1. Read this file FIRST
2. Check if feature/component already exists
3. Reference design tokens, never hardcode
4. Consider gating/payment implications
5. Test AI integration thoroughly

**Before committing:**
1. Run color-change test
2. Verify no hardcoded values
3. Check subscription logic works
4. Test on at least one Excel platform
5. Update this doc if adding constraints

---

## 📞 Contact & Resources

**Project Owner:** DJ Paeth  
**Company:** Prairie Forge LLC  
**Email:** connect@prairieforge.ai  
**Website:** https://prairieforge.ai  
**GitHub:** https://github.com/prairie-forge-ai/[project-name]

---

## 📝 Version History

| Date | Change | Reason |
|------|--------|--------|
| 2026-01-14 | Initial constraints | New AI-powered add-in, lessons from ForgeSuite |

---

## 🎯 TL;DR - Top 5 Rules

1. **💰 Gating First** - Build subscription system before features
2. **🤖 AI is Core** - Every feature routes through Claude + vectors
3. **🎨 Centralize Everything** - One design-tokens.css file
4. **🔐 Privacy Paramount** - Never store user spreadsheet data
5. **📦 Generic, Not Custom** - Build for any Excel user, not one company

---

*This is a living document. Update as the project evolves.*
