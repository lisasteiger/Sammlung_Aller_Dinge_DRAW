// Supabase Setup (ersetze mit deinen eigenen Keys)
const SUPABASE_URL = "https://rwcdjixwvrskyktfyqoq.supabase.co"; // Deine Supabase URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3Y2RqaXh3dnJza3lrdGZ5cW9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NTQ3OTQsImV4cCI6MjA1ODEzMDc5NH0.SqHIaFw9sYtQD90JjpkdLjGxRdpYXZggD3K5RGtvnws"; // Dein Supabase Anon Key
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Canvas Setup
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

let painting = false;
let lastX = 0;
let lastY = 0;

// Canvas-Einstellungen
ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.strokeStyle = "black";

// Event Listener für Desktop (Maus)
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

// Event Listener für Touch (Mobile)
canvas.addEventListener("touchstart", startPosition);
canvas.addEventListener("touchend", endPosition);
canvas.addEventListener("touchmove", draw);

// Startet das Zeichnen (beim Drücken der Maustaste oder Touch)
function startPosition(e) {
    e.preventDefault(); // Verhindert, dass der Browser seine Standardaktionen ausführt
    painting = true;

    // Bestimme die Position, wo die Maus oder der Touch gestartet wurde
    const rect = canvas.getBoundingClientRect();
    lastX = (e.clientX || e.touches[0].clientX) - rect.left;
    lastY = (e.clientY || e.touches[0].clientY) - rect.top;

    draw(e); // Sofort das Zeichnen starten
}

// Stoppt das Zeichnen (beim Loslassen der Maustaste oder Touch)
function endPosition() {
    painting = false;
    ctx.beginPath(); // Startet einen neuen Pfad, um den aktuellen zu schließen
}

// Zeichnen auf dem Canvas
function draw(e) {
    if (!painting) return; // Zeichnen nur, wenn painting true ist

    e.preventDefault(); // Verhindert, dass der Browser scrollt oder andere Aktionen ausführt

    // Bestimme die aktuelle Maus- oder Touchposition
    const rect = canvas.getBoundingClientRect();
    const currentX = (e.clientX || e.touches[0].clientX) - rect.left;
    const currentY = (e.clientY || e.touches[0].clientY) - rect.top;

    // Zeichnen der Linie
    ctx.lineTo(currentX, currentY);
    ctx.stroke(); // Strich ziehen
    ctx.beginPath(); // Einen neuen Pfad beginnen
    ctx.moveTo(currentX, currentY); // Setze den neuen Startpunkt des Striches
}

// Funktion zum Speichern der Zeichnung in Supabase
async function saveToSupabase() {
    const text = document.getElementById("textInput").value;
    const imageData = canvas.toDataURL("image/png"); // Zeichnung als Base64 speichern

    if (!text.trim() || !imageData) {
        alert("Bitte eine Zeichnung und einen Text hinzufügen!");
        return;
    }

    // Debugging: Sicherstellen, dass das Bild korrekt generiert wurde
    console.log("Bilddaten:", imageData);

    try {
        const { data, error } = await supabase
            .from("drawings")
            .insert([{ image: imageData, text: text }]);

        if (error) {
            console.error("Fehler beim Speichern:", error.message); // Fehlerausgabe in der Konsole
            alert("Fehler beim Speichern! Siehe Konsole für Details.");
        } else {
            console.log("Gespeichert:", data); // Erfolgsausgabe in der Konsole
            alert("Erfolgreich gespeichert!");
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas löschen
            document.getElementById("textInput").value = ""; // Textfeld leeren
        }
    } catch (err) {
        console.error("Fehler bei der Supabase-Abfrage:", err);
        alert("Fehler bei der Verbindung mit Supabase. Siehe Konsole für Details.");
    }
}

// Event Listener für den "Speichern"-Button
document.getElementById("saveButton").addEventListener("click", saveToSupabase);
