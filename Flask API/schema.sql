--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: city_scores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.city_scores (
    city character varying(45) NOT NULL,
    cost_of_living_score double precision NOT NULL,
    safety_score double precision NOT NULL,
    teleport_city_score double precision NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL
);


ALTER TABLE public.city_scores OWNER TO postgres;

--
-- Name: city_scores city_scores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_scores
    ADD CONSTRAINT city_scores_pkey PRIMARY KEY (city);


--
-- PostgreSQL database dump complete
--

