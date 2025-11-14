# Testing the Toxicity Moderation Function

## Method 1: Test the Edge Function Directly (After Deployment)

### Get your Supabase URL and Anon Key
- Supabase URL: Found in your Supabase Dashboard → Settings → API
- Anon Key: Found in the same location

### Test with curl

**Test a clean message (should pass):**
```bash
curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/moderate-message \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello, this is a friendly message!"}'
```

**Test a toxic message (should be flagged):**
```bash
curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/moderate-message \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "You are an idiot"}'
```

**Expected response for toxic message:**
```json
{
  "text": "You are an idiot",
  "scores": [
    { "label": "toxic", "score": 0.95 },
    { "label": "insult", "score": 0.88 },
    ...
  ],
  "toxic": true,
  "severe": false,
  "toxicityScore": 0.95
}
```

## Method 2: Test Locally (Before Deployment)

1. **Set up local environment:**
   ```bash
   # Make sure you have HF_API_KEY set
   export HF_API_KEY=your_key_here
   ```

2. **Start local Supabase (if you have it set up):**
   ```bash
   npx supabase start
   ```

3. **Serve the function locally:**
   ```bash
   npx supabase functions serve moderate-message --env-file .env.local
   ```

4. **Test with curl:**
   ```bash
   curl -X POST http://localhost:54321/functions/v1/moderate-message \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     -H "Content-Type: application/json" \
     -d '{"text": "Test message"}'
   ```

## Method 3: Test Through Your Frontend

1. **Start your Next.js app:**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Try submitting messages through the UI:**

   **Clean message (should work):**
   - Recipients: "Test User"
   - Message: "Hello! This is a nice message."
   - Should: Save successfully

   **Toxic message (should be blocked):**
   - Recipients: "Test User"
   - Message: "You are stupid"
   - Should: Show error "Your message contains inappropriate content and cannot be posted."

## Method 4: Test with JavaScript/Node.js

Create a test script:

```javascript
// test-moderation.js
const SUPABASE_URL = 'https://YOUR_PROJECT_REF.supabase.co';
const ANON_KEY = 'YOUR_ANON_KEY';

async function testModeration(text) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/moderate-message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ANON_KEY}`,
    },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();
  console.log(`Text: "${text}"`);
  console.log(`Toxic: ${data.toxic}`);
  console.log(`Scores:`, data.scores);
  console.log('---');
  return data;
}

// Test cases
async function runTests() {
  await testModeration('Hello, how are you?');
  await testModeration('You are an idiot');
  await testModeration('This is a great day!');
  await testModeration('I hate you');
}

runTests();
```

Run it:
```bash
node test-moderation.js
```

## Test Cases to Try

### Should PASS (non-toxic):
- "Hello, how are you?"
- "This is a great day!"
- "Thank you for your help"
- "I appreciate your time"
- "Have a wonderful day"

### Should FAIL (toxic):
- "You are an idiot"
- "I hate you"
- "You're stupid"
- "Go to hell"
- "You're a loser"

## Troubleshooting

### If the function returns an error:
1. Check that `HF_API_KEY` is set in Supabase Dashboard → Edge Functions → Secrets
2. Verify your HuggingFace API key is valid
3. Check the function logs in Supabase Dashboard → Edge Functions → Logs

### If messages aren't being blocked:
1. Check the browser console for errors
2. Verify the edge function is deployed: `npx supabase functions list`
3. Check that your Next.js API route is calling the function correctly
4. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set

### If you get rate limit errors:
- The HuggingFace API has rate limits for free tier
- Consider adding a delay or using a paid API key
- The function will still work but may be slower

