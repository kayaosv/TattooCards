# MEASUREMENTS.md — Referencia pixel-to-pixel

> Mediciones extraídas de https://www.detroit.paris/ con Playwright a viewport **1440 × 900** (DPR 1).
> Estado capturado: scroll = 0 (frame inicial del carrusel).
> Todas las medidas en píxeles CSS.

---

## 1. Viewport & background

| Prop | Valor |
|------|-------|
| Viewport ref | 1440 × 900 |
| Body bg | `rgb(0, 0, 0)` (oculto) |
| Section visible bg | `rgb(255, 255, 255)` — blanco puro |
| Color de texto principal | `rgb(0, 0, 0)` — negro puro |
| Document scrollHeight | 900 (= viewport → scroll hijack confirmado) |

---

## 2. Tipografía

### Big title — `.fat` / `.fat.snd`

| Prop | Valor |
|------|-------|
| Texto | "CRAFTING" + "CULTURE" (2 divs separados, NO un h1) |
| font-family | **Mangogrotesque** (propietaria) · fallback: Arial |
| font-size | **207 px** |
| font-weight | **700** |
| line-height | **165.6 px** (factor 0.80) |
| letter-spacing | normal |
| color | `#000000` |
| Posición línea 1 ("CRAFTING") | `x: 22, y: 58, w: 473, h: 185` |
| Posición línea 2 ("CULTURE") | `x: 22, y: 213, w: 473, h: 185` |
| Container `.div-block` | `x: 22, y: 58, w: 473, h: 425` |

**Sustituto open-source para nuestra réplica:**
- `Anton` (Google Fonts) — más condensed, peso 400 único
- `Big Shoulders Display` weight 900 — variable, más flexible (RECOMENDADO)
- `Tusker Grotesk` — exacto pero de pago
- Alternativa: usar fuente serif heavy como `Fraunces` weight 900 para diferenciarnos

### Tagline — `h1` (sí, es h1)

| Prop | Valor |
|------|-------|
| Texto | "Detroit - AI Production House in Paris, Crafting Culture for Luxury Brands." |
| font-family | Mangogrotesque, Arial, sans-serif |
| font-size | 28.8 px |
| font-weight | 700 |
| line-height | 24.48 px (factor 0.85) |
| Posición | `x: 22, y: 412, w: 317, h: 71` |

### Body / UI default

| Prop | Valor |
|------|-------|
| font-family | `Barlow, sans-serif` |
| font-size | 14.4 px |
| line-height | 21.6 px (factor 1.5) |

---

## 3. Estructura DOM del carrusel

```
.c.home               (1440 × 900, transparent)
├── .div-block        (473 × 425, top-left, contiene título + tagline)
│   ├── .fat          ("CRAFTING")
│   ├── .fat.snd      ("CULTURE")
│   └── h1            (tagline)
└── .artist_list_w    (1440 × 900, position:absolute, overflow:visible)
    └── .artist_list  (width: 0, container abstracto)
        └── 28 × .project_item.w-dyn-item  (cada item con su transform/size)
            └── a.media-link
                ├── img.media-slider-home   (placeholder estático)
                └── video.media-slider-home (lo mismo, oculto en mobile)
```

**Conteo real:** 56 elementos `.media-slider-home` en DOM = **28 cards reales** (cada card tiene img + video) + 20 thumbs como dots indicador (no son cards del carrusel).

---

## 4. Geometría del cono creciente (estado inicial)

### Tabla de 7 niveles (slot index relativo al "puntero virtual")

| Slot | W | H | Ratio | X | Y | Delta-W | Delta-H | Delta-Y |
|------|---|---|-------|---|---|---------|---------|---------|
| 0 (más chica) | 136 | 114 | 1.193 | -17 | 786 | — | — | — |
| 1 | 246 | 205 | 1.200 | 86 | 695 | +110 | +91 | -91 |
| 2 | 357 | 297 | 1.202 | 295 | 603 | +111 | +92 | -92 |
| 3 | 467 | 389 | 1.200 | 608 | 511 | +110 | +92 | -92 |
| 4 | 577 | 481 | 1.199 | 1027 | 419 | +110 | +92 | -92 |
| 5 | 687 | 572 | 1.201 | 1551 | 328 | +110 | +91 | -91 |
| 6 (full size) | **760** | **634** | **1.198** | 2074 | 266 | +73 | +62 | -62 |

### Observaciones

- **Ratio constante ≈ 1.20** (aspect ratio 6:5 vertical-ish landscape).
- **Pasos lineales** W:+110, H:+91, Y:-91 para slots 0→5.
- **Último salto (5→6) es "settle":** más corto. La card "aterriza" en su posición de máximo tamaño.
- Los slots ≥6 mantienen W=760, H=634, Y=266 (alineados horizontalmente, salen por la derecha).

