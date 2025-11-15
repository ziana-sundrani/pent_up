import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
	const supabase = createServerClient();
	const { data, error } = await supabase
		.from("messages")
		.select("id,recipients,body,color,created_at")
		.order("created_at", { ascending: false });
	if (error) {
		console.error("GET /api/messages error:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
	return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
	const payload = await req.json();
	const { recipients, body, color } = payload ?? {};
	if (!recipients || !body) {
		return NextResponse.json({ error: "Missing 'recipients' or 'body'" }, { status: 400 });
	}

	// Check message for toxic content using Supabase Edge Function
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (supabaseUrl && supabaseAnonKey) {
		try {
			console.log("Checking message toxicity...");
			const moderationResponse = await fetch(`${supabaseUrl}/functions/v1/moderate-message`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${supabaseAnonKey}`,
				},
				body: JSON.stringify({ text: body }),
			});

			if (moderationResponse.ok) {
				const moderationData = await moderationResponse.json();
				console.log("Moderation result:", moderationData);
				if (moderationData.toxic) {
					console.log("Message flagged as toxic, blocking...");
					return NextResponse.json(
						{
							error: "Your message contains inappropriate content and cannot be posted.",
							toxicityScore: moderationData.toxicityScore,
						},
						{ status: 400 }
					);
				}
				console.log("Message passed moderation check");
			} else {
				const errorText = await moderationResponse.text();
				console.error("Moderation service error:", moderationResponse.status, errorText);
				// If moderation service fails, log but don't block
				console.warn("Moderation service unavailable, proceeding without check");
			}
		} catch (error) {
			// If moderation service is unavailable, log but don't block
			console.error("Error checking message toxicity:", error);
			console.warn("Moderation service unavailable, proceeding without check");
		}
	} else {
		console.warn("Supabase URL or Anon Key not configured, skipping moderation check");
	}

	const supabase = createServerClient();
	const { data, error } = await supabase
		.from("messages")
		.insert({ recipients, body, color: color || "#f0f0f0" })
		.select("id,recipients,body,color,created_at")
		.single();
	if (error) {
		console.error("POST /api/messages error:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
	return NextResponse.json(data, { status: 201 });
}
