CREATE TABLE "users" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"role" varchar(50) NOT NULL DEFAULT 'divine_employee',
	"date_created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "service_partner" (
	"service_partner_id" serial NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"nick_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"date_of_birth" DATE NOT NULL,
	"gender" varchar(50) NOT NULL DEFAULT 'not',
	"date_of_placement" DATE NOT NULL,
	"date_created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"usert_id" serial NOT NULL,
	CONSTRAINT "service_partner_pk" PRIMARY KEY ("service_partner_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "forms" (
	"form_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"child_id" integer NOT NULL,
	"submission_date" TIMESTAMP NOT NULL,
	"form_type" varchar(255) NOT NULL,
	"date_created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"status" TEXT NOT NULL,
	CONSTRAINT "forms_pk" PRIMARY KEY ("form_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "guardianship" (
	"guardianship_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"child_id" serial NOT NULL,
	"form_id" serial NOT NULL,
	"court_order_number" varchar(255) NOT NULL DEFAULT 'pending',
	"cps_worker_name" varchar(255) NOT NULL DEFAULT 'not',
	"cps_worker_phone" varchar(255) NOT NULL DEFAULT 'not',
	"cps_worker_email" varchar(255) NOT NULL DEFAULT 'not',
	"date_created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "guardianship_pk" PRIMARY KEY ("guardianship_id")
) WITH (
  OIDS=FALSE
);