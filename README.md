# Big Lugg — Private Preview (Tankōbon)

**Not a public launch.** Concept share. Build stamp: **v4**.

Static artist site for Big Lugg (Clay Dietz). Manga-volume design. Single `index.html` + `assets/covers/`.

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Public deploy target

https://austinmink.github.io/bl-preview-7f3a9c/?v=4

Hard-refresh or use the `?v=4` query so CDN/browser cache (Pages `max-age=600`) does not serve a stale blank wipe build.
