CREATE TABLE account 
  ( 
     uuid     CHAR(255) PRIMARY KEY, 
     e_mail   CHAR(255) NOT NULL, 
     password CHAR(255) NOT NULL, 
     role     ENUM('WORKER', 'ADMIN', 'CLIENT'),
     is_active BOOLEAN DEFAULT TRUE
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE worker 
  ( 
     uuid               CHAR(255) PRIMARY KEY, 
     name               CHAR(255) NOT NULL, 
     surname            CHAR(255) NOT NULL, 
     street             CHAR(255) NOT NULL, 
     code               CHAR(10) NOT NULL, 
     town               CHAR(255) NOT NULL, 
     birthday           DATE NOT NULL, 
     phone              CHAR(20) NOT NULL, 
     pesel              CHAR(20) NOT NULL, 
     date_of_employment DATE NOT NULL, 
     certificates       VARCHAR(5000) NULL,
     is_active          BOOLEAN DEFAULT TRUE,
     account_uuid       CHAR(255) NOT NULL 
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE service_worker 
  ( 
     service_uuid   CHAR(255) NOT NULL, 
     worker_uuid    CHAR(255) NOT NULL
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE service 
  ( 
     uuid           CHAR(255) PRIMARY KEY, 
     active         BOOLEAN DEFAULT TRUE,
     type           CHAR(255) NOT NULL, 
     name           CHAR(255) NOT NULL, 
     description    VARCHAR(5000), 
     price          FLOAT NOT NULL, 
     time           INT(8) NOT NULL, 
     advices        VARCHAR(5000) NULL, 
     promotion_uuid CHAR(255) NULL 
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE client 
  ( 
     uuid               CHAR(255) PRIMARY KEY, 
     name               CHAR(255) NOT NULL, 
     surname            CHAR(255) NOT NULL, 
     street             CHAR(255) NOT NULL, 
     code               CHAR(10) NOT NULL, 
     town               CHAR(255) NOT NULL, 
     birthday           DATE NOT NULL, 
     phone              CHAR(12) NOT NULL,
     account_uuid       CHAR(255) NOT NULL
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE unregistered_client
  ( 
     uuid         CHAR(255) PRIMARY KEY, 
     name         CHAR(255) NOT NULL, 
     surname      CHAR(255) NOT NULL, 
     phone        CHAR(12) NOT NULL,
     e_mail       CHAR(255) NOT NULL
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE promotion 
  ( 
     uuid        CHAR(255) PRIMARY KEY, 
     name        CHAR(255) NOT NULL, 
     description VARCHAR(5000), 
     price       FLOAT, 
     precent     INT(8),
     date_from   DATE NOT NULL, 
     date_to     DATE NOT NULL
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE product_for_sell 
  ( 
     uuid        CHAR(255) PRIMARY KEY, 
     name        CHAR(255) NOT NULL, 
     description VARCHAR(5000), 
     price       FLOAT NOT NULL, 
     amount      INT(8) NOT NULL,
     promotion_uuid CHAR(255)
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE product_for_use
  ( 
     uuid        CHAR(255) PRIMARY KEY, 
     name        CHAR(255) NOT NULL, 
     description VARCHAR(5000), 
     price       FLOAT NOT NULL, 
     amount      INT(8) NOT NULL,
     code        CHAR(255)
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE appointment 
  ( 
     uuid                     CHAR(255) PRIMARY KEY, 
     date                     DATE NOT NULL, 
     hour                     TIME NOT NULL, 
     status                    ENUM('TO_ACCEPT', 'REJECTED', 'CONFIRMED', 'FINISHED', 'CANCELLED') NOT NULL, 
     worker_uuid              CHAR(255) NOT NULL, 
     client_uuid              CHAR(255), 
     unregistered_client_uuid CHAR(255), 
     service_uuid             CHAR(255) NOT NULL, 
     price                    FLOAT NOT NULL 
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE absence 
  ( 
     uuid        CHAR(255) PRIMARY KEY, 
     date_from   DATE NOT NULL, 
     date_to     DATE NOT NULL, 
     title       CHAR(255) NOT NULL, 
     reason      CHAR(255), 
     worker_uuid CHAR(255), 
     status      ENUM('NOT_CONFIRMED', 'CONFIRMED', 'REJECTED') NOT NULL 
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 


CREATE TABLE notification 
  ( 
     uuid              CHAR(255) PRIMARY KEY, 
     to_account_uuid   CHAR(255) NOT NULL, 
     date              DATE NOT NULL, 
     notification_text VARCHAR(5000), 
     from_account_uuid CHAR(255), 
     type              ENUM('FROM_CLIENT', 'FROM_USER', 'SYSTEM') NOT NULL, 
     status            ENUM('NOT_CONFIRMED', 'CONFIRMED', 'DELETED') NOT NULL 
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE trashes_report 
  ( 
     uuid        CHAR(255) PRIMARY KEY, 
     title       CHAR(255) NOT NULL, 
     type        ENUM('TYPE_150110', 'TYPE_150107', 'TYPE_150102', 'TYPE_160214', 'TYPE_180103') NOT NULL , 
     date        DATE NOT NULL, 
     amount      FLOAT NOT NULL, 
     cost       FLOAT, 
     worker_uuid CHAR(255) NOT NULL 
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE machine_report 
  ( 
     uuid        CHAR(255) PRIMARY KEY, 
     title       CHAR(255) NOT NULL, 
     description VARCHAR(5000) NULL, 
     date        DATE NOT NULL, 
     worker_uuid CHAR(255) NOT NULL 
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE report 
  ( 
     uuid        CHAR(255) PRIMARY KEY, 
     type        ENUM ('SPORALA', 'KONTROLA_STACJI_SANITARNO_EPIDEMIOLOGICZNEJ') NOT NULL, 
     title       CHAR(255) NOT NULL, 
     description VARCHAR(5000) NULL, 
     date        DATE NOT NULL, 
     worker_uuid CHAR(255) NOT NULL 
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE health_book 
  ( 
    uuid                            CHAR(255) PRIMARY KEY, 
    pacemaker                       BOOLEAN NOT NULL,
    hermophilia                     BOOLEAN NOT NULL,
    psoriasis                       BOOLEAN NOT NULL,
    allergies                       CHAR(255) NOT NULL,
    discoloration                   BOOLEAN NOT NULL,
    infectious_diseases             BOOLEAN NOT NULL,
    blood_circulation_disorders     BOOLEAN NOT NULL,
    herpes                          BOOLEAN NOT NULL,
    fever                           BOOLEAN NOT NULL,
    pregnancy                       BOOLEAN NOT NULL,
    weakness                        BOOLEAN NOT NULL,
    edit_date                       DATE NOT NULL,
    worker_uuid                     CHAR(255) NOT NULL
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE bonuses 
  ( 
    uuid         CHAR(255) PRIMARY KEY, 
    amount       FLOAT NOT NULL,
    date_given   DATE NOT NULL,
    worker_uuid  CHAR(255) NOT NULL
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE economic_task 
  ( 
     uuid           CHAR(255) PRIMARY KEY, 
     title          CHAR(255) NOT NULL, 
     description    VARCHAR(5000) NULL, 
     date_from      DATE NOT NULL, 
     date_to        DATE NOT NULL, 
     worker_uuid    CHAR(255) NULL
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE equipment 
  ( 
     uuid               CHAR(255) PRIMARY KEY,
     name               CHAR(255) NOT NULL, 
     description        VARCHAR(5000) NULL, 
     get_date           DATE NOT NULL, 
     warranty_date      DATE NOT NULL, 
     last_check_date    DATE NOT NULL, 
     comments           VARCHAR(5000) NULL 
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE event_for_workers
  ( 
     uuid               CHAR(255) PRIMARY KEY,
     type               ENUM('CONGRESS', 'TRAINING', 'COSMETICS_TRADE_FAIR') NOT NULL, 
     name               CHAR(255) NOT NULL, 
     description        VARCHAR(5000) NULL, 
     street             CHAR(255) NOT NULL, 
     code  CHAR(10)     NOT NULL, 
     town  CHAR(255)    NOT NULL, 
     date_from          DATE NOT NULL, 
     date_to            DATE NOT NULL, 
     price              FLOAT NOT NULL
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 

CREATE TABLE worker_event_for_workers
  ( 
     event_uuid     CHAR(255) NOT NULL, 
     worker_uuid    CHAR(255) NOT NULL
  ) 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci; 