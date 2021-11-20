# Projekt AWS - System Zarządzania Gabinetem Kosmetycznym

System wspomagający pracę gabinetu kosmetycznego składa się z bazy danych odpowiedzialnej za przechowywanie wszystkich niezbędnych danych do funkcjonowania firmy kosmetycznej, na przykład: dane osobowe pracowników, spis raportów i aktualności zamieszczonych w systemie czy spis wszystkich wizyt wykonanych w gabinecie. 

### Skład zespołu

- AWS, RDS                      - Anastasiia Afanasieva
- Frontend, Docker, EC2         - Bartosz Kowalski
- Backend + Baza, AWS Cognito   - Czyżewski Eryk
- Backend + Baza, API Gateway   - Michał Kubita
- Backend + Baza, Docker, EC2   - Hubert Wąsik
 
### Tablica Sprint
https://happis255.atlassian.net/jira/software/projects/BPC/boards/5

### Wykorzystane technologie

- Java, JavaServer oraz Javax.Mail
- Angular, TypeScript, Material UI
- MySQL
- Docker

### Wykorzystane rozwiązania chmurowe

- Amazon EC2
- Amazon API Gateway
- Amazon RDS
- Amazon Cognito

### Funkcjonalności aplikacji 

- Tworzenie kont pracowników, ich edycja oraz zarządzanie uprawnieniami usługowymi przez administratora,
- Dodawanie przez administratora terminu szkoleń i kongresów kosmetycznych - wydarzeń, informacji o ich zakresie, wyświetlanie ich w systemie oraz możliwość zapisu przez  pracownika,
- Dodawanie przez administratora bądź zalogowanego w gabinecie pracownika klienta wraz z zamówioną usługą do grafiku (kalendarza), możliwość jego edycji i podglądu,
- Możliwość prowadzenia książeczki zdrowia pracowników,
- Dodawanie raportów zawierającego przebieg ostatnio wykonanego przeglądu technicznego i sporali kontrolnych (medyczne),
- Możliwość dodawania wybranych sprzętów użytkowych, informacji o nich oraz ichwyświetlanie,
- Zarządzanie odpadami – utylizacja – możliwość prowadzenia sprawozdań zarejestrowanych odpadów (data oraz ilość),
- Zarządzanie stanem magazynowym materiałów kosmetycznych w skład którego wchodzą produkty sprzedażowe i użytkowe,
- Rejestrowanie wizyt kontrolnych, takich jak sanepid, ZUS czy państwowej inspekcji pracy,
- Prowadzenie programu motywacyjnego dla pracownika – możliwość nadawania bonusów okolicznościowych i premii,
- Możliwość prowadzenia spisu wykonanych usług, kto ich wykonał oraz kwot otrzymanej zapłaty,
- Możliwość podglądu przez pracownika w swoim profilu informacji o wysokości nadchodzącej wypłaty,
- Możliwość zgłaszania prośby o przyznanie urlopu bądź poinformowanie o otrzymaniu zwolnienia lekarskiego przez pracownika administratorowi,
- Możliwość wprowadzenia zakresu zadań gospodarczych poszczególnym pracownikom,
- Możliwość przeglądania oferty usług udostępnianych przez gabinet,
- Możliwość wstępnej rezerwacji terminu wykonania wybranej usługi u wybranego pracownika,
- Możliwość rejestracji konta klienta z pozycji niezalogowanego użytkownika,
- Możliwość wprowadzania zmian przez klienta na swoim koncie,
- Możliwość zarządzania nadchodzącą wizytą przez klienta oraz informowanie wiadomością mailową o zmianie statusu,
- Możliwość korzystania z aplikacji w języku angielskim bądź polskim oraz móc wprowadzać w łatwy sposób nowy pakiet językowy.

### Diagramy
###### Diagram wstępnej architektury systemu
![Diagram wstępnej architektury systemu](https://github.com/Happis255/projekt_chmury_2021-2022/blob/master/diagramy/wstepna_architektura_systemu.PNG)

###### Diagram przypadków użycia
![Diagram przypadków użycia](https://github.com/Happis255/projekt_chmury_2021-2022/blob/master/diagramy/diagram_przypadkow_uzycia.PNG)

###### Diagram wstępnej bazy danych
![Diagram wstępnej bazy danych](https://github.com/Happis255/projekt_chmury_2021-2022/blob/master/diagramy/wstepny_diagram_bd.PNG)

###### Diagram DFD
![Diagram DFD](https://github.com/Happis255/projekt_chmury_2021-2022/blob/master/diagramy/diagram_dfd.PNG)

### Uruchomienie aplikacji lokalnie (WINDOWS)
- Pobierz i zainstaluj https://www.docker.com/products/docker-desktop
- W katalogu głównym repozytorium uruchom CMD i wykonaj polecenie `docker-compose up --build -d`
- Odczekaj do 5 minut - sprawdź aplikację na localhost:4200
