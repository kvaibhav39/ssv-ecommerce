
CREATE TABLE IF NOT EXISTS public."PRODUCTS"
(
    id integer NOT NULL DEFAULT nextval('"PRODUCTS_id_seq"'::regclass),
    "productDescription" text COLLATE pg_catalog."default",
    "productName" character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT "PRODUCTS_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."PRODUCTS"
    OWNER to root;

CREATE TABLE IF NOT EXISTS public."ORDERS"
(
    id integer NOT NULL DEFAULT nextval('"ORDERS_id_seq"'::regclass),
    "createdAt" time without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderDescription" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "ORDERS_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."ORDERS"
    OWNER to root;

CREATE TABLE IF NOT EXISTS public."OrderProductMap"
(
    id integer NOT NULL DEFAULT nextval('"OrderProductMap_id_seq"'::regclass),
    "orderId" integer NOT NULL,
    "productId" integer NOT NULL,
    CONSTRAINT "OrderProductMap_pkey" PRIMARY KEY (id),
    CONSTRAINT orders_id_fkey FOREIGN KEY ("orderId")
        REFERENCES public."ORDERS" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT product_id_key FOREIGN KEY ("productId")
        REFERENCES public."PRODUCTS" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)