// Supabase Edge Function for message moderation using HuggingFace Inference API
// Uses direct fetch() call - Deno-compatible, no npm packages needed
// Note: Deno is available at runtime in Supabase Edge Functions

// @ts-ignore - Deno is available at runtime in Supabase Edge Functions
Deno.serve(async (req) => {
	// Test endpoint to check if secrets are accessible
	// Call with GET ?test=secrets to check secret access
	if (req.method === "GET") {
		const url = new URL(req.url);
		if (url.searchParams.get("test") === "secrets") {
			try {
				// @ts-ignore
				const HF_API_KEY = Deno.env.get("HF_API_KEY");
				
				return new Response(
					JSON.stringify({
						secretExists: !!HF_API_KEY,
						secretLength: HF_API_KEY ? HF_API_KEY.length : 0,
						secretPrefix: HF_API_KEY ? HF_API_KEY.substring(0, 4) + "..." : "N/A",
						secretStartsWithHf: HF_API_KEY ? HF_API_KEY.startsWith("hf_") : false,
						message: HF_API_KEY 
							? "Secret is accessible! ✅" 
							: "Secret not found. Make sure HF_API_KEY is set in Edge Function environment variables",
					}),
					{
						status: 200,
						headers: { "Content-Type": "application/json" },
					}
				);
			} catch (err) {
				return new Response(
					JSON.stringify({ error: "Error checking secrets: " + err.toString() }),
					{
						status: 500,
						headers: { "Content-Type": "application/json" },
					}
				);
			}
		}
		// If GET but not test endpoint, return error
		return new Response(
			JSON.stringify({ error: "GET method not supported. Use POST with { text: '...' }" }),
			{
				status: 405,
				headers: { "Content-Type": "application/json" },
			}
		);
	}

	// POST request handling
	if (req.method !== "POST") {
		return new Response(
			JSON.stringify({ error: "Method not allowed. Use POST." }),
			{
				status: 405,
				headers: { "Content-Type": "application/json" },
			}
		);
	}

	try {
		const { text } = await req.json();

		if (!text) {
			return new Response(
				JSON.stringify({ error: "Missing 'text' field" }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		// Get API key from environment variables
		// @ts-ignore
		const HF_API_KEY = Deno.env.get("HF_API_KEY");

		if (!HF_API_KEY) {
			console.error("HF_API_KEY is not set in environment variables");
			throw new Error("HF_API_KEY not found. Please add it in Supabase Dashboard → Edge Functions → moderate-message → Settings → Environment Variables");
		}

		// Use the new HuggingFace router API endpoint
		const apiUrl = "https://router.huggingface.co/hf-inference/models/unitary/toxic-bert";
		
		console.log(`Calling HuggingFace API: ${apiUrl.substring(0, 50)}...`);
		console.log(`API Key present: ${HF_API_KEY ? "Yes (length: " + HF_API_KEY.length + ")" : "No"}`);

		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${HF_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ inputs: text }),
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`HuggingFace API error: ${response.status} ${response.statusText} - ${errorText}`);
		}

		const result = await response.json();

		// The new router API might return data in a different format
		// Handle both old format (array) and new format (nested array)
		let scores: any[] = [];
		
		if (Array.isArray(result)) {
			// Check if it's nested (new router format)
			if (result.length > 0 && Array.isArray(result[0])) {
				// Flatten nested array
				scores = result[0];
			} else {
				// Direct array format
				scores = result;
			}
		} else if (result && Array.isArray(result[0])) {
			// Another nested format
			scores = result[0];
		} else {
			scores = result;
		}

		console.log("Parsed scores:", JSON.stringify(scores, null, 2));

		// Check if any toxicity label exceeds threshold (0.7 is more reasonable)
		const TOXICITY_THRESHOLD = 0.7;
		const isToxic = scores.some((r: any) => r.score > TOXICITY_THRESHOLD);

		// Also check for severe toxicity specifically
		const severeToxic = scores.find((r: any) => r.label === "severe_toxic");
		const isSevere = severeToxic?.score > 0.5;

		return new Response(
			JSON.stringify({
				text,
				scores: scores,
				toxic: isToxic,
				severe: isSevere,
				toxicityScore: scores.find((r: any) => r.label === "toxic")?.score || 0,
			}),
			{
				status: 200,
				headers: { "Content-Type": "application/json" },
			}
		);
	} catch (err) {
		console.error("Error in moderate-message function:", err);
		return new Response(
			JSON.stringify({ error: err.toString() }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
});

