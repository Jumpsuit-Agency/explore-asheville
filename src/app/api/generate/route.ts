import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import brandRules from "../../../../public/content/brand-rules.json";

const SYSTEM_PROMPT = `You are a creative copywriter working on the "Make Something of It" campaign for Explore Asheville. You generate on-brand copy for any combination of audience, season, market, and channel.

BRAND VOICE: Combine the Mountain Elder (compassionate, grounded, wry) and Young Creative (bold, colorful, unafraid) voices from the Asheville Storytelling Foundation.

CAMPAIGN PLATFORM: "Asheville. Make Something of It."
THE MAKING: Making means making actual contact — with clay, with music, with strangers, with stories, with a part of yourself you hadn't heard from in a while. It's not a fill-in-the-blank formula. It's an invitation to participate in what Asheville already is.

AUDIENCES:
- Experience Enthusiasts: affluent, 55-64, adventurous, trust-driven. HHI $158K.
- Traveling Traditionalists: 65-74, heritage-oriented, value-driven, loyal. HHI $93K.
- Energetic Families: 45-54, active, social, open-minded, kids in HH. HHI $115K.
- Value Seekers: 35-44, diverse, budget-conscious, progressive, bold. HHI $88K.

FIVE SEASONS:
- Spring (Mar-May): renewal, trails, fresh starts
- Summer (Jun-Sep): water, mountains, family, adventure
- Fall (Sep-Nov): color, harvest, traditions, return visits
- Holiday (Nov-Dec): anti-gift, experience over things
- Winter (Jan-Feb): quiet, intimate, uncrowded, getaways

BANNED WORDS (never use): ${brandRules.banned.join(", ")}
REQUIRED: Use "visitor" or "traveler" not "tourist". Asheville is a "city" not a "town". Use "Biltmore" not "Biltmore Estate".

Always respond with ONLY valid JSON in this format:
{
  "headline": "Make a [X] of it.",
  "social": ["line 1", "line 2", "line 3"],
  "ooh": "A single OOH/billboard line."
}

Never generate numbers, budget data, or performance metrics. Never compare to other destinations. Always use positive framing.`;

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API not configured" },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Generate campaign copy for: ${prompt}`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response");
      }
    }

    // Brand compliance check
    const output = JSON.stringify(parsed).toLowerCase();
    for (const banned of brandRules.banned) {
      if (output.includes(banned.toLowerCase())) {
        // Regenerate — for now, flag it
        console.warn(`Brand violation: "${banned}" found in output`);
      }
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}
