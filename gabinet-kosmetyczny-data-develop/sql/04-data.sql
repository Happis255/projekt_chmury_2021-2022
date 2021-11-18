INSERT INTO `account` (`uuid`, `e_mail`, `password`, `role`) VALUES 
('9cb799a5-9212-474f-a0c9-691ffde0d7db', 'admin@hotmail.com', 'test123', 'ADMIN'), 
('c49a059f-db35-475e-b387-7b37fe512260', 'worker1@hotmail.com', 'test123', 'WORKER'), 
('81987a53-89b7-4ab1-b3d3-f0c5715c1edc', 'wroker2@hotmail.com', 'test123', 'WORKER'), 
('f64a182b-f656-4809-b8b1-c9cd75f2924b', 'wroker3@hotmail.com', 'test123', 'WORKER'), 
('f27bc27b-7bf9-45d7-90a8-8a601c4d776d', 'wroker4@hotmail.com', 'test123', 'WORKER'), 
('73aa3e7d-5680-4fd9-9ad8-7e161ea0bae2', 'client1@hotmail.com', 'test123', 'CLIENT'), 
('5d2ae656-72f4-4480-a1aa-a520f9852d46', 'client2@hotmail.com', 'test123', 'CLIENT'), 
('07539cc3-5595-4e77-8be8-46edb69f8372', 'client3@hotmail.com', 'test123', 'CLIENT'), 
('a6235d9b-2c28-4754-bc03-1d1dc780a985', 'client4@hotmail.com', 'test123', 'CLIENT');

INSERT INTO `worker` (`uuid`, `name`, `surname`, `street`, `code`, `town`, `birthday`, `phone`, `pesel`, `date_of_employment`, `certificates`, `account_uuid`) VALUES 
('b3ad495d-3acd-47e0-84a5-6c9e4c8417a9', 'Anna', 'Wąsik', 'Modrzewiowa 20', '31-450', 'Stalowa Wola', '1970-10-01', '787878787', '70100100693', '2020-10-01', NULL, '9cb799a5-9212-474f-a0c9-691ffde0d7db'),
('3ea6d2ad-c413-47ad-b6d6-6e1bede488a7', 'Aleksandra', 'Wąsik', 'Modrzewiowa 20', '31-450', 'Stalowa Wola', '1970-10-01', '787878787', '70100100693', '2020-10-01', NULL, 'c49a059f-db35-475e-b387-7b37fe512260'),
('4f4e1a47-5d05-4441-8287-62c687ba5c01', 'Marlena', 'Leonardo', 'Stuart 23210', '12-213', 'Stalowa Wola', '1923-10-01', '787878787', '70100100693', '2020-10-01', NULL, '81987a53-89b7-4ab1-b3d3-f0c5715c1edc'),
('2c4abc41-079a-4366-bb41-aded977754b1', 'Weronika', 'Keitha', 'Avenue 2021', '12-111', 'Stalowa Wola', '1912-10-01', '787878787', '70100100693', '2020-10-01', NULL, 'f64a182b-f656-4809-b8b1-c9cd75f2924b'),
('879ed9fb-8ac7-45e2-9924-7471dcab1e17', 'Klaudia', 'Simone', 'Fancher 32120', '32-333', 'Stalowa Wola', '1932-10-01', '787878787', '70100100693', '2020-10-01', NULL, 'f27bc27b-7bf9-45d7-90a8-8a601c4d776d');

INSERT INTO `service` (`uuid`, `type`, `name`, `description`, `price`, `time`, `advices`, `promotion_uuid`) VALUES 
('d4c5411d-10d7-4319-bf23-8b341bcb27f0', 'Makijaż Okolicznościowy','Doklejanie Rzęs',NULL, '30', '15', NULL, NULL),
('7696c0db-a3e9-49d7-b2fd-d1b9405d16e5', 'Makijaż Okolicznościowy','Makijaż Próbny',NULL, '100', '15', NULL, NULL),
('029c34b1-cb46-4e7e-93a7-ca8b124d6de2', 'Makijaż Okolicznościowy','Makijaż Ślubny',NULL, '150', '30', NULL, NULL),
('eb209883-be92-4ff6-927b-461552939b16', 'Makijaż Okolicznościowy','Makijaż Fotograficzny',NULL, '100', '60', NULL, NULL),
('44cee85f-54ac-4bf7-9c1f-d2eb383aec4a', 'Makijaż Okolicznościowy','Makijaż Dzienny',NULL, '100', '60', NULL, NULL),
('e9feb703-388f-41b4-91ae-a5566f714198', 'Makijaż Okolicznościowy','Makijaż Sylwestrowy',NULL, '100', '45', NULL, NULL),
('e5152a68-83a9-4a52-b297-924c2f77561d', 'Karboksyterapia','Twarz',NULL, '250', '45', NULL, NULL),
('3ba022b3-2a39-4360-b532-a91244a6a35f', 'Karboksyterapia','Dekolt',NULL, '150', '30', NULL, NULL),
('51a3bb8a-61c4-4075-a80d-14dc354f089b', 'Karboksyterapia','Podbródek',NULL, '100', '15', NULL, NULL),
('ea6c1bb3-30ff-4a05-bdb1-906b8d4d82ef', 'Karboksyterapia','Okolice Oczu',NULL, '150', '60', NULL, NULL),
('b2ca82f0-d223-46ff-903a-44d8a7171525', 'Karboksyterapia','Skóra Głowy',NULL, '200', '60', NULL, NULL),
('6b1ca333-1cf8-47d6-85ca-80a097178892', 'Mezoterapia','FXBC-Body (Ciało)',NULL, '500', '60', NULL, NULL),
('5d419e06-09f1-4a73-aac0-d61e3a78f018', 'Mezoterapia','F-Vitamin C',NULL, '300', '45', NULL, NULL),
('578c6e45-32ef-472f-9709-7b9a43e747b5', 'Mezoterapia','FXFC - Rozświetlenie',NULL, '400', '15', NULL, NULL),
('923ff0cb-7f2e-4d7a-9779-a2aaa7ae76f2', 'Mezoterapia','F-Vitamin Ace',NULL, '250', '30', NULL, NULL),
('181a1419-254b-49c6-9eb7-13ffa0a37686', 'Mezoterapia','F-Lift+Face',NULL, '500', '60', NULL, NULL),
('9eb5111d-d728-4d3e-ae8a-ccc84b2d8993', 'Mezoterapia','F-Ha+ (Kwas Hialuronowy)',NULL, '350', '30', NULL, NULL),
('ae5d1361-f426-4434-adf8-4688a553c5ac', 'Mezoterapia','F-Eye Contour Fusion',NULL, '250', '15', NULL, NULL),
('37b7cb67-fc67-4c24-8bed-ee57752a6df1', 'Kosmetyka z Aparaturą','Kawitacja','BEZBOLESNE OCZYSZCZANIE SKÓR WRAŻLIWYCHL', '150', '60', NULL, NULL),
('345d43fb-70de-4405-b6f0-cfe1a8231839', 'Kosmetyka z Aparaturą','Mezoterapia Mikroigłowa BDR','BEAUTY DEFECT REPAIR – ALTERNATYWA ZABIEGÓW CHIRURGII ESTETYCZNEJ', '350', '45', NULL, NULL),
('8a715f67-3746-4427-aaa6-20804b190701', 'Kosmetyka z Aparaturą','Mikrodermabrazja','BEZBOLESNE OCZYSZCZANIE GŁOWICĄ DIAMENTOWĄ', '150', '30', NULL, NULL),
('6016050f-34e2-488b-9f7d-87e76bc81b09', 'Kosmetyka z Aparaturą','Zabiegi Liftingujące Sculptor II Focus RF3D V.2','FOCUS TECHNOLOGY RF TO BEZINWAZYJNY TERMOLIFTING', '300', '15', NULL, NULL),
('cf1ace1b-9015-44d1-9638-3d81e62c35df', 'Pielęgnacja Twarzy','Zabieg Migdałowy Natinuel','KURACJA ODMŁADZAJĄCO REGENERUJĄCA, WYRÓWNUJE I UTRWALA OPALENIZNĘ CHRONI DNA KOMÓREK, NAWILŻA I UJEDNOLICA KOLORYT SKÓRY', '150', '60', NULL, NULL),
('2ce2d3b2-33c8-4f50-be21-29fd2abaee39', 'Pielęgnacja Twarzy','Zabiegi Pielęgnacyjne Anna Lotan-Pro','TWARZ-SZYJA-DEKOLT DOSKONAŁA TOLERANCJA, KLUCZOWA FORMUŁA WYSOCE WYSELEKCJONOWANYCH MINERALNYCH SKŁADNIKÓW (BIOMIMETYKI)', '150', '60', NULL, NULL),
('86351a01-ff9b-4e1d-86a0-389fab403d9b', 'Pielęgnacja Twarzy','Zabiegi Stymulujące OnMacabim','TWARZ-SZYJA-DEKOLT CERTYFIKOWANA JAKOŚĆ NANOTECHNOLOGII, DOBIERZEMY ODPOWIEDNIĄ UNIKATOWĄ LINIĘ MODUŁOWĄ DLA POTRZEB TWOJEJ SKÓRY', '180', '30', NULL, NULL),
('8898d2ed-83cd-4de9-9210-4a557fe86f94', 'Pielęgnacja Twarzy','Leczniczy Zabieg Cer Trądzikowych','PS MED C.P.R. – NA BAZIE AKTYWATORÓW I STABILIZATORÓW SKÓRY', '150', '30', NULL, NULL),
('4a1524d8-bce9-4335-9ad6-e722e77f0e1c', 'Pielęgnacja Twarzy','Głęboki Zabieg Oczyszczenia','Z INIEKCJĄ ZASKÓRNIKÓW ZAMKNIĘTYCH', '150', '45', NULL, NULL),
('c100f763-b82d-47a9-a42e-1d5ce3ef7777', 'Pielęgnacja Twarzy','Klasyczny Zabieg Oczyszczenia','Z WYKORZYSTANIEM CIŚNIENIA OSMOTYCZNEGO SKÓRY ANNA LOTAN', '150', '30', NULL, NULL),
('f926de96-6e24-4d29-8d17-1dc3d3fb0402', 'Kosmetyka Twarzy','Depilacja Wąsika','WOSKOWANIE', '15', '15', NULL, NULL),
('40d8c514-3273-4faa-ad51-f18d61498ce6', 'Kosmetyka Twarzy','Henna Brwi Pudrowa','POŻĄDANY ODCIEŃ, MAPOWANIE BRWI, STYLIZACJA, REGULACJA WOSKIEM I PĘSETĄ', '80', '60', NULL, NULL),
('447140f0-3e9c-478c-bad4-562f65355181', 'Kosmetyka Twarzy','Pakiet Henna Z Regulacją','ZAWIERA WSZYSTKIE POWYŻSZE USŁUGI', '40', '30', NULL, NULL),
('a316c388-be57-46ac-bc63-000ddfd0dd02', 'Kosmetyka Twarzy','Regulacja Brwi','WOSK/PĘSETKA, DOBÓR KSZTAŁTU', '15', '30', NULL, NULL),
('801e33ec-4ea1-42e9-af1a-6601c6fc065f', 'Kosmetyka Twarzy','Henna Rzęs','CZARNA PROSZKOWAll', '15', '30', NULL, NULL),
('2ca7974e-18d4-4980-9c10-8fcedce09044', 'Kosmetyka Twarzy','Henna Brwi Proszkowa', 'POŻĄDANY ODCIEŃ', '15', '15', NULL, NULL);

