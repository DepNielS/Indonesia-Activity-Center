--
-- PostgreSQL database dump
--

\restrict 6jhjX6DwPVWa7Wa4Q1JBhLPUjWWpo3eMlQDSlJj1vfEOtHCGEgCNndXNlvc1ZaO

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: activity_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.activity_categories (id, name, slug, created_at, updated_at) FROM stdin;
1	Padel	padel	2026-09-02 11:01:58.348529	2026-09-02 11:01:58.348529
2	Local Food	food	2026-09-02 11:01:58.348529	2026-09-02 11:01:58.348529
3	Wellness	wellness	2026-09-02 11:01:58.348529	2026-09-02 11:01:58.348529
4	Events	events	2026-09-02 11:01:58.348529	2026-09-02 11:01:58.348529
\.


--
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.activities (id, name, slug, description, image, location, duration, status, created_at, updated_at, category_id) FROM stdin;
1	Ayurvedic Massage	ayurvedic-massage	A traditional Ayurvedic massage experience designed for relaxation, wellness, and rejuvenation.	https://example.com/images/ayurvedic-massage.jpg	Wellness Center	60 minutes	PUBLISHED	2026-09-01 15:27:02.835453	2026-09-08 14:07:11.415	3
2	Yoga Morning Session	yoga-morning-session	A guided morning yoga session focused on flexibility, breathing, mindfulness, and relaxation.	https://example.com/images/yoga-morning.jpg	Yoga Pavilion	90 minutes	PUBLISHED	2026-09-01 15:27:02.835453	2026-09-01 15:27:02.835453	3
3	Padel Court Experience	padel-court-experience	An enjoyable padel court experience suitable for recreational players and groups.	https://example.com/images/padel-court.jpg	Padel Court	90 minutes	PUBLISHED	2026-09-01 15:27:02.835453	2026-09-01 15:27:02.835453	1
6	Private Wellness Consultation	private-wellness-consultation	A private consultation session providing personalized wellness recommendations based on individual needs.	\N	Wellness Center	30 minutes	PUBLISHED	2026-09-01 15:27:02.835453	2026-09-02 02:55:39.338	3
5	Sunrise Wellness Walk	sunrise-wellness-walk	A peaceful morning walking activity designed to explore the surrounding environment while practicing mindful breathing.	https://example.com/images/sunrise-walk.jpg	Garden Area	60 minutes	PUBLISHED	2026-09-01 15:27:02.835453	2026-09-02 02:56:10.03	3
17	Padel Court Mass	padel-mass	Padellll	https://example.com/image.jpg	Padel Court	60 minutes	DRAFT	2026-09-02 16:30:00.014641	2026-09-02 16:30:00.014641	1
18	Padel Court Mass	padel-mass2	Padelllzz	https://example.com/image.jpg	Padel Court	60 minutes	DRAFT	2026-09-03 08:55:47.782771	2026-09-03 03:56:14.12	1
4	Meditation Breathwork	meditation-breathwork	Meditasi dengan Hembusan Nafas	https://example.com/images/meditation.jpg	Wellness Center	45 minutes	DRAFT	2026-09-01 15:27:02.835453	2026-09-08 14:07:16.374	3
19	Padel Day	padel-day	Playing Fun With Padel	https://indonesiaactivitycenter.com/wp-content/uploads/2026/08/indonesia-activity-center-6a7ac7bc48055.png?allow_lossy=1	Padel Court	60 minutes	PUBLISHED	2026-09-08 21:14:42.560384	2026-09-08 14:14:49.304	1
20	Padel Court Mass2	padel-mass3	Playing Padel In Different vibes	https://sxjtdxcatseivflkfzeb.supabase.co/storage/v1/object/public/iac-media/images/6293c797-2779-41dd-93d9-6d71cb3ed73f.jpg	Padel Court	60 minutes	PUBLISHED	2026-09-09 11:59:42.902407	2026-09-09 05:18:26.485	1
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.events (id, title, slug, description, image, start_at, end_at, location, status, created_at, updated_at) FROM stdin;
42	Test Event Swagger Updated	test-event-swagger	Event untuk pengujian API melalui Swagger.	\N	2026-09-15 09:00:00	2026-09-15 12:00:00	Indonesia Activity Center	CANCELLED	2026-08-31 15:16:54.712825	2026-08-31 08:20:16.067
4	Competition Padel	competition-padel	Indonesia Activity Center Padel Tournaments	\N	2026-09-20 10:00:00	2026-09-25 13:00:00	Indonesia Activity Center	DRAFT	2026-08-26 16:49:38.708288	2026-08-26 16:49:38.708288
5	Competitions Padel	competitions-padel	Indonesia Activity Center Padel Tournaments	\N	2026-09-10 10:00:00	2026-09-10 13:00:00	Indonesia Activity Center	PUBLISHED	2026-08-26 16:51:38.632609	2026-08-26 10:28:38.661
2	Padel Tournament	padel-tournaments	Indonesia Activity Center Padel Tournament	\N	2026-09-15 10:00:00	2026-09-15 13:00:00	Indonesia Activity Center	CANCELLED	2026-08-26 15:06:13.418199	2026-08-26 10:43:08.864
7	Morning Padel Session	morning-padel-session	Morning padel session for members and guests.	https://example.com/events/morning-padel.jpg	2026-09-03 00:00:00	2026-09-03 02:00:00	Padel Court	PUBLISHED	2026-08-28 14:02:39.544574	2026-08-28 14:02:39.544574
9	Weekend Food Festival	weekend-food-festival	A weekend event featuring food and local culinary experiences.	https://example.com/events/food-festival.jpg	2026-09-07 09:00:00	2026-09-07 14:00:00	Activity Center Garden	PUBLISHED	2026-08-28 14:02:39.544574	2026-08-28 14:02:39.544574
10	Sunset Padel Tournament	sunset-padel-tournament	Friendly sunset padel tournament for registered participants.	https://example.com/events/sunset-padel.jpg	2026-09-10 09:00:00	2026-09-10 13:00:00	Padel Court	PUBLISHED	2026-08-28 14:02:39.544574	2026-08-28 14:02:39.544574
12	Healthy Cooking Workshop	healthy-cooking-workshop	Cooking workshop focused on healthy local ingredients.	https://example.com/events/healthy-cooking.jpg	2026-09-15 03:00:00	2026-09-15 06:00:00	Restaurant Area	DRAFT	2026-08-28 14:02:39.544574	2026-08-28 14:02:39.544574
13	Community Gathering	community-gathering	A community gathering for guests and local participants.	https://example.com/events/community-gathering.jpg	2026-09-18 10:00:00	2026-09-18 13:00:00	Main Garden	DRAFT	2026-08-28 14:02:39.544574	2026-08-28 14:02:39.544574
14	Creative Photography Workshop	creative-photography-workshop	Photography workshop focusing on creative outdoor photography.	https://example.com/events/photography-workshop.jpg	2026-09-20 02:00:00	2026-09-20 05:00:00	Activity Center	DRAFT	2026-08-28 14:02:39.544574	2026-08-28 14:02:39.544574
15	Private Wellness Retreat	private-wellness-retreat	A private wellness retreat program for selected participants.	https://example.com/events/private-retreat.jpg	2026-09-22 01:00:00	2026-09-24 10:00:00	Wellness Center	CANCELLED	2026-08-28 14:02:39.544574	2026-08-28 14:02:39.544574
16	Night Padel Championship	night-padel-championship	Night padel championship event.	https://example.com/events/night-padel.jpg	2026-09-25 11:00:00	2026-09-25 15:00:00	Padel Court	CANCELLED	2026-08-28 14:02:39.544574	2026-08-28 14:02:39.544574
17	Traditional Food Experience	traditional-food-experience	Traditional Indonesian food experience for guests.	https://example.com/events/traditional-food.jpg	2026-09-28 11:00:00	2026-09-28 14:00:00	Restaurant Area	CANCELLED	2026-08-28 14:02:39.544574	2026-08-28 14:02:39.544574
45	Indonesia Activity Center Test Event Editor	indonesia-activity-center-test-Editor	Testing event API	\N	2026-09-10 09:00:00	2026-09-10 12:00:00	Indonesia Activity Center	DRAFT	2026-09-01 13:47:59.952282	2026-09-01 13:47:59.952282
3	Padel Competition	padel-competition	Indonesia Activity Center Padel Tournament	\N	2026-09-15 10:00:00	2026-09-15 13:00:00	Indonesia Activity Center	CANCELLED	2026-08-26 15:59:29.037556	2026-08-28 08:53:33.411
1	Updated Padel Tournament	padel-tournament	Indonesia Activity Center Padel Tournament	\N	2026-09-15 10:00:00	2026-09-15 13:00:00	Indonesia Activity Center	DRAFT	2026-08-26 15:01:59.176293	2026-08-28 08:58:24.799
6	Indonesia Activity Center Grand Opening	indonesia-activity-center-grand-opening	Grand opening event of Indonesia Activity Center.	https://example.com/events/grand-opening.jpg	2026-09-01 02:00:00	2026-09-01 05:00:00	Indonesia Activity Center	CANCELLED	2026-08-28 14:02:39.544574	2026-08-28 08:58:58.669
11	Yoga and Meditation Class	yoga-and-meditation-class	A relaxing yoga and meditation class for beginners.	https://example.com/events/yoga-meditation.jpg	2026-09-12 01:00:00	2026-09-12 03:00:00	Wellness Center	DRAFT	2026-08-28 14:02:39.544574	2026-08-31 08:11:03.122
94	Yoga & Wellness Retreat	yoga-wellness-retrea	A wellness retreat combining yoga,\nmeditation, and holistic activities.	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Glc0Rwag_EWja_1xKwuueQ3H_6HskpFmzLOvzPFvvPAzwk4fisL7ZlS5&s=10	2026-09-15 05:14:00	2026-09-19 05:14:00	Wellness Center 2	DRAFT	2026-09-04 12:15:15.049878	2026-09-04 12:15:15.049878
8	Ayurvedic Wellness Workshop	ayurvedic-wellness-workshop	A wellness workshop introducing Ayurvedic practices.	https://example.com/events/ayurvedic-workshop.jpg	2026-09-05 03:00:00	2026-09-05 06:00:00	Wellness Center	PUBLISHED	2026-08-28 14:02:39.544574	2026-09-04 06:27:03.877
44	Indonesia Activity Center Test Event Admin	indonesia-activity-center-test-event_Admin	Testing event API	\N	2026-09-10 09:00:00	2026-09-10 12:00:00	Indonesia Activity Center	DRAFT	2026-09-01 13:47:23.988355	2026-09-04 06:58:53.298
43	Indonesia Activity Center Test Event	indonesia-activity-center-test-event	Testing event API	\N	2026-09-10 09:00:00	2026-09-10 12:00:00	Indonesia Activity Center	DRAFT	2026-09-01 13:44:13.567043	2026-09-04 07:12:51.366
\.


