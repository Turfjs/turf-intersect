turf-intersect
===
[![build status](https://secure.travis-ci.org/Turfjs/turf-intersect.png)](http://travis-ci.org/Turfjs/turf-intersect)

Find the intersection of two Polygon Features.

##Install

```sh
npm install turf-intersect
```

##Parameters
name|description
---|---
feature1|Geometry or Feature
feature2|Geometry or Feature

##Usage

```js
intersect(poly1, poly2)
```

###Example

```js
var intersect = require('turf-intersect');
var park = require('park.json');
var lake = require('lake.json');

var intersection = intersect(park, lake);
console.log(intersection);
```

