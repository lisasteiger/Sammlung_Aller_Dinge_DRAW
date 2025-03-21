footer {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
  font-size: 100%;
}
h1 {
    position: fixed;
    margin-left: 33.3%;
    line-height: 70%;
  }

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth; /* Standardmäßiges Scrollverhalten */
}
.gallery {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
    padding: 10px;
    transition: all 0.3s ease-in-out;
}
.gallery img {
    width: 100%;
    cursor: pointer;
    transition: transform 0.2s;
    margin: auto;
}
.gallery img:hover {
    transform: scale(1.05);
}
.gallery.two-columns {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 80px;
    margin: auto;
    padding-left: 50px;
    padding-right: 50px;
}

.gallery.one-column {
    grid-template-columns: 1fr;
    grid-gap: 300px;
    margin: auto;
    padding-left: 50px;
    padding-right: 50px;
    width: 50%;
}

.gallery img.active {
    z-index: 10;
    position: relative;
}

/* Temporäre Deaktivierung des sanften Scrollens */
body.no-scroll {
    scroll-behavior: auto !important;
}
