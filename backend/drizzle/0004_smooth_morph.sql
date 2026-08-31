CREATE TYPE "public"."page_status" AS ENUM('DRAFT', 'PUBLISHED');--> statement-breakpoint
CREATE TABLE "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(150) NOT NULL,
	"slug" varchar(180) NOT NULL,
	"excerpt" varchar(300),
	"content" text NOT NULL,
	"image" varchar(500),
	"status" "page_status" DEFAULT 'DRAFT' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pages_slug_unique" UNIQUE("slug")
);
