
paper.project.importSVG('luzeira.svg');
paper.project.importSVG('radii.svg');

// 0 = sun
// 1 = moon
// 2 = mercury
// 3 = venus
// 4 = mars
// 5 = jupiter
// 6 = saturn


var planets = [
  34, 77, 35, 65, 180, 93, 33
];


var radii = [
  [251, 122],
  [339, 165],
  [426, 207],
  [514, 250],
  [601, 292],
  [689, 335],
  [777, 378],
];

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

function planet_position(angle, radius) {
  var x, y;
  var a = radius[0]/2, b = radius[1]/2;

  var theta = Math.radians(angle);

  x = a * Math.cos(theta);
  y = b * Math.sin(theta);

  return new Point(x,y);
}



var path = new Path.Circle(new Point(), 10);
path.fillColor = '#007cff';

var planet = new Symbol(path);


for (var i = 0; i < planets.length; i++) {

  var delta_x = paper.view.viewSize.width / 2;
  var delta_y = paper.view.viewSize.height / 2;

  var p = planet_position(planets[i], radii[i]);
  console.log(p);
  planet.place(new Point(p.x + delta_x, p.y + delta_y));
}



project.importSVG('astrologia.svg');


