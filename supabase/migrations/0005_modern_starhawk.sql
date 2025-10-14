ALTER TABLE "protocols" ALTER COLUMN "serialized_state" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "protocols" DROP COLUMN "html";