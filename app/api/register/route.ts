import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { z } from "zod";

// ─── Zod Validation Schema ────────────────────────────────────────────────────
// Mirrors the form fields in RegistrationForm.tsx.
// Server-side validation is the authoritative source of truth.

const RegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(120),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format.")
    .refine((val) => {
      const year = new Date(val).getFullYear();
      return year >= 1995 && year <= 2015;
    }, "Date of birth must be between 1995 and 2015."),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-]{10,}$/, "Enter a valid phone number."),
  email: z.string().email("Enter a valid email address.").max(255),
  gender: z.enum(["male", "female"], { message: "Gender must be male or female." }),
  yearOfStudy: z.string().refine(
    (v) => ["UG - 1st Year", "UG - 2nd Year", "UG - 3rd Year", "UG - 4th Year",
      "PG - 1st Year", "PG - 2nd Year", "Other"].includes(v),
    { message: "Invalid year of study." }
  ),
  yearOfStudyOther: z.string().optional(),
  college: z.string().refine(
    (v) => [
      "St Joseph's College of Engineering and Technology, Choondacherry",
      "St Joseph's Institute of Hotel Management and Catering Technology, Choondacherry",
      "Alphonsa College, Pala",
      "Devamatha College, Kuravilangad",
      "St Thomas College, Pala",
      "St Joseph's College, Moolamattom",
      "St George's College, Aruvithura",
      "St Stephen's College, Uzhavoor",
      "Bishop Vayalil Memorial Holy Cross College, Cherpunkal",
      "Mar Augusthinose College, Ramapuram",
      "+2 Passout",
      "IELTS",
      "German",
      "SSC",
      "Other"
    ].includes(v),
    { message: "Invalid college name." }
  ),
  collegeOther: z.string().optional(),
  parish: z.string().min(1, "Parish name is required.").max(200),
  diocese: z.string().min(1, "Diocese name is required.").max(200),
  address: z.string().min(10, "Address must be at least 10 characters.").max(200, "Address must not exceed 200 characters."),
  confirmed: z.literal(true, {
    message: "You must confirm to submit.",
  }),
}).superRefine((data, ctx) => {
  // When yearOfStudy is "Other", require a custom text value
  if (data.yearOfStudy === "Other") {
    const v = (data.yearOfStudyOther ?? "").trim();
    if (v.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["yearOfStudyOther"],
        message: "Please specify your year of study (min. 2 characters).",
      });
    } else if (v.length > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["yearOfStudyOther"],
        message: "Must not exceed 100 characters.",
      });
    }
  }
  // When college is "Other", require a custom text value
  if (data.college === "Other") {
    const v = (data.collegeOther ?? "").trim();
    if (v.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["collegeOther"],
        message: "Please specify your college name (min. 2 characters).",
      });
    } else if (v.length > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["collegeOther"],
        message: "Must not exceed 100 characters.",
      });
    }
  }
});

// ─── Supabase Admin Client ────────────────────────────────────────────────────
// Uses the SERVICE ROLE KEY — bypasses RLS safely on the server.
// This key must NEVER be exposed to the browser.

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable."
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      // Disable auto-refresh and session persistence for server-side usage
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// ─── POST /api/register ───────────────────────────────────────────────────────

