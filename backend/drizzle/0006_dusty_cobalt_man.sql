CREATE TABLE "activity_categories" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar(100) NOT NULL,
    "slug" varchar(120) NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "activity_categories_name_unique" UNIQUE("name"),
    CONSTRAINT "activity_categories_slug_unique" UNIQUE("slug")
);

--> statement-breakpoint

ALTER TABLE "activities"
ADD COLUMN "category_id" integer;

--> statement-breakpoint

ALTER TABLE "activities"
ADD CONSTRAINT "activities_category_id_activity_categories_id_fk"
FOREIGN KEY ("category_id")
REFERENCES "public"."activity_categories"("id")
ON DELETE no action
ON UPDATE no action;