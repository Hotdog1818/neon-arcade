// Einfach anpassbar: Hier kannst du Quizfragen, Wahr-oder-falsch-Aussagen und Schätzfragen ändern.
window.GAME_CONTENT = {
  trivia: [
    {q:"Welcher Planet ist der Sonne am nächsten?",a:["Venus","Merkur","Mars","Jupiter"],correct:1,why:"Merkur ist der sonnennächste Planet."},
    {q:"Wie viele Herzen hat ein Oktopus?",a:["Eins","Zwei","Drei","Vier"],correct:2,why:"Ein Oktopus hat drei Herzen."},
    {q:"Wie heisst die Hauptstadt von Kanada?",a:["Toronto","Vancouver","Ottawa","Montreal"],correct:2,why:"Die Hauptstadt Kanadas ist Ottawa."},
    {q:"Welches Tier ist das grösste Säugetier?",a:["Afrikanischer Elefant","Blauwal","Giraffe","Walhai"],correct:1,why:"Der Blauwal ist das grösste bekannte Tier."},
    {q:"Wie viele Minuten hat eine Stunde?",a:["50","60","100","90"],correct:1,why:"Eine Stunde hat 60 Minuten."},
    {q:"Welche Farbe entsteht aus Blau und Gelb?",a:["Violett","Orange","Grün","Rosa"],correct:2,why:"Blau und Gelb ergeben beim Malen normalerweise Grün."}
  ],
  truefalse: [
    {q:"Blitze sind heisser als die Oberfläche der Sonne.",correct:true,why:"Ein Blitzkanal kann kurzzeitig etwa 30'000 °C erreichen."},
    {q:"Fledermäuse sind blind.",correct:false,why:"Fledermäuse können sehen und nutzen zusätzlich Echoortung."},
    {q:"Ein Oktopus hat drei Herzen.",correct:true,why:"Zwei Herzen versorgen die Kiemen, eines den Körper."},
    {q:"Die Schweiz hat einen Zugang zum Meer.",correct:false,why:"Die Schweiz ist ein Binnenstaat."},
    {q:"Honig kann bei richtiger Lagerung sehr lange haltbar bleiben.",correct:true,why:"Sein geringer Wassergehalt und seine Säure hemmen viele Mikroben."}
  ],
  estimates: [
    {q:"Wie viele Knochen hat ein erwachsener Mensch ungefähr?",answer:206,tolerance:8,unit:"Knochen"},
    {q:"Wie viele Kilometer ist der Erdumfang am Äquator ungefähr?",answer:40075,tolerance:1500,unit:"km"},
    {q:"Wie viele Sekunden hat eine Stunde?",answer:3600,tolerance:100,unit:"Sekunden"},
    {q:"Wie hoch ist der Mount Everest ungefähr?",answer:8849,tolerance:300,unit:"Meter"},
    {q:"Wie viele Zähne hat ein erwachsener Mensch normalerweise inklusive Weisheitszähne?",answer:32,tolerance:4,unit:"Zähne"}
  ],
  words: [
    {word:"COMPUTER",hint:"Damit kannst du programmieren und spielen."},
    {word:"GALAXIE",hint:"Ein riesiges System aus Sternen."},
    {word:"SCHWEIZ",hint:"Ein Land in den Alpen."},
    {word:"PIXEL",hint:"Ein winziger Bildpunkt auf einem Bildschirm."},
    {word:"MEMORY",hint:"Ein Spiel, bei dem du Kartenpaare findest."},
    {word:"ROBOTER",hint:"Eine Maschine, die Aufgaben ausführen kann."}
  ]
};
