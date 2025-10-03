ALTER TABLE "point_activities" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "point_activities" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "point_activities" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "point_entries" ADD COLUMN "points_awarded" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "point_entries" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "level" text DEFAULT 'Beginner';--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;