INSERT INTO `unregistered_client` (`uuid`, `name`, `surname`, `phone`) VALUES
('5afbf76f-b08f-4742-b288-a5a962df3998', 'Emma', 'Smith', '669155131'),
('e9a5331e-b34c-4407-8a0b-c6c2464ce192', 'Olivia', 'Johnson', '432654876'),
('c1497e5c-1deb-4925-a4e8-092298fc930b', 'Ava', 'Williams', '765543432'),
('4fe88810-6cf5-4aff-b09b-5e30815e675a', 'Isabella', 'Brown', '432543654'),
('643d96d6-42d3-4a60-9b63-2ca92360b839', 'Amelia', 'Jones', '765543432'),
('daefcb3c-84af-4768-97db-a5f3d56aca19', 'Harper', 'Miller', '543543567'),
('57d82d69-eff0-44a1-8058-5731abdee50b', 'Evelyn', 'Davis', '666554556');

INSERT INTO `promotion` (`uuid`, `name`, `description`, `price`, `precent`) VALUES
('ee8fe530-cba1-47ef-8e28-5387d96674e1', 'PROMOCJA ZIMA', NULL, '20', NULL);

INSERT INTO `client` (`uuid`, `name`, `surname`, `street`, `code`, `town`, `birthday`, `phone`, `account_uuid`) VALUES 
('313ea5f2-7053-430d-b0ee-f2ef30104606', 'Aditi', 'Pope', 'Gilded Lane 23', '31-500', 'Haran', '2020-10-01', '693258147', '73aa3e7d-5680-4fd9-9ad8-7e161ea0bae2'),
('eb0f6630-2147-4452-8405-a8761f854da5', 'Lewie', 'Terry', 'Avenue Lane 21', '31-500', 'Cirencester', '2020-10-01', '693258147', '5d2ae656-72f4-4480-a1aa-a520f9852d46'),
('a88dc2ed-1723-4cb2-84a2-4127cb6c6483', 'Aaisha', 'Marquez', 'Bard Lane 321', '31-500', 'MillerVille', '2020-10-01', '693258147', '07539cc3-5595-4e77-8be8-46edb69f8372'),
('ba672302-b288-4a93-b7ed-edf5b837c34a', 'Jevon', 'Cousins', 'Clarity Lane 32', '31-500', 'Bradfordshire', '2020-10-01', '693258147', 'a6235d9b-2c28-4754-bc03-1d1dc780a985');

