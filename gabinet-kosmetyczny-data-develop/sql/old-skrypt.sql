CREATE TABLE karta_klienta 
  ( 
     id_karty      INT(8) PRIMARY KEY AUTO_INCREMENT,
     p1            BOOLEAN NOT NULL, 
     p2            BOOLEAN NOT NULL, 
     p3            BOOLEAN NOT NULL, 
     p4            BOOLEAN NOT NULL, 
     p5            BOOLEAN NOT NULL, 
     p6            BOOLEAN NOT NULL, 
     p7            BOOLEAN NOT NULL, 
     p8            BOOLEAN NOT NULL, 
     p9            BOOLEAN NOT NULL, 
     ocena_skory   CHAR(255) NOT NULL, 
     rodzaj_jakosc CHAR(255) NOT NULL, 
     wrazliwosc    CHAR(255) NOT NULL, 
     inne_uwagi    VARCHAR(5000) NULL 
  )DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE sprzet 
  ( 
     id_sprzetu     INT(8) PRIMARY KEY AUTO_INCREMENT, 
     nazwa_sprzetu  CHAR(255) NOT NULL, 
     opis_sprzetu   VARCHAR(5000) NULL, 
     data_zakupu    DATE NOT NULL, 
     data_gwarancji DATE NOT NULL, 
     uwagi          VARCHAR(5000) NULL 
  )DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; 

CREATE TABLE lista_zakupow 
  ( 
     id_listy        INT(8) PRIMARY KEY AUTO_INCREMENT, 
     data_utworzenia DATE NOT NULL, 
     opis            CHAR(255) NULL, 
     id_pracownika   INT(8) NOT NULL 
  )DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; 

ALTER TABLE lista_zakupow AUTO_INCREMENT = 1;

CREATE TABLE lista_przedmiot 
  ( 
     id_listy    INT(8) NOT NULL, 
     id_produktu INT(8) NOT NULL, 
     ilosc       INT(8) NOT NULL 
  )DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; 

CREATE TABLE wydarzenie_pracownik 
  ( 
     id_wydarzenia INT(8) NOT NULL, 
     id_pracownika INT(8) NOT NULL 
  )DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; 

CREATE TABLE wydarzenie 
  ( 
     id_wydarzenia INT(8) PRIMARY KEY AUTO_INCREMENT, 
     typ           ENUM('KONGRES', 'SZKOLENIE', 'TARGI_KOSMETYCZNE') NOT NULL, 
     nazwa         CHAR(255) NOT NULL, 
     opis          CHAR(255) NOT NULL, 
     ulica         CHAR(255) NOT NULL, 
     kod_pocztowy  CHAR(10) NOT NULL, 
     miejscowowsc  CHAR(255) NOT NULL, 
     data_od       DATE NOT NULL, 
     data_do       DATE NOT NULL, 
     kosz          INT(8) NOT NULL 
  )DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; 
