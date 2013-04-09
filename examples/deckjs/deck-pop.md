---
title: Deck.js Template for Slidify
author: Ramnath Vaidyanathan
framework: deckjs
deckjs:
  theme: web-2.0
highlighter: highlight.js
hitheme    : solarized_light
mode : selfcontained
url:
  lib: ../../libraries
widgets: popcornjs
popcornjs:
  player: vimeo
  video: http://player.vimeo.com/video/41823197
---

# Getting Started with deck.js

---

## How to Make a Deck

1. <h3>Write Slides</h3>
   Slide content is simple HTML.
2. <h3>Choose Themes</h3>
   One for slide styles and one for deck transitions.
3. <h3>Include Extensions</h3>
   Add extra functionality to your deck, or leave it stripped down.

---

## Slides are just HTML elements with a class of slide.

```html
<section class="slide">
  <h2>How to Make a Deck</h2>
  <ol>
    <li>
      <h3>Write Slides</h3>
      <p>Slide content is simple HTML.</p>
    </li>
    <li>
      <h3>Choose Themes</h3>
      <p>One for slide styles and one for deck transitions.</p>
    </li>
    …
  </ol>
</section>
```

--- &popcorn

<section class="video" id="video">
  <div id="player" style="width: 160px; height: 120px"></div>
</section>