INSERT INTO `absence` (`uuid`, `date_from`, `date_to`, `reason`, `worker_uuid`, `status`) VALUES
('c207f89c-a52f-4902-9de6-3c51e6e59fba', '2020-10-11', '2020-10-16', 'Choroba', '2c4abc41-079a-4366-bb41-aded977754b1', 'CONFIRMED'),
('397c9682-0309-4e2f-b341-92d252ab303a', '2020-10-18', '2020-10-24', 'Choroba', 'b3ad495d-3acd-47e0-84a5-6c9e4c8417a9', 'CONFIRMED');

INSERT INTO `service_worker` (`service_uuid`, `worker_uuid`) VALUES 
('d4c5411d-10d7-4319-bf23-8b341bcb27f0', '2c4abc41-079a-4366-bb41-aded977754b1'),
('7696c0db-a3e9-49d7-b2fd-d1b9405d16e5', '2c4abc41-079a-4366-bb41-aded977754b1'),
('029c34b1-cb46-4e7e-93a7-ca8b124d6de2', '2c4abc41-079a-4366-bb41-aded977754b1'),
('eb209883-be92-4ff6-927b-461552939b16', '2c4abc41-079a-4366-bb41-aded977754b1'),
('44cee85f-54ac-4bf7-9c1f-d2eb383aec4a', '2c4abc41-079a-4366-bb41-aded977754b1'),
('e9feb703-388f-41b4-91ae-a5566f714198', '2c4abc41-079a-4366-bb41-aded977754b1'),
('d4c5411d-10d7-4319-bf23-8b341bcb27f0', 'b3ad495d-3acd-47e0-84a5-6c9e4c8417a9'),
('7696c0db-a3e9-49d7-b2fd-d1b9405d16e5', 'b3ad495d-3acd-47e0-84a5-6c9e4c8417a9'),
('029c34b1-cb46-4e7e-93a7-ca8b124d6de2', 'b3ad495d-3acd-47e0-84a5-6c9e4c8417a9'),
('eb209883-be92-4ff6-927b-461552939b16', 'b3ad495d-3acd-47e0-84a5-6c9e4c8417a9'),
('44cee85f-54ac-4bf7-9c1f-d2eb383aec4a', 'b3ad495d-3acd-47e0-84a5-6c9e4c8417a9'),
('e9feb703-388f-41b4-91ae-a5566f714198', 'b3ad495d-3acd-47e0-84a5-6c9e4c8417a9'),
('d4c5411d-10d7-4319-bf23-8b341bcb27f0', '3ea6d2ad-c413-47ad-b6d6-6e1bede488a7'),
('7696c0db-a3e9-49d7-b2fd-d1b9405d16e5', '3ea6d2ad-c413-47ad-b6d6-6e1bede488a7'),
('029c34b1-cb46-4e7e-93a7-ca8b124d6de2', '3ea6d2ad-c413-47ad-b6d6-6e1bede488a7'),
('eb209883-be92-4ff6-927b-461552939b16', '3ea6d2ad-c413-47ad-b6d6-6e1bede488a7'),
('44cee85f-54ac-4bf7-9c1f-d2eb383aec4a', '3ea6d2ad-c413-47ad-b6d6-6e1bede488a7'),
('e9feb703-388f-41b4-91ae-a5566f714198', '3ea6d2ad-c413-47ad-b6d6-6e1bede488a7');

