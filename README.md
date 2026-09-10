# Gurí Cafetería — sitio web

Landing page estática (HTML + CSS + JS, sin build) para **Gurí Cafetería**, Bella Vista.
Pensada para subir a GitHub y hostear con **GitHub Pages**.

## Estructura

```
index.html            página completa
css/styles.css         estilos
js/script.js           menú móvil, animaciones, scroll reveal
assets/img/             imágenes (logo, hero, nosotros, menú, reseñas)
```

Secciones: header + nav · hero · marquee animado · nosotros · menú (carta completa) ·
reseñas de Google · footer.

## Enlaces a completar

Buscá la palabra **`REEMPLAZAR`** en `index.html`. Hay que cambiar el `href` de los
`<a>` marcados con `data-link`:

| `data-link`   | Dónde aparece                          | Poner |
|---------------|----------------------------------------|-------|
| `pedidosya`   | nav, hero, menú (x2)                    | URL del local en PedidosYa |
| `instagram`   | nav, footer                            | URL del Instagram |
| `google`      | sección reseñas                        | URL del perfil / reseñas en Google Maps |

Las **reseñas** son de ejemplo: reemplazá los bloques `<article class="review-card">`
en la sección `#resenas` por reseñas reales.

## Ver en local

Abrí `index.html` en el navegador, o levantá un server simple:

```bash
python3 -m http.server 8000
# luego abrí http://localhost:8000
```

## Publicar con GitHub Pages

1. Creá un repo en GitHub y subí estos archivos (que `index.html` quede en la raíz):
   ```bash
   git init
   git add .
   git commit -m "Sitio Gurí Cafetería"
   git branch -M main
   git remote add origin https://github.com/USUARIO/REPO.git
   git push -u origin main
   ```
2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, carpeta `/ (root)`. Guardar.
3. En 1–2 minutos queda en `https://USUARIO.github.io/REPO/`.

## Notas

- La marca aparece como **"Gurí"** en todo el sitio (el texto original mezclaba
  "Gurí" y "Gurú"; se unificó con el logo).
- Imágenes comprimidas para web (~1,3 MB en total). Si reemplazás alguna, mantené
  el mismo nombre en `assets/img/` o actualizá el `src` en `index.html`.
