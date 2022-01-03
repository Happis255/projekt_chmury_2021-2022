USE gabinetkosmetycznydb;

ALTER TABLE worker 
  ADD FOREIGN KEY (account_uuid) REFERENCES account(uuid);

ALTER TABLE service_worker 
  ADD FOREIGN KEY (service_uuid) REFERENCES service(uuid),
  ADD FOREIGN KEY (worker_uuid) REFERENCES worker(uuid);

ALTER TABLE service 
  ADD FOREIGN KEY (promotion_uuid) REFERENCES promotion(uuid);

ALTER TABLE product_for_sell 
  ADD FOREIGN KEY (promotion_uuid) REFERENCES promotion(uuid);

ALTER TABLE client
  ADD FOREIGN KEY (account_uuid) REFERENCES account(uuid);

ALTER TABLE appointment
  ADD FOREIGN KEY (client_uuid) REFERENCES client(uuid),
  ADD FOREIGN KEY (unregistered_client_uuid) REFERENCES unregistered_client(uuid),
  ADD FOREIGN KEY (service_uuid) REFERENCES service(uuid),
  ADD FOREIGN KEY (worker_uuid) REFERENCES worker(uuid);

ALTER TABLE absence
  ADD FOREIGN KEY (worker_uuid) REFERENCES worker(uuid);

ALTER TABLE notification
  ADD FOREIGN KEY (to_account_uuid) REFERENCES account(uuid),
  ADD FOREIGN KEY (from_account_uuid) REFERENCES account(uuid);

ALTER TABLE trashes_report
  ADD FOREIGN KEY (worker_uuid) REFERENCES worker(uuid);

ALTER TABLE machine_report
  ADD FOREIGN KEY (worker_uuid) REFERENCES worker(uuid);

ALTER TABLE report
  ADD FOREIGN KEY (worker_uuid) REFERENCES worker(uuid);

ALTER TABLE health_book
  ADD FOREIGN KEY (worker_uuid) REFERENCES worker(uuid);

ALTER TABLE bonuses
  ADD FOREIGN KEY (worker_uuid) REFERENCES worker(uuid);

ALTER TABLE economic_task
  ADD FOREIGN KEY (worker_uuid) REFERENCES worker(uuid);

ALTER TABLE worker_event_for_workers
  ADD FOREIGN KEY (event_uuid) REFERENCES event_for_workers(uuid),
  ADD FOREIGN KEY (worker_uuid) REFERENCES worker(uuid);