INSERT INTO `appointment` (`uuid`, `date`, `hour`, `status`, `worker_uuid`, `client_uuid`, `unregistered_client_uuid`, `service_uuid`, `price`) VALUES 
('58c209c6-45c8-4534-a5fc-a4b4296b09ca', '2020-10-14', '10:00:00', 'CONFIRMED', 'b3ad495d-3acd-47e0-84a5-6c9e4c8417a9', '313ea5f2-7053-430d-b0ee-f2ef30104606', NULL, '801e33ec-4ea1-42e9-af1a-6601c6fc065f', '100'),
('4b7e4891-f383-4e07-8366-84affe20a7d2', '2020-10-14', '12:00:00', 'CONFIRMED', 'b3ad495d-3acd-47e0-84a5-6c9e4c8417a9', '313ea5f2-7053-430d-b0ee-f2ef30104606', NULL, '801e33ec-4ea1-42e9-af1a-6601c6fc065f', '100'),
('fdacf5b4-f63a-4152-aa4c-c17e702baf39', '2020-10-14', '16:00:00', 'CONFIRMED', 'b3ad495d-3acd-47e0-84a5-6c9e4c8417a9', '313ea5f2-7053-430d-b0ee-f2ef30104606', NULL, '801e33ec-4ea1-42e9-af1a-6601c6fc065f', '100'),
('11241a2b-3301-4c6f-9aac-1b7667f93791', '2020-10-14', '10:00:00', 'REJECTED', 'b3ad495d-3acd-47e0-84a5-6c9e4c8417a9', '313ea5f2-7053-430d-b0ee-f2ef30104606', NULL, '801e33ec-4ea1-42e9-af1a-6601c6fc065f', '100'),
('ae03a0b0-ca90-4e0e-9eb0-8b4082142bc1', '2020-11-04', '10:00:00', 'CONFIRMED', 'b3ad495d-3acd-47e0-84a5-6c9e4c8417a9', '313ea5f2-7053-430d-b0ee-f2ef30104606', NULL, '801e33ec-4ea1-42e9-af1a-6601c6fc065f', '100');

INSERT INTO `notification` (`uuid`, `to_account_uuid`, `date`, `notification_text`, `from_account_uuid`, `type`, `status`) VALUES
('5747e0b9-ef9f-4658-891d-145476f0d91b', '9cb799a5-9212-474f-a0c9-691ffde0d7db', '2020-10-11', 'Przykładowy tekst 01', NULL, 'SYSTEM', 'CONFIRMED'),
('428897dd-fc3c-47d4-850f-7750487edd10', '9cb799a5-9212-474f-a0c9-691ffde0d7db', '2020-10-12', 'Przykładowy tekst 02', NULL, 'SYSTEM', 'DELETED'),
('4a3c10af-2ea4-4ecf-8646-b579622e5180', '9cb799a5-9212-474f-a0c9-691ffde0d7db', '2020-10-13', 'Przykładowy tekst 03', NULL, 'SYSTEM', 'DELETED'),
('5870b29c-92bd-483f-ae66-393f5d479dd9', '9cb799a5-9212-474f-a0c9-691ffde0d7db', '2020-10-14', 'Przykładowy tekst 04', NULL, 'SYSTEM', 'CONFIRMED'),
('b41a8d96-1f31-4e6d-bb88-d4b3c638c0be', '9cb799a5-9212-474f-a0c9-691ffde0d7db', '2020-10-15', 'Przykładowy tekst 05', NULL, 'SYSTEM', 'NOT_CONFIRMED'),
('41a948f7-0de4-4f71-af62-f7bd4f6d8762', '9cb799a5-9212-474f-a0c9-691ffde0d7db', '2020-10-16', 'Przykładowy tekst 06', NULL, 'SYSTEM', 'CONFIRMED'),
('3071d111-80f3-4722-aa5c-16a1494b5420', '9cb799a5-9212-474f-a0c9-691ffde0d7db', '2020-10-17', 'Przykładowy tekst 07', NULL, 'SYSTEM', 'NOT_CONFIRMED'),
('2f97fd3e-0d93-40e8-bf2e-dca9cf5742eb', '9cb799a5-9212-474f-a0c9-691ffde0d7db', '2020-10-09', 'Przykładowy tekst 08', NULL, 'SYSTEM', 'NOT_CONFIRMED'),
('e2aab0ce-57f9-4687-99d5-235b68d6d9cf', '9cb799a5-9212-474f-a0c9-691ffde0d7db', '2020-10-17', 'Przykładowy tekst 09', "9cb799a5-9212-474f-a0c9-691ffde0d7db", 'FROM_USER', 'NOT_CONFIRMED'),
('f2ec1567-a10f-4664-b53c-d045bd85227e', '9cb799a5-9212-474f-a0c9-691ffde0d7db', '2020-10-22', 'Przykładowy tekst 10', "f27bc27b-7bf9-45d7-90a8-8a601c4d776d", 'FROM_USER', 'NOT_CONFIRMED'),
('10acba15-8192-4358-aaaf-093b843dba0b', '9cb799a5-9212-474f-a0c9-691ffde0d7db', '2020-10-12', 'Przykładowy tekst 11', "c49a059f-db35-475e-b387-7b37fe512260", 'FROM_USER', 'NOT_CONFIRMED'),
('450dd528-27aa-43a2-8e5c-a66fba3fb058', '9cb799a5-9212-474f-a0c9-691ffde0d7db', '2020-10-13', 'Przykładowy tekst 12', "c49a059f-db35-475e-b387-7b37fe512260", 'FROM_USER', 'NOT_CONFIRMED'),
('463891ae-2563-48c0-878f-d7baa1198fb4', '9cb799a5-9212-474f-a0c9-691ffde0d7db', '2020-10-11', 'Przykładowy tekst 13', "5d2ae656-72f4-4480-a1aa-a520f9852d46", 'FROM_CLIENT', 'NOT_CONFIRMED'),
('79aec34a-c204-413b-b9cf-3a7eae561df2', '9cb799a5-9212-474f-a0c9-691ffde0d7db', '2020-10-12', 'Przykładowy tekst 14', "07539cc3-5595-4e77-8be8-46edb69f8372", 'FROM_CLIENT', 'NOT_CONFIRMED');

