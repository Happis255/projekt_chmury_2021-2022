# Projekt AWS - System Zarządzania Gabinetem Kosmetycznym

System wspomagający pracę gabinetu kosmetycznego składa się z bazy danych odpowiedzialnej za przechowywanie wszystkich niezbędnych danych do funkcjonowania firmy kosmetycznej, na przykład: dane osobowe pracowników, spis raportów i aktualności zamieszczonych w systemie czy spis wszystkich wizyt wykonanych w gabinecie. 

### Skład zespołu

- AWS, EC2, RDS                      - Anastasiia Afanasieva
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
- Odczekaj do 5 minut - sprawdź aplikację na http://localhost:4200/
- Żeby zatrzymać aplikację, uruchom polecenie `docker-compose down`
- Jeśli potrzebujemy wyczyścić dane - czyszczenie volumes - `docker volume rm $(docker volume ls -q)`
- Usunięcie nieużywanych obrazów - `docker image prune -a`

### Dostęp do bazy danych przez GUI
Dotęp do bazy danych w pracy lokalnej przez phpMyAdmin - http://localhost:8080/

## Sprawozdanie dot. systemu w AWS

### Zmiana założeń, które wynikły z trwających prac nad wdrożeniem aplikacji na AWS

Z uwagi na ograniczone możliwości związane z AWS oraz tym, że nie uzyskaliśmy kont studenckich i mieliśmy jedynie dostęp do trialowych wersji AWS oraz z uwagi na wykorzystane już zasoby w 79% (na S3 wykorzystaliśmy 100% i tym samym zablokowali nam możliwość aktualizacji części frontendowej) uznaliśmy w trakcie prac nad aplikacją webową, że:
- Zrezygnujemy z kilku postawionych kontenerów Dockerowych (serwisy backendowe) na rzecz jednego kontenera (ograniczyła nas ilość miejsca i moc EC2).
- Zrezygnowaliśmy z hostowania częsci frontowej na EC2 (system się wieszał przy buildzie image Angulara) na rzecz hostowania aplikacji frontowej satycznej na S3.
- Zrezygnowaliśmy z cognito i api gateway (brak zasobów do wykorzystania w celu ich implementacji, zapoznaliśmy się jednak od strony teoretycznej jak je zaimplementować i w jaki sposób one działają).

### Konfiguracja Bazy Danych

Dla konfiguracji i przeniesienia bazy danych aplikacji oryginalnej utworzonej przy pomocy MySQL dodaliśmy do projektu serwis RDS oraz utworzyliśmy instancję "database-chmurki". Wszystkie ustawienia byli zgodne z usługami free-tier AWS'a (DB engine ver. 8.0.23, db.t2.micro, 20 GiB allocated storage). Następnie na EC2 był zainstalowany klient MySQL, po czym połączyliśmy się przez niego z instancją RDS poprzez polecenie:
`mysql -h database-chmurki.cfysjjyc5sda.eu-west-1.rds.amazonaws.com -P 3306 -u admin -p`

Po wprowadzeniu hasła następuje połączenie z bazą. Przy pomocy `git clone` został pobrany kod źródłowy projektu, po czym poleceniem
`mysql> source file_name.sql` uruchomiliśmy poszczególne skrypty sql z gabinet-kosmetyczny-data/sql/, które utworzyli bazę na instancji RDS.

### Konfiguracja części backendowej

W celu wdrożenia mikroserwisów na AWS rozbiliśmy wcześniej przygotowany serwis Spring Boot na kilka poszczególych mikroserwisów. Każdy z takich mikroserwisów został umieszczony w przygotowanym z odpowiednim portem kontenerze Docker. Następnie wszystkie mikroserwisy zostały spięte w całość za pomocą docker-compose (plik znajduje się w repozytorium). Po zbudowaniu odpowiednich obrazów poszczególnych kontenerów i umieszczeniu ich w docker hub ich obrazy zostały pobrane na EC2 za pośrednictwem docker pull. Obrazy zostały następnie uruchomione na EC2, jednak przez jej ograniczenia sprzętowe udało nam się uruchomić jedynie 4 mikroserwisy. 

Przy większej ilości maszyna się zawieszała i należało wykonywać jej restart. Zdecvydowaliśmy się na użycie jednego obrazu dockerowego, tak zwanego all-in-one który posiadał wszystkie funkcjonalności poszczególnych mikroserwisów. Po rucuhomieniu tego konteneraz za pośrednictwerm `docker run -t -i -p 80:8083 bsms-backend-all-in-one` udało nam się uruchomić serwis backendowy na EC2. Api zostało udostępnione na adresie https://54.72.214.10/8083. Backend został również odpowiednio skonfigurowany w plikach konfiguracyjnych tak, by mógł korzystać z bazy danych AWS (plik w src\main\resources\application.properties).

### Konfiguracja części frontowej

Skonfigurowany został odpowiedni plik `environment.prod.ts` posiadający adres na wskazany serwis backendowy. Za pośrednictwem komendy npm i zainstalowane zostały wszystkie wymagane zależności aplikacji i biblioteki, z których korzysta. Przez polecenie `ng build --prod` zbudowana została aplikacja frontendowa w folderze dist, którego zawartość została umieszczona na S3. Za pośrednictwem konfiguratora utworzyliśmy stronę statyczną hostowaną na utworzonym wcześniej bucket'cie bsms-frontend-v2. Dostęp do aplikacji został nadany dla użytkowników zalogowanych w AWS i mających dostęp do projektu z uwagi na zachowanie bezpieczeńśtwa apliakcji i zablokowaniu nie powołanego do niego dostępu. Aplikacja jest dostępna pod adresem http://bsms-frontend-v2.s3-website-eu-west-1.amazonaws.com. 

## Wideoprezentacja

https://www.youtube.com/watch?v=kbneUG3hR0I

## Wnioski

Plusami wykorzystywania AWS jest jego prosty i przyjazny interfejs użytkownika. Korzystanie z GUI AWS jest stosunkowo proste, a zaimplementowane serwisy można w łatwy sposób zintegrować z resztą elementów typu RDS ponieważ firma zapewnia dobrze udokumentowane interfejsy API usług internetowych, których można użyć w celu uzyskania dostępu do platformy. AWS udostępnia ogrom funkcjonalności co również jest na plus - pozwala to na implementację dowolnej wybranej przez siebie usługi internetowej wymagającej różne poziomy zabezpieczeń czy integracji. Z AWS pracowało nam się bardzo dobrze, minusem w chwili obecnej były jedynie ograniczenia związane z darmowym kontem oraz konieczność dodania karty debetowej stwarzając przez to poczucie zagrożenia poniesienia niepożądanych, dodatkowych kosztów. Poza tym serwis, który zaimplementowaliśmy, działał poprawnie, a więc AWS spełnił nasze oczekiwania. Przez konsole mieliśmy dostęp do mikroserwisów backendowych i w łatwy sposób mogliśmy przeprowadzać debuggowanie aplikacji już hostowanej na AWS i naprawiać w niej błedy. 

