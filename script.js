// Holen des Canvas-Elements und des Kontextes
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Setze die Canvas-Größe auf die Bildschirmgröße
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variablen für das Zeichnen
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Standardwerte für den Strich
let strokeColor = '#000000'; // Standardfarbe: Schwarz
let lineWidth = 5; // Standard Strichbreite

// Funktion zum Starten des Zeichnens
function startDrawing(e) {
    isDrawing = true;
    // Mausposition relativ zum Canvas ermitteln
    const rect = canvas.getBoundingClientRect(); // Position des Canvas relativ zum Viewport
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
}

// Funktion zum Stoppen des Zeichnens
function stopDrawing() {
    isDrawing = false;
}

// Funktion zum Zeichnen
function draw(e) {
    if (!isDrawing) return; // Wenn nicht gezeichnet wird, nichts tun

    const rect = canvas.getBoundingClientRect(); // Position des Canvas relativ zum Viewport
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    // Setze die Stricheinstellungen
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;

    // Linien zeichnen
    ctx.beginPath();
    ctx.moveTo(lastX, lastY); // Beginne an der letzten Position
    ctx.lineTo(currentX, currentY); // Ziehe eine Linie zur aktuellen Mausposition
    ctx.stroke(); // Linie wird gezeichnet

    // Speichern der neuen Position
    lastX = currentX;
    lastY = currentY;
}

// Event-Listener für das Zeichnen
canvas.addEventListener('mousedown', startDrawing); // Beim Klicken der Maus
canvas.addEventListener('mousemove', draw); // Beim Bewegen der Maus
canvas.addEventListener('mouseup', stopDrawing); // Beim Loslassen der Maus
canvas.addEventListener('mouseout', stopDrawing); // Wenn Maus den Canvas verlässt

// Event-Listener für den "Löschen"-Button
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas löschen
});

// Event-Listener für die Auswahl der Strichfarbe
const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('change', (e) => {
    strokeColor = e.target.value; // Die Farbe wird auf den Wert des Auswahlfelds gesetzt
});

// Event-Listener für die Auswahl der Strichbreite
const lineWidthInput = document.getElementById('lineWidth');
lineWidthInput.addEventListener('input', (e) => {
    lineWidth = e.target.value; // Die Strichbreite wird auf den Wert des Schiebereglers gesetzt
});

// Funktion zum Senden der Zeichnung per E-Mail
const sendButton = document.getElementById('sendButton');
sendButton.addEventListener('click', () => {
    // Canvas als Bild exportieren (Base64)
    const imageData = canvas.toDataURL('image/png');

    // Mailto-Link erstellen (mit Bild als Anhang)
    const email = 'lisa_steiger@hotmail.com';
    const subject = 'Zeichnung von der Website';
    const body = 'Hier ist die Zeichnung, die Sie angefordert haben.\n\n' +
                 'Bild der Zeichnung:\n' + imageData;

    // Mailto-Link mit E-Mail, Betreff und Body erstellen
    window.location.href = mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)};
});


const saveButton = document.getElementById('saveButton');

saveButton.addEventListener('click', async () => {
    const imageData = canvas.toDataURL('image/png'); // Zeichnung als Base64-String
    const drawingText = document.getElementById('drawingText').value; // Text erfassen

    // Daten als JSON an den Server senden
    const response = await fetch('/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData, text: drawingText })
    });

    if (response.ok) {
        alert('Zeichnung gespeichert!');
        location.reload(); // Webseite neu laden
    } else {
        alert('Fehler beim Speichern!');
    }
});
