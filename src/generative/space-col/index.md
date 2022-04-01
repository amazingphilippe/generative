---
title: "Space Colonization"
width: 400
height: 400
---

Draw 12 points randomly, but make sure they are equally distributed on the canvas. Using a space colonization algorithm, draw a slightly shaky line from the bottom right corner and reach each point. You can branch from the main stem.

When you reach a point, either draw a fruit or a leaf. Fruits are drawn using circles. Leaves are drawn using half of the inner loop of a Trisectrix of Maclaurin curve. The point of the loop should be aligned with the branch that reached the point.

When the algorithm fails to produce a tree longer than 30 segments, draw a yellow circle in the middle of the canvas. 
