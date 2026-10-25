# NEON ARCADE — kostenloses Browsergame-Portal

Eine mobile-freundliche deutsche Gaming-Website mit lila Neon-Design. Keine Anmeldung, kein Backend, keine kostenpflichtigen Bibliotheken.

## Lokal starten
1. ZIP entpacken.
2. `index.html` im Browser öffnen.
3. Für Änderungen kannst du einen Code-Editor wie Visual Studio Code verwenden.

## Spiele
- Trivia Blitz: Multiple-Choice-Quiz
- Memory Mix: Kartenpaare finden
- Wortsalat: Wörter entschlüsseln
- Neon Clicker: 10-Sekunden-Klick-Challenge
- Reflex-Rush: Reaktionszeit testen
- Schätz mal!: Zahlen schätzen
- Wahr oder Quatsch?: Wahr/Falsch-Quiz

## Inhalte anpassen
- `games.js`: Quizfragen, Aussagen, Schätzfragen und Wörter ändern.
- `app.js`: Spiellogik, Spielnamen, Beschreibungen und Kategorien.
- `style.css`: Farben, Schriften, Abstände und responsive Darstellung.
- `index.html`: Texte und Seitenstruktur.

### Neue Quizfrage
In `games.js` unter `trivia` einen weiteren Eintrag hinzufügen:
```js
{q:"Deine Frage?",a:["Antwort A","Antwort B","Antwort C","Antwort D"],correct:1,why:"Kurze Erklärung."}
```
`correct` ist der Index der richtigen Antwort und beginnt bei 0.

### Eigene Farben
Ganz oben in `style.css` findest du CSS-Variablen wie `--bg`, `--purple`, `--pink` und `--cyan`.

## Kostenlos veröffentlichen mit GitHub Pages
1. Erstelle ein kostenloses Konto auf https://github.com/
2. Erstelle ein neues Repository, z. B. `neon-arcade`.
3. Lade alle Dateien und den Ordner `images` hoch. `index.html` muss im Hauptverzeichnis liegen.
4. Öffne **Settings → Pages**.
5. Bei **Build and deployment** wähle **Deploy from a branch**, dann `main` und `/ (root)`, und speichere.
6. Warte auf die veröffentlichte URL, die in den Pages-Einstellungen angezeigt wird.

Alternativ kannst du https://www.netlify.com/ verwenden und die entpackte Website dort veröffentlichen.

## Hinweise
- Bestwerte werden nur lokal im Browser auf dem jeweiligen Gerät gespeichert (`localStorage`). Sie werden nicht zwischen Geräten geteilt und können beim Löschen der Browserdaten verloren gehen.
- Google Fonts werden online geladen. Ohne Internet werden Ersatzschriften verwendet.
- Die Website ist statisch. Ein Admin-Panel, globale Ranglisten und synchronisierte Spielstände wären spätere Erweiterungen und benötigen zusätzliche Technik.