### Cola horizontal de cards full-size (slots ≥6)

| Slot | X | Step |
|------|---|------|
| 6 | 2074 | — |
| 7 | 2419 | +345 |
| 8 | 2765 | +346 |
| 9 | 3110 | +345 |
| 10 | 3456 | +346 |
| 11 | 3802 | +346 |
| 12 | 4147 | +345 |
| 13 | 4493 | +346 |
| 14 | 4838 | +345 |
| 15 | 5184 | +346 |
| 16 | 5530 | +346 |
| 17 | 5875 | +345 |

**Step horizontal full-size constante: 345-346 px** (≈ 345.6 px = 760 × 0.4547).

Cards de 760 px de ancho se solapan en cola lateral: cada card empieza 345 px después de la anterior, dejando 415 px de "overlap" visual (z-index controla apilamiento).

### Translate-X fino aplicado a cada card

Cada `img.media-slider-home` lleva un `translateX` adicional pequeño que se reduce a 0 al llegar al tamaño full:

| Slot | translateX |
|------|-----------|
| 0 | -60.588 |
| 1 | -49.896 |
| 2 | -39.204 |
| 3 | -28.512 |
| 4 | -17.82 |
| 5 | -7.128 |
| 6+ | 0 |

Paso constante de **+10.692 px** por slot. Es un ajuste de **alineación horizontal sub-pixel** durante el crecimiento (probablemente para centrar el contenido dentro del padre `<a>` que tiene un ancho ligeramente menor).

---

## 5. Mecánica del scroll & loop

- Scroll vertical nativo **deshabilitado** (`document.scrollHeight === window.innerHeight`).
- Probable uso de **Lenis** o listener `wheel` custom con `preventDefault`.
- El wheel alimenta un valor `progress` que avanza/retrocede el "puntero virtual" sobre la cola de cards.
- **Loop infinito**: cards que salen por la derecha (slot creciente) reaparecen como slot 0 (esquina inferior izquierda, tamaño mínimo).
- Total de cards reales en el ciclo de Detroit: ~28. Para nuestro proyecto, target = 8-10 artistas × 5-7 obras ≈ 40-70 cards en el loop.

---

## 6. Fórmulas derivadas (para nuestra implementación)

```js
// Slot 0..5: crecimiento lineal
W(slot) = 136 + slot * 110
H(slot) = 114 + slot * 91
Y(slot) = 786 - slot * 91
TX(slot) = -60.588 + slot * 10.692

// Slot 6 (settle, full size)
W(6) = 760, H(6) = 634, Y(6) = 266, TX(6) = 0

// Slot ≥6: cola horizontal
W(s) = 760, H(s) = 634, Y(s) = 266, TX(s) = 0
X(s) = 2074 + (s - 6) * 345.6

// Slot 0..5: X calculado para preservar la diagonal
// Tabla manual (Snapshot):
// X = [-17, 86, 295, 608, 1027, 1551, 2074]
// Deltas X = [103, 209, 313, 419, 524, 523]
// Centros X = [51, 209, 473, 841, 1315, 1894, 2454]
// Delta centros = [158, 264, 368, 474, 579, 560]
// → No linear. Posible: cada card anclada al centro derecho con offset.
// Implementación práctica: usar tabla lookup para slots 0..6 (fija).
```

---

## 7. Decisiones de adaptación para TattooCard

| Aspecto | Detroit | TattooCard |
|---------|---------|------------|
| Big title | "CRAFTING CULTURE" | **"OUR ARTISTS"** |
| Tagline H1 | "Detroit - AI Production House in Paris..." | (a definir en Fase 2) |
| Header chrome | Logo + nav (TALENTS/PROJECTS/...) | **Sin header** (solo la sección aislada) |
| Total cards | ~28 | **40-70** (8-10 artistas × 5-7 obras) |
| Hover | (no documentado aún) | Overlay con nombre/alias/specialty/IG del artista |
| Bg | `#FFFFFF` | `#FFFFFF` (idem) o variante crema según mood |
| Font título | Mangogrotesque (propietaria) | Big Shoulders Display 900 / Anton / serif heavy (decidir Fase 2) |

---

## 8. Pendientes para validar en sesiones futuras

- [ ] Capturar comportamiento del scroll en frames intermedios (deltaScroll → cambio de slot).
- [ ] Velocidad: cuántos px de wheel = 1 slot avanzado.
- [ ] Easing del movimiento entre slots (lerp / spring / step).
- [ ] Z-index de las cards full-size en la cola lateral.
- [ ] Comportamiento del overlay sobre el título (z-index, blend-mode).
- [ ] Hover state real de Detroit (capturar con `mouseenter` programático).
- [ ] Responsive: medir el sitio en 768 × 1024 y 375 × 812.
