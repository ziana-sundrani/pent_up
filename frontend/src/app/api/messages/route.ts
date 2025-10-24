import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
	const supabase = createServerClient();
	const { data, error } = await supabase
		.from("messages")
		.select("id,to,body,color,created_at")
		.order("created_at", { ascending: false });
	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
	return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
	const payload = await req.json();
	const { to, body, color } = payload ?? {};
	if (!to || !body) {
		return NextResponse.json({ error: "Missing 'to' or 'body'" }, { status: 400 });
	}
	const supabase = createServerClient();
	const { data, error } = await supabase
		.from("messages")
		.insert({ to, body, color: color || "#f0f0f0" })
		.select("id,to,body,color,created_at")
		.single();
	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
	return NextResponse.json(data, { status: 201 });
}
