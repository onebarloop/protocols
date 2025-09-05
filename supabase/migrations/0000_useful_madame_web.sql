CREATE TABLE "protocols" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"html" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
