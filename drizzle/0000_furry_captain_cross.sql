CREATE TABLE "point_activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"point_value" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "point_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"activity_id" integer NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"points" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "point_entries" ADD CONSTRAINT "point_entries_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "point_entries" ADD CONSTRAINT "point_entries_activity_id_point_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."point_activities"("id") ON DELETE no action ON UPDATE no action;