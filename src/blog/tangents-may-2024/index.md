---
title: "Tangents from May 2024"
tags: tangents
date: "2024-05-31"
media:
  mkbd:
    - src: engels.jpg
      alt: A still life with musical instruments, bottle and plant painted. Real newspaper clippings are embedded within the painting as elements of the still life. 
  dox:
    - src: mycelium-1.jpg
      alt: Colourful large format paintings of bursts of colour in the background. In the foreground, lines seem to grow from the bottom and branch as they move up the canvas. 
    - src: mycelium-2.jpg
      alt: Colourful large format paintings of bursts of colour in the background. In the foreground, lines seem to grow from the bottom and branch as they move up the canvas. 
    - src: mycelium-3.jpg
      alt: Colourful large format paintings of bursts of colour in the background. In the foreground, lines seem to grow from the bottom and branch as they move up the canvas. 
  tiger:
    - src: tiger.jpg
      alt: A tiger illustration emerges in between a geometric patern of yellow and black squares.  
  banners:
    - src: banners-1.jpg
      alt: Protest banners are displayed on a wall in a museum exhibition. 
    - src: https://ucarecdn.com/0532c116-6e0d-4254-af05-05a61e703b41/
      alt: Open book. Layout of three protest banners. The banners have been cut out of their original photos and seem to be floating across the two pages.
  ullmann:
    - src: my-ullmann.jpg
      alt: Thin green and yellow leaves are connected with thin black lines to create a wallpaper design.
    - src: space-col-1.png
      alt: A plant like shape on a white backgroud. Several orange fruits and dark green leaves hang from thin fragile branches.
  leopold:
    - src: leopold-4.jpg
      alt: Four drawings. Each drawing contains a set of coloured shapes filled in by precisely running a marker line next to one another. The shapes are organic and suggest still life compositions. 
    - src: leopold-2.jpg
      alt: A grid of curvy blue, yellow or orange shapes.
    - src: leopold-3.jpg
      alt: Two drawings on a grid. Each drawing is of several outlined squares with hash marks. One of the draweings has been cut and reorganized inside of the original grid. 
    - src: leopold-1.jpg
      alt: A gradient of thin shapes run in repetitions across the canvas. It gives the impression of a bird flying away.  
      class: vertical
  postit:
    - src: postit.jpg
      alt: A cat made from post-it notes on white paper. Framed, and displayed on a wall above a few decorations.  
---

{% from "macros/image.html" import photo with context %}

# {{title}}

Coming back from a recent trip through Leipzig, Prague and Vienna, I suddenly realize it might be a good idea to document some tangent thought I had while walking through the cities, their galleries, shops and museums. 

While I was visiting an expo of the Leipzig school at the MDBK, Hans Engels' *Still Life with Clivia and Newspapers* (1974) caught my eye by remixing some newspaper clippings within a painting. I just love to wonder if the newspaper was chosen at random, or for a very particular reason. 

{{ photo(media.mkbd) }}

Further along the journey, I was at the DOX Centre for Contemporary Art and enjoyed looking at Kamila Ženatá's *Mycelium* series. The branching structures remind me of some generative algorithm like some sort of random walk or tree structure. 

{{ photo(media.dox) }}

While visiting a Dali exhibition, I noticed this tiger composition. First the geometric pattern is quite fun to look at, but the way the tiger reveals itself through the geometric pattern inspired me to look into more collage techniques where 2 variations for 1 drawing are stacked, and masked by a 3rd drawing.

{{ photo(media.tiger, "flip") }}

While visiting the Museum of applied arts in Vienna, My Ullmann's wallpaper designs reminded me of the space colonization algorithm. I think my current implementation is limited by how I place the leaves. I wish there was a way to control a bit more the composition.

{{ photo(media.ullmann) }}

At the same museum, I really enjoyed The display of protest banners out of context. Something I have also explored years ago in some self published book. Also similar to Engel's newspaper clipping above. There's something about bringing mundane artifacts into a museum exhibit or into an art piece than I find adds depth to pretty much any subject.

{{ photo(media.banners) }}

In Leopold's museum basement were exhibited various corporate collections. I found some very cool pieces from a few artists in these collections. First Ronan Bouroullec's abstract drawings refuelled my motivation to come up with an algorithm to fill shapes using adjacent controlled lines. Ines Höllwarth's sketches also made me think that sometimes, it may be interesting to put many variations into a grid pattern to create more visually complex compositions. Dóra Maurer's *Displacements und quasibild* (1972-1982) made me think of Dali's Tiger, and how I might also try to shuffle and remix some of my sketches, either on paper or on screen. 

A few floors above in a different exhibition, Erika Giovanna Klien's *Flight of birds* (1951) colour palette was quite enjoyable to look at through the movement of the shapes. There is also something quite generative about this composition that I might try eventually. 

{{ photo(media.leopold) }}

Visiting some galleries, my wife and I also met with artist Elena Mildner and adopted one of her cat compositions made with post-its. We just fell in love with the simplicity and authenticity of her compositions, which are more difficult to come up with than you'd expect given the constraints of the medium! 

{{ photo(media.postit) }}