INSERT INTO `product_for_sell` (`uuid`, `name`, `description`, `price`, `amount`, `promotion_uuid`) VALUES 
('cdcf0f9d-d160-4688-8054-e0478f5959d6', 'LIRENE RETINOL D-FORTE', 'PREPARAT ODMŁADZAJĄCY', '99,99', '20', NULL),
('3cc40d8e-0cf7-4065-ae32-f9a10c963442', 'Krem BLUE DIAMOND Colway', 'PREPARAT DO CERY SUCHEJ', '199,99', '30', NULL),
('74484c55-7c98-4870-ae80-6cd61e233978', 'COLWAY', 'Atelomaska na noc w saszetkach', '219,99', '3', NULL),
('5857e741-1b05-4049-ae3d-1c49dfbcaff4', 'MARY KAY', 'INTENSYWNIE REGENERUJĄCY KREM POD OCZY', '329,99', '5', NULL),
('97392c68-0eb8-4daf-867b-b12898d8f238', 'MARY KAY KREM NAWILŻAJĄCO', 'PREPARAT ODMŁADZAJĄCY ', '329,99', '20', NULL),
('0a9e8692-f32d-41fc-b745-ad4c1e98f3de', 'TimeWise', 'REGENERUJĄCY ', '439,99', '60', NULL),
('b5a493fe-72dd-499b-8b87-27422fdc6128', 'B-Scrub PRO', 'BEAUTIFLY Peeling kawitacyjny', '49,99', '30', NULL);

INSERT INTO `product_for_use` (`uuid`, `name`, `description`, `price`, `amount`, `code`) VALUES 
('53c61feb-6373-40a2-bf68-72b0dad25a52', 'NTN 93 Deserts Collection', 'lakier hybrydowy', '19.99', '25', '4234231'),
('59088d84-5626-41c4-bf31-4afb2d84b5f4', 'NTN 89 Multicolor Collection', 'lakier hybrydowy', '19.99', '25', 'f32342423'),
('4b72dfc4-4cac-4d78-bae2-f47e2fe2478f', 'SEMILAC LAKIER HYBRYDOWY', 'lakier hybrydowy', '29.99', '215', 'few3242'),
('4dc5cb15-7be5-4bba-b26b-cf4e3bc3172d', 'UV CLAVIER 7,5', 'lakier hybrydowy', '39.99', '21', '234d3d23rf'),
('64f523fc-9d3e-4125-a06e-a17e7e643775', 'SUNONE', 'lakier hybrydowy', '29.99', '32', 'gfdg4325ffd43342'),
('0f8cd99e-5992-4be2-b871-85c2d7c805f5', 'SEMILAC ', 'lakier hybrydowy', '321.99', '4', 'sdt3425'),
('b7404c31-0d6a-420a-9230-e967a6159ccd', 'NeoNail RED', 'lakier hybrydowy', '23.99', '23', 'dsggd3g43'),
('3137a3f7-3f83-434c-8501-49561ef74346', 'NeoNail DEA', 'lakier hybrydowy', '432.99', '3', 'fsewr324'),
('905236d5-2a87-42a8-9c34-53f6ad814d17', 'NeoNail DAX', 'lakier hybrydowy', '43.99', '7', 'sfewer324'),
('2b1962e3-1d29-442c-a506-7d144e219289', 'NeoNail DSH', 'lakier hybrydowy', '43.99', '5', 'fwerw234');

INSERT INTO `report` (`uuid`, `type`, `title`, `description`, `date`, `worker_uuid`) VALUES 
('7ccdd530-d344-411a-b50f-40195e8dc9b2', 'SPORALA', 'Title 01', 'Description 01', '2020-10-15', '2c4abc41-079a-4366-bb41-aded977754b1'),
('a76fa308-c061-49e0-bebe-ab6552763f98', 'SPORALA', 'Title 02', 'Description 02', '2020-10-16', '2c4abc41-079a-4366-bb41-aded977754b1'),
('7dc44665-9445-4e71-85f1-a8f634d04838', 'SPORALA', 'Title 03', 'Description 03', '2020-10-17', '2c4abc41-079a-4366-bb41-aded977754b1'),
('16e48e8c-76ba-41b2-a459-7aa458f57a5f', 'SPORALA', 'Title 04', 'Description 04', '2020-10-18', '2c4abc41-079a-4366-bb41-aded977754b1'),
('8b615564-efd1-41a6-a156-06aac4857eda', 'SPORALA', 'Title 05', 'Description 05', '2020-10-19', '2c4abc41-079a-4366-bb41-aded977754b1'),
('5fb1bf11-45fd-4b62-8840-50850ae47436', 'SPORALA', 'Title 06', 'Description 06', '2020-10-20', '2c4abc41-079a-4366-bb41-aded977754b1'),
('5f0a6164-ec11-4732-8a0e-1d8a489d7f02', 'SPORALA', 'Title 07', 'Description 07', '2020-10-21', '2c4abc41-079a-4366-bb41-aded977754b1'),
('5220511a-a251-4a3d-9c5d-1fe7a224c84c', 'SPORALA', 'Title 08', 'Description 08', '2020-10-22', '2c4abc41-079a-4366-bb41-aded977754b1'),
('92486ec6-8f29-4433-a1c7-6f81576f44e4', 'SPORALA', 'Title 09', 'Description 09', '2020-10-23', '2c4abc41-079a-4366-bb41-aded977754b1'),
('7fa2ae30-e9f2-476e-b545-8a134b8cb722', 'SPORALA', 'Title 10', 'Description 10', '2020-10-24', '2c4abc41-079a-4366-bb41-aded977754b1'),
('790c011f-186b-4208-b1c9-f0b970929d52', 'SPORALA', 'Title 11', 'Description 11', '2020-10-25', '2c4abc41-079a-4366-bb41-aded977754b1'),
('eb5d17e8-5a8f-44e8-a8aa-586f52bc2526', 'SPORALA', 'Title 12', 'Description 12', '2020-10-26', '2c4abc41-079a-4366-bb41-aded977754b1');

INSERT INTO `machine_report` (`uuid`, `title`, `description`, `date`, `worker_uuid`) VALUES 
('1a21f926-2c98-4636-bd07-07c305653bfa', 'Tytuł 01', 'Description 02', '2020-10-01', '2c4abc41-079a-4366-bb41-aded977754b1'),
('214e0aba-d5bd-44d9-aecf-4a7b672097a7', 'Tytuł 01', 'Description 01', '2020-10-11', '2c4abc41-079a-4366-bb41-aded977754b1'),
('4a7496cc-a1bc-40ee-8dbf-7a1c79fdfbd7', 'Tytuł 02', 'Description 02', '2020-10-21', '2c4abc41-079a-4366-bb41-aded977754b1'),
('4fcdb6f0-d7f8-4bb3-9810-c68f9b197a0e', 'Tytuł 03', 'Description 03', '2020-10-22', '2c4abc41-079a-4366-bb41-aded977754b1'),
('2bd95af4-4aa1-4ab1-be29-65bec770fd9a', 'Tytuł 04', 'Description 04', '2020-10-15', '2c4abc41-079a-4366-bb41-aded977754b1'),
('87eaf4a5-2e16-4d4f-bd77-aab2a7cc9800', 'Tytuł 05', 'Description 05', '2020-10-16', '2c4abc41-079a-4366-bb41-aded977754b1'),
('3f8c212e-a3a9-44c3-ae85-ec15e159dd16', 'Tytuł 06', 'Description 06', '2020-10-17', '2c4abc41-079a-4366-bb41-aded977754b1');

