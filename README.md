## Moment 1 - DT207G

Denna sida är en serverbaserad webbapplikation byggd med express och NodeJs. Syftet med
applikationen är att kunna lägga till kurser via ett formulär som kontrollerar att inmatningen är
korrekt. Är inmatningen korrekt hämtas den inmatade datan från formuläret och lagras i en
databasserver. Databasservern som har använts för detta projekt är sqlite3. Den lagrade datan
skrivs ut till skärmen med hjälp av SQL-frågor. Det som lagras i databasen är information om varje
kurs: kurskod, kursnamn, progression och länk till kursplan. Det går också att rensa tabellen i
databasen med hjälp av en SQL-fråga som kopplats ihop med en knapp för användaren.