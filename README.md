# IM3 - CurrenSea

## Über unsere Website
Wie das Meer sind auch die Devisenmärkte ständig in Bewegung. Sie steigen und fallen in Wellen. Mit CurrenSea kannst du diese Bewegungen verfolgen, verschiedene Währungen vergleichen und Trends auf einen Blick erkennen.

Unsere Website CurrenSea verwandelt komplexe Wechselkursdaten in klare, wellenförmige Visualisierungen damit du immer auf der richtigen Welle bleibst. Da wir die API von der Reserve Bank of Australia (RBA) benutzen, ist die Basis für alle Währungen der Australische Dollar (AUD).

## Learnings
### Normalize-Button:
Bei der Umsetzung des Figma-Designs in Code haben wir festgestellt, dass unsere Währungskurse aus der Datenbank ohne Anpassung leicht missverständlich wirken können. Deshalb haben wir mit Unterstützung unseres Dozenten Siro einen Normalize-Button hinzugefügt. Dieser sorgt dafür, dass die Entwicklung zweier Währungen korrekt vergleichbar dargestellt wird. Ohne die Normalisierung entsteht schnell der Eindruck, eine Währung sei deutlich stärker gefallen als die andere. Dabei liegt der Unterschied nur daran, dass die Währungen unterschiedliche Ausgangsstärken haben.

### Wellen-Design
Auf unserer Website haben wir nun weniger Wellen im Design, als auf unserem Prototypen im Figma. Das ist darauf zurückzuführen, dass das svg der Wellen breiter war als unsere Website. Dieses Problem konnten wir mit unserer Dozentin Lea beheben mithilfe von overflow-x: hidden im body vom css und container.

### Chart-Design
Aufgrunddessen, dass wir mit der Vorlage von chart.js gearbeitet haben, hat sich unser Chart-Design dementsprechend verändert. Trotzdem haben wir versucht unserem Ursprungsdesign treu zu bleiben.


## Schwierigkeiten
### Chart-Resizing
Das Responsive Design war icht nur wegen den Wellen (svg) eine Herausforderung, sondern auch wegen des Liniendiagramms, dass bei der Mobile Version anfangs immer verzerrt dargestellt wurde. Zusammen mit Lea haben wir eine Lösung dafür gefunden. Im Javascript haben wir eine neue Funktion gebaut mit initial und resize. Wenn der Screen kleiner ist als 640px wird die Höhe des Diagramms auf 275px angepasst. Wenn der Screen grösser als 640px ist, wird die Höhe auf 500px angepasst.

## Benutze Ressourcen
Mithilfe der Dozierenden, Mitschüler*innen, sowie auch KI (Chat-GPT) und Google.

![Bild hehe](https://images.steamusercontent.com/ugc/2495647088255828547/0FAD25870D78FE565C9D8A0261575BBA8F620E5A/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true)