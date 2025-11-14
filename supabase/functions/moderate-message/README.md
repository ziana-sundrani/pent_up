# Moderate Message Edge Function

This Supabase Edge Function uses the HuggingFace Inference API with the `unitary/toxic-bert` model (Detoxify) to check messages for toxic content before they are saved.

## Setup

1. **Add HuggingFace API Key to Supabase Dashboard:**
   - Go to your Supabase Dashboard → Project Settings → Edge Functions → Secrets/Vault
   - Add: `HF_API_KEY` = `your_key_here`
   - Get a free API key from [HuggingFace](https://huggingface.co/settings/tokens)
   - **Note:** The function uses `HF_API_KEY` (not `HUGGINGFACE_API_KEY`)

2. **Deploy the function:**
   
   From the project root directory (`/Users/ziana/Desktop/Projects/pent_up`):
   ```bash
   # Login to Supabase (first time only)
   npx supabase login
   
   # Link your project (if not already linked)
   # Find your project ref in your Supabase dashboard URL
   npx supabase link --project-ref your-project-ref
   
   # Deploy the function
   npx supabase functions deploy moderate-message
   ```
   
   **Note:** Use `npx supabase` instead of just `supabase` - this runs the CLI without needing to install it globally.

## How It Works

The function uses a direct `fetch()` call to the HuggingFace Inference API (Deno-compatible, no npm packages needed). It classifies messages using the `unitary/toxic-bert` model (Detoxify). This model returns scores for various toxicity labels:

- `toxic`
- `severe_toxic`
- `obscene`
- `identity_attack`
- `insult`
- `threat`
- `sexual_explicit`

The function returns:
- `toxic`: `true` if any label exceeds the threshold (0.8)
- `severe`: `true` if severe_toxic exceeds 0.5
- `toxicityScore`: The score for the "toxic" label
- `scores`: All label scores

**Advantages:**
- ✅ Works in Deno / Supabase Edge Functions
- ✅ No npm packages or type declarations needed
- ✅ Fully serverless
- ✅ Easy to adjust the toxicity threshold

## API Usage

The function is automatically called by the Next.js API route (`/api/messages`) before saving messages. Messages flagged as toxic are rejected with an error message.

## Testing Locally

You can test the function locally using the Supabase CLI:

```bash
npx supabase functions serve moderate-message
```

Then test with:
```bash
curl -X POST http://localhost:54321/functions/v1/moderate-message \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "Your message here"}'
```