--
-- Data for Name: pages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages (id, title, slug, excerpt, content, image, status, created_at, updated_at) FROM stdin;
1	About Indonesia Activity Center	about-indonesia-activity-center	Discover Indonesia Activity Center and everything we offer.	Indonesia Activity Center is a destination designed to bring together hospitality, wellness, food, sports, and community experiences in one place.	https://example.com/pages/about.jpg	PUBLISHED	2026-08-28 15:13:01.584616	2026-08-28 15:13:01.584616
2	Resort	resort	Experience a relaxing stay surrounded by nature and comfort.	Our resort provides a comfortable environment for guests looking for relaxation, wellness, and memorable experiences.	https://example.com/pages/resort.jpg	PUBLISHED	2026-08-28 15:13:01.584616	2026-08-28 15:13:01.584616
3	Food & Dining	food-and-dining	Enjoy carefully prepared food and authentic culinary experiences.	Discover a variety of food and dining experiences featuring fresh ingredients and Indonesian culinary inspiration.	https://example.com/pages/food.jpg	PUBLISHED	2026-08-28 15:13:01.584616	2026-08-28 15:13:01.584616
4	Padel	padel	Enjoy an active and social padel experience.	Our padel facilities provide a modern environment for recreational players, members, and guests.	https://example.com/pages/padel.jpg	PUBLISHED	2026-08-28 15:13:01.584616	2026-08-28 15:13:01.584616
5	Ayurvedic Wellness	ayurvedic-wellness	Explore holistic wellness experiences inspired by Ayurveda.	Our Ayurvedic wellness experiences are designed to support relaxation and personal wellbeing through traditional practices.	https://example.com/pages/ayurvedic.jpg	PUBLISHED	2026-08-28 15:13:01.584616	2026-08-28 15:13:01.584616
6	Contact	contact	Get in touch with Indonesia Activity Center.	Contact our team to learn more about accommodation, dining, padel, wellness programs, and upcoming activities.	https://example.com/pages/contact.jpg	PUBLISHED	2026-08-28 15:13:01.584616	2026-08-28 15:13:01.584616
7	Membership	membership	Learn more about becoming a member of Indonesia Activity Center.	Membership information and benefits will be available here.	https://example.com/pages/membership.jpg	DRAFT	2026-08-28 15:13:01.584616	2026-08-28 08:52:23.28
9	About Indonesia Activity Center2	about-indonesia-activity-center2	Discover Indonesia Activity Center and everything we offer2.	Indonesia Activity Center is a destination designed to bring together hospitality, wellness, food, sports, and community experiences in one place2.	https://example.com/pages/about.jpg	DRAFT	2026-08-31 07:54:53.412767	2026-08-31 07:54:53.412767
8	About Indonesia Activity Center	about-indonesia-activity-center3	Discover Indonesia Activity Center and everything we offer.	Indonesia Activity Center is a destination designed to bring together hospitality, wellness, food, sports, and community experiences in one place.	https://example.com/pages/about.jpg	PUBLISHED	2026-08-28 15:13:01.584616	2026-08-31 01:04:15.685
17	Wellness Programs	wellness-programs	Explore our upcoming wellness programs and activities.	Detailed information about our wellness programs will be published soon.	https://example.com/pages/wellness-programs.jpg	DRAFT	2026-09-01 15:27:02.831706	2026-09-01 15:27:02.831706
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roles (id, name, created_at) FROM stdin;
1	SUPER_ADMIN	2026-08-21 15:50:49.129363
2	ADMIN	2026-08-21 15:50:49.13979
3	EDITOR	2026-08-21 15:50:49.142101
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, password, role_id, created_at, updated_at, is_active) FROM stdin;
2	Administrator IAC	admin@iac.com	$argon2id$v=19$m=65536,p=4,t=3$D9WicbuTcevHZZ+WchDl+g$iI5BaDvRji+qLsp2nq9cIyI/Ktp5Q1I2vPI3inekAGg	1	2026-08-24 11:29:28.086166	2026-08-24 05:49:01.173	t
1	Administrator IAC Updated	newadmin@iac.com	$argon2id$v=19$m=65536,p=4,t=3$ztyxmPbx++pcVQq5tNqCPg$T+U1JfGL0SaQY5z2Tn0CuKIoIxFxcKwbew2P/GY/r+w	2	2026-08-24 10:41:23.354224	2026-08-24 05:58:24.996	f
3	Editor IAC	editor@iac.com	$argon2id$v=19$m=65536,p=4,t=3$COsJHkQKgtYKfnzAuHJCuw$Qec3LfMeDzm3apvUkxEvKbMPFRKH0Tyqz2HJIi/KcW8	3	2026-08-24 16:44:23.353573	2026-08-24 16:44:23.353573	t
4	Super Admin IAC	superadmin@iac.com	$argon2id$v=19$m=65536,p=4,t=3$R6NCNWzgYR74orY/XlKiaQ$SJ3aJ0Xa5MJker5M0LWxPedB8roThNSSEjfkApfTudA	1	2026-08-24 16:49:19.409384	2026-08-24 16:49:19.409384	t
5	Admin IAC	admin2@iac.com	$argon2id$v=19$m=65536,p=4,t=3$QqOhxLk7jIh1VJy39S/W5Q$b+gikwSs7cKslc4N1TZ+XzUJkJ+zBf7zW7ElT/KU5Q8	2	2026-08-24 16:49:58.233919	2026-08-24 16:49:58.233919	t
6	Admin IAC 1	admin1@iac.com	$argon2id$v=19$m=65536,p=4,t=3$neTEmwmhI7jYKcO/NIhlJg$h32jzPKcRp+gk8ZvuoT8VmLPLz/C+Yp8RmEY7fffPMg	1	2026-08-26 11:36:19.835236	2026-08-26 11:36:19.835236	t
7	Admin	admin@example.com	$argon2id$v=19$m=65536,p=4,t=3$2oz9onOlzvKtyHn0peamNw$yi73U7ygLR6eVuY9Nr2wsri8YnPpa1MrMY2rbtxYdIc	1	2026-08-26 11:37:07.004979	2026-08-26 11:43:47.182169	f
\.


--
-- Name: activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.activities_id_seq', 20, true);


--
-- Name: activity_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.activity_categories_id_seq', 4, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.events_id_seq', 94, true);


--
-- Name: pages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pages_id_seq', 41, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 21, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- PostgreSQL database dump complete
--

\unrestrict 6jhjX6DwPVWa7Wa4Q1JBhLPUjWWpo3eMlQDSlJj1vfEOtHCGEgCNndXNlvc1ZaO

