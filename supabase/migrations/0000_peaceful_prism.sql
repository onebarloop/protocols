CREATE TABLE "protocols" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"html" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