INSERT INTO `trashes_report` (`uuid`, `title`, `type`, `date`, `amount`, `cost`, `worker_uuid`) VALUES
('2653edd1-d265-4a51-a009-dc78e374f0db', 'Title 01', 'TYPE_150110', '2020-10-15', '10.20', '200', '2c4abc41-079a-4366-bb41-aded977754b1'),
('4205c5dd-aae6-4817-979a-99dff7b1cd67', 'Title 02', 'TYPE_150110', '2020-10-11', '23.20', '20', '2c4abc41-079a-4366-bb41-aded977754b1'),
('f9e98f2a-0861-420d-b49d-d53bab1900e4', 'Title 03', 'TYPE_150110', '2020-10-17', '234.20', '30', '2c4abc41-079a-4366-bb41-aded977754b1'),
('24d4aa29-3db0-45ea-969a-f0ed0ad24b16', 'Title 04', 'TYPE_150110', '2020-10-18', '21.20', '40', '2c4abc41-079a-4366-bb41-aded977754b1'),
('903df92d-f23d-4709-88ff-d295c4fa42cf', 'Title 05', 'TYPE_150110', '2020-10-19', '14.20', '50', '2c4abc41-079a-4366-bb41-aded977754b1'),
('4cd7fc9a-cf7d-4d55-ae16-9add7cb3ebfb', 'Title 06', 'TYPE_150110', '2020-10-20', '345.20', '60', '2c4abc41-079a-4366-bb41-aded977754b1'),
('5a163edf-72fd-4cb6-81b5-31747dc4dbcf', 'Title 07', 'TYPE_150110', '2020-10-21-', '564.520', '70', '2c4abc41-079a-4366-bb41-aded977754b1'),
('a08e188a-f5c4-4002-91be-fec23287f919', 'Title 08', 'TYPE_150110', '2020-10-21', '543.20', '80', '2c4abc41-079a-4366-bb41-aded977754b1');

INSERT INTO `health_book` (`uuid`, `pacemaker`, `hermophilia`, `psoriasis`, `allergies`, `discoloration`, `infectious_diseases`, `blood_circulation_disorders`, `herpes`, `fever`, `pregnancy`, `weakness`, `edit_date`, `worker_uuid`) VALUES 
('fac8567f-8461-44ca-9a86-a40da6cfbcdf', '0', '0', '0', 'Brak', '0', '0', '0', '0', '0', '0', '0', '2020-05-10', 'b3ad495d-3acd-47e0-84a5-6c9e4c8417a9'),
('738302ad-4da8-497f-af16-232149421f8d', '0', '0', '0', 'Brak', '0', '0', '0', '0', '0', '0', '0', '2020-05-10', '3ea6d2ad-c413-47ad-b6d6-6e1bede488a7'),
('f36dfe93-ed2d-4521-b0a4-b0bffe97556b', '0', '0', '0', 'Brak', '0', '0', '0', '0', '0', '0', '0', '2020-05-10', '4f4e1a47-5d05-4441-8287-62c687ba5c01'),
('8216072e-a3ab-40a3-b82d-17a7d99cbb8f', '0', '0', '0', 'Brak', '0', '0', '0', '0', '0', '0', '0', '2020-05-10', '2c4abc41-079a-4366-bb41-aded977754b1'),
('dac65bf6-365d-4e37-bd6a-081439305296', '0', '0', '0', 'Brak', '0', '0', '0', '0', '0', '0', '0', '2020-05-10', '879ed9fb-8ac7-45e2-9924-7471dcab1e17');

INSERT INTO `bonuses` (`uuid`, `amount`, `date_given`, `worker_uuid`) VALUES
('1a391359-bf92-4acd-a9a7-e7dc3fc9fe86', '200', '2020-11-10', 'b3ad495d-3acd-47e0-84a5-6c9e4c8417a9');

INSERT INTO `economic_task` (`uuid`, `title`, `description`, `date_from`, `date_to`, `worker_uuid`) VALUES 
('6cf4b8fd-aea5-4cdf-9c13-677a77aedeed \r\n', 'Zadanie 01', 'Opis 01', '2020-10-18', '2020-10-24', 'b3ad495d-3acd-47e0-84a5-6c9e4c8417a9');