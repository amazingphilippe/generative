---
title: "Grow Fill"
width: 400
height: 400
hide: false
# overflow: true
series:
flow: algo
tags:
---

Start with a square filling most of the canvas. The goal is to fill the square as much as possible, so that the shape emmerges as a square. You can only use lines, and lines cannot draw the contour of the square. Using a Voronoi tesselation grid, fill each cell with a set of branching line heading from the cells outer shape towards its center. When lines intersect, avoid crossing and merge the lines. Sometimes, you may split a line. Using various levels of randomness and density, observe how the shape is filled with conflicting lines. Yet, the whole makes a square. What would other shapes look like?
