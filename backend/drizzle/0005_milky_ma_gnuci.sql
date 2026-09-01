CREATE TYPE "public"."activity_status" AS ENUM('DRAFT', 'PUBLISHED');--> statement-breakpoint
CREATE TABLE "activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(150) NOT NULL,
	"slug" varchar(180) NOT NULL,
	"description" text NOT NULL,
	"image" varchar(500),
	"location" varchar(200),
	"duration" varchar(100),
	"status" "activity_status" DEFAULT 'DRAFT' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "activities_slug_unique" UNIQUE("slug")
);
