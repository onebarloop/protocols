ALTER TABLE "protocols" RENAME COLUMN "created_by" TO "author_id";--> statement-breakpoint
ALTER TABLE "protocols" RENAME COLUMN "edited_by" TO "editor_id";--> statement-breakpoint
ALTER TABLE "protocols" ADD CONSTRAINT "protocols_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "protocols" ADD CONSTRAINT "protocols_editor_id_user_id_fk" FOREIGN KEY ("editor_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;