# turf-intersect

[![build status](https://secure.travis-ci.org/Turfjs/turf-intersect.png)](http://travis-ci.org/Turfjs/turf-intersect)

find the intersection of spatial features


### `turf.intersect(poly1, poly2)`

Takes two Polygon features and finds their intersection.


### Parameters

| parameter | type    | description        |
| --------- | ------- | ------------------ |
| `poly1`   | Polygon | the first Polygon  |
| `poly2`   | Polygon | the second Polygon |


### Example

```js
var poly1 = turf.polygon([[
 [-122.801742, 45.48565],
 [-122.801742, 45.60491],
 [-122.584762, 45.60491],
 [-122.584762, 45.48565],
 [-122.801742, 45.48565]
]]);
poly1.properties.fill = '#0f0';
var poly2 = turf.polygon([[
 [-122.520217, 45.535693],
 [-122.64038, 45.553967],
 [-122.720031, 45.526554],
 [-122.669906, 45.507309],
 [-122.723464, 45.446643],
 [-122.532577, 45.408574],
 [-122.487258, 45.477466],
 [-122.520217, 45.535693]
]]);
poly2.properties.fill = '#00f';
var polygons = turf.featurecollection([poly1, poly2]);

var intersection = turf.intersect(poly1, poly2);

//=polygons

//=intersection
```

## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install turf-intersect
```

## Tests

```sh
$ npm test
```

