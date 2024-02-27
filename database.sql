CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"role" varchar(50) NOT NULL DEFAULT 'divine_employee',
	"date_created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
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
	"user_id" serial NOT NULL,
	CONSTRAINT "service_partner_pk" PRIMARY KEY ("service_partner_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "forms_aggregator" (
	"forms_aggregator_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"service_partner_id" integer NOT NULL,
	"submission_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"form_type" varchar(255) NOT NULL,
	"date_created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"status" TEXT NOT NULL,
	CONSTRAINT "forms_aggregator_pk" PRIMARY KEY ("forms_aggregator_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "guardianship" (
	"guardianship_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"service_partner_id" serial NOT NULL,
	"forms_aggregator_id" serial NOT NULL,
	"court_order_number" varchar(255) NOT NULL DEFAULT 'pending',
	"cps_worker_name" varchar(255) NOT NULL DEFAULT 'not',
	"cps_worker_phone" varchar(255) NOT NULL DEFAULT 'not',
	"cps_worker_email" varchar(255) NOT NULL DEFAULT 'not',
	"date_created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "guardianship_pk" PRIMARY KEY ("guardianship_id")
) WITH (
  OIDS=FALSE
);

-- Stuff that I did around data manipulation we'll clean this out once the backend is wrapped

-- DROP TABLE "forms_aggregator";


-- SELECT * FROM "service_partner" WHERE "user_id" = '1';

-- SELECT * FROM "service_partner" WHERE "user_id" = '1' and "service_partner_id" = '6' ;

-- UPDATE "service_partner" 
-- SET "nick_name" = 'Tawny'
-- WHERE "user_id" = '1' and "service_partner_id" = '6' ;

-- INSERT INTO "forms_aggregator" ("user_id", "service_partner_id", "form_type", "status" )
-- VALUES ('1', '6', 'guardianship', 'pending') 
-- RETURNING "forms_aggregator_id"; 