export async function POST(request: Request) {
  // 1. Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // 2. Validate with Zod
  const parsed = RegistrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Validation failed.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // 3. Create admin Supabase client
  let supabase: ReturnType<typeof getAdminClient>;
  try {
    supabase = getAdminClient();
  } catch (err) {
    console.error("[register] Supabase init error:", err);
    return NextResponse.json(
      { success: false, error: "Server configuration error." },
      { status: 500 }
    );
  }

  // 4. Look up the event by slug and verify it is ACCEPTING
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("id, status, max_capacity")
    .eq("slug", "orah-2026")
    .single();

  if (eventError || !event) {
    console.error("[register] Event lookup error:", eventError);
    return NextResponse.json(
      { success: false, error: "Event not found." },
      { status: 404 }
    );
  }

  if (event.status !== "ACCEPTING") {
    return NextResponse.json(
      {
        success: false,
        error: "Registrations are currently closed. Please check back later.",
        code: "EVENT_CLOSED",
      },
      { status: 503 }
    );
  }

  // 5. Check capacity (if a max_capacity is set)
  if (event.max_capacity !== null) {
    const { count, error: countError } = await supabase
      .from("registrations")
      .select("id", { count: "exact", head: true })
      .eq("event_id", event.id);

    if (countError) {
      console.error("[register] Capacity check error:", countError);
    } else if (count !== null && count >= event.max_capacity) {
      return NextResponse.json(
        {
          success: false,
          error: "Registrations are full. No more spots available.",
          code: "EVENT_FULL",
        },
        { status: 503 }
      );
    }
  }

  // 6. Check for duplicate email registration for this event
  const { data: existing, error: dupError } = await supabase
    .from("registrations")
    .select("id")
    .eq("event_id", event.id)
    .eq("email", data.email.toLowerCase())
    .maybeSingle();

  if (dupError) {
    console.error("[register] Duplicate check error:", dupError);
    return NextResponse.json(
      { success: false, error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }

  if (existing) {
    return NextResponse.json(
      {
        success: false,
        error: "This email address is already registered for this event.",
        code: "DUPLICATE_EMAIL",
      },
      { status: 409 }
    );
  }

  // 7. Insert the registration
  const { data: registration, error: insertError } = await supabase
    .from("registrations")
    .insert({
      event_id: event.id,
      registration_type: "ONLINE",
      name: data.name.trim(),
      dob: data.dob,
      phone: data.phone.trim(),
      email: data.email.toLowerCase().trim(),
      gender: data.gender,
      // Resolve "Other" — store the custom text the user typed, not the literal "Other"
      year_of_study: data.yearOfStudy === "Other"
        ? (data.yearOfStudyOther ?? "").trim()
        : data.yearOfStudy,
      college: data.college === "Other"
        ? (data.collegeOther ?? "").trim()
        : data.college,
      parish: data.parish.trim(),
      diocese: data.diocese.trim(),
      address: data.address.trim(),
      confirmed: true,
    })
    .select("id")
    .single();

  if (insertError) {
    // Catch unique constraint violation as a safety net (race condition)
    if (insertError.code === "23505") {
      return NextResponse.json(
        {
          success: false,
          error: "This email address is already registered for this event.",
          code: "DUPLICATE_EMAIL",
        },
        { status: 409 }
      );
    }

    console.error("[register] Insert error:", insertError);
    return NextResponse.json(
      { success: false, error: "Failed to save registration. Please try again." },
      { status: 500 }
    );
  }

  // 8. Generate a unique token hash: SHA-256(registrationId + TICKET_SECRET)
  const secret = process.env.TICKET_SECRET ?? "orah-2026-default-secret";
  const rawToken = `${registration.id}:${secret}`;
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(rawToken));
  const tokenHash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // 9. Get sequential ticket number for this event (used in filename + PDF)
  const { count: ticketCount } = await supabase
    .from("tickets")
    .select("id", { count: "exact", head: true });
  const ticketNumber = String((ticketCount ?? 0) + 1).padStart(3, "0");
  const ticketId = `ORAH-2026-${ticketNumber}`;

  // 10. Insert into tickets table
  const { error: ticketError } = await supabase
    .from("tickets")
    .insert({
      registration_id: registration.id,
      token_hash: tokenHash,
    });

  if (ticketError) {
    // Non-fatal: registration succeeded; log and continue
    console.error("[register] Ticket insert error:", ticketError);
  }

  // 11. Return enriched success response for client-side PDF generation
  const issuedAt = new Date().toISOString();
  return NextResponse.json(
    {
      success: true,
      registrationId: registration.id,
      message: "Registration successful!",
      ticket: {
        tokenHash: tokenHash,
        ticketNumber: ticketId,
        issuedAt,
      },
      participant: {
        name: data.name.trim(),
        parish: data.parish.trim(),
        diocese: data.diocese.trim(),
        college: data.college === "Other" ? (data.collegeOther ?? "").trim() : data.college,
        yearOfStudy: data.yearOfStudy === "Other" ? (data.yearOfStudyOther ?? "").trim() : data.yearOfStudy,
        gender: data.gender,
        phone: data.phone.trim(),
        email: data.email.toLowerCase().trim(),
        dob: data.dob,
      },
      event: {
        name: "ORAH 2026",
        location: "Pala, Kerala",
      },
    },
    { status: 201 }
  );
}
