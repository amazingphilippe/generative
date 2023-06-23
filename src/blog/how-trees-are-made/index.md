---
title: Variation, mistakes, and how to draw trees.
tags: tree
media:
  tall:
    - src: tree-tall.png
      alt: A computer generated illustration of a tree. The branches randomly branch out to form a rather tall tree with many branches.
    - src: tree-tall-2.png
      alt: A different computer generated illustration of a tree. The branches randomly branch out to form a rather tall tree with many branches.
  weeping:
    - src: tree-weep.png
      alt: A computer generated illustration of a tree. The branches randomly branch out to form a wide tree. Towrds the top, branches suddenly drop dowwards to form a weeping tree.
  fractal:
    - src: tree-fractal.png
      alt: A computer generated illustration of a tree. The branches recursively branch out at the same angle relative to the previous branch. Some randomness is introduced by skipping some branches, rather than varying the branching angle.
  sad:
    - src: sad-bonsai.png
      alt: A computer generated illustration of a tree. The branches seek a number of invisible points forming an arch. The main trunk leans to the left at first, but comes back down on the right from the top of the tree.
---

# {{ title }}

With generative art, drawing what you have in mind rarely goes according to plan. Recently, Twitter showed me the work of Eyvind Earles, and I immediately liked the way he rendered trees in his scenes. To describe it, it seemed like the trees originated from one point, meandered through space, and terminated very densely around a perimeter. Not unlike topiary gardens, or bonsai.

So this image stuck around in my head for a few weeks, until I had the time to put fingers on my keyboard to start generating some lines. My first instinct was to start from the fractal tree coding train challenge. It went like this.

{% from "macros/image.html" import image with context %}

{{ image("tall-tree", media.tall, "The first tall tree outputs are more noisy, and not pleasantly recursive.") }}

Following the fractal tree challenge, only one thing stuck in my head. I had to draw branches recursively. Calling this a mistake is fair, but also only half of the story. Making this mistake also allowed me to find the first variation for the tree series, which I called “Tall tree”.

Next, I started playing around parameters, influencing how the recursion would stop, influencing the angles of the branches, and putting the “fire” in Firefox with my accidental infinite loops. This lead me to the weeping tree, created by influencing how taller branches can suddenly decide to move downwards.

{{ image("weeping-tree", media.weeping, "Adding parameters, the tree can weep.") }}

So now I was two variations into a series, but nowhere close to my original goals. I continued tinkering with how the recursion worked, until I figured out a mistake in how I recursively calculated the angle of my branches. And suddenly I had the third variation, much more in line with the fractal tree coding train challenge.

{{ image("fractal-tree", media.fractal, "Recursively calculating the branching angle produces a nice fractal tree.") }}

For my fourth variation, I decided to scrap pretty much everything. Calling it a variation is misleading. Looking at the inspiration for this series, I noticed some similarities with the algorithm I used in Space Colonization. The idea of this algorithm is to give a set of points, then try to reach them from a root point, that I placed at the bottom of the canvas. This is also something I’ve learned and adapted from a coding train challenge. Adding the leafs was also something pretty fun for this last iteration, but after playing around with the shape of the points, and the thickness of the trunk, I was only able to generate these sad looking bonsai trees.

{{ image("sad-bonsai", media.sad, "With a completely different algorithm, we can produce a sad bonsai tree.") }}

This concludes my journey into generative trees for now, it has a sad ending, but in a good way.
