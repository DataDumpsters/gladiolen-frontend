# Gladiolen Frontend Setup

Deze handleiding legt uit hoe u de Gladiolen frontend-applicatie kunt opzetten en configureren.

## Vereisten
- Backend en database moeten runnen
- Een IDE of editor die geschikt is voor NextJS (bijv. IntelliJ IDEA of VS Code met Java-extensies)

## Stappen om de frontend op te zetten

### 1. PNPM package manager installeren
Eerst en vooral moet je het volgende commando runnen:
npm install -g pnpm
Dit doe je in de terminal van je pc of je IDE. Op die manier wordt de pnpm package manager globaal geïnstalleerd.

### 2. Dependencies installeren
Nadien run je het commando:
pnpm install
Dit voer je uit in een terminal in de folder waar je frontend-bestanden op je pc staan. Terminal kan opnieuw geopend worden gewoon vanop je pc of in je IDE.
Bv. C:\Gladiolen\gladiolen-frontend

### 3. Frontend Applicatie Starten
Je kan de app starten in development modus door het volgende commando te runnen:
pnpm run dev
In de terminal van je IDE komt meteen een link te staan naar http://localhost:3000 waar je op kan klikken.
Als je dit via de terminal van je pc doet, moet je handmatig naar http://localhost:3000 gaan.

### 4. Inloggen
Inloggen kan je met de gegevens die je gekregen hebt op het startscherm.
Wanneer je de gegevens ingegeven hebt, krijg je de vraag een OTP-code in te geven. Als je gegevens correct zijn, zal je in de terminal van je backend (in je IDE) die code zien verschijnen
Geef de code in en je kan zonder problemen aan de slag gaan.

### 5. App builden
Wanneer de applicatie volledig afgewerkt is, moet je deze builden via het commando:
pnpm build
Nadien kan je de app dan starten met:
pnpm run

## Veelvoorkomende Problemen
1. **U heeft geen toegang, ondanks dat uw gegevens wel kloppen**  
   Vermoedelijk is er een probleem met de database en moet u de connectie in de backend oplossen.

Voor verdere vragen of ondersteuning, neem contact op met het ontwikkelteam.
```
Voor vragen over de app contacteer Matthias Van Rooy via s0173395@student.thomasmore.be
```
