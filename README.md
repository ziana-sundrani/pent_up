# pent_up
SPARK

#Content Moderation 
This app contains a Supabase Edge Function to use the HuggingFace Inference API with the `unitary/toxic-bert` model (Detoxify) to check messages for toxic content before they are saved.

To run the Detoxify model:
   # 1. Login to Supabase (first time only)
   npx supabase login
   
   # 2. Link your project (if not already linked)
   npx supabase link --project-ref your-project-ref
   
   # 3. Deploy the function
   npx supabase functions deploy moderate-message