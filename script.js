
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};


// aspects:
// conjunction (0), **NOT INCLUDED** sextile (60), square (90), trine (120), opposition (180)
function aspects(angles, positions) {
  // console.log(positions);
  var m = 7.5; // margin for aspects
  var lines = [];

  for (var who = 0; who < angles.length; who++) {
    // checks each planet with subsequent planets 
    for (var with_who = who + 1; with_who < angles.length; with_who++) {
      
      var delta = Math.abs(angles[who] - angles[with_who]);
      var line = null;
      
      // console.log(angles[who] + ' - ' + angles[with_who] + ' = ' + delta);
      
      // conjunction
      if (-m < delta && delta < m) {
        // console.log(who + '/' + with_who + ' — found a conjuction between ' + who + ' and ' + with_who);
        line = {
          'origin': positions[who],
          'end': positions[with_who],
          'type': 'conjunction'
        };
      }

      // square
      if ((90-m < delta && delta < 90+m) || (270-m < delta && delta < 270+m)) {
        // console.log(who + '/' + with_who + ' — found a square between ' + who + ' and ' + with_who);
        line = {
          'origin': positions[who],
          'end': positions[with_who],
          'type': 'square'
        };
      }

      // trine
      if ((120-m < delta && delta < 120+m) || (240-m < delta && delta < 240+m)) {
        // console.log(who + '/' + with_who + ' — found a trine between ' + who + ' and ' + with_who);
        line = {
          'origin': positions[who],
          'end': positions[with_who],
          'type': 'trine'
        };
      }

      // opposition
      if (180-m < delta && delta < 180+m) {
        // console.log(who + '/' + with_who + ' — found a opposition between ' + who + ' and ' + with_who);
        line = {
          'origin': positions[who],
          'end': positions[with_who],
          'type': 'opposition'
        };
      }

      if (line) {
        lines.push(line);
        // console.log(line);
      }

    }
  }

  return lines;
}

function planet_position(angle, radius) {
  var x, y;
  var a = radius[0]/2, b = radius[1]/2;

  var theta = Math.radians(angle);

  x = a * Math.cos(theta);
  y = b * Math.sin(theta);

  return new Point(x,y);
}


// 0 = sun
// 1 = moon
// 2 = mercury
// 3 = venus
// 4 = mars
// 5 = jupiter
// 6 = saturn


var planets = [];

for (var i = 0; i < 7; i++) {
  planets.push(Math.floor(Math.random() * 360));
}

var radii = [
  [251, 122],
  [339, 165],
  [426, 207],
  [514, 250],
  [601, 292],
  [689, 335],
  [777, 378],
];

var LUZEIRA_BLUE = '#007cff',
    PLANET_WIDTH = 10,
    ASPECT_STROKE = PLANET_WIDTH/3;

paper.project.importSVG('luzeira.svg');
// paper.project.importSVG('radii.svg');

var path = new Path.Circle(new Point(), PLANET_WIDTH);
path.fillColor = LUZEIRA_BLUE;

var planet = new Symbol(path);


var delta_x = paper.view.viewSize.width / 2;
var delta_y = paper.view.viewSize.height / 2;

var positions = [];


for (var i = 0; i < planets.length; i++) {

  var p = planet_position(planets[i], radii[i]);

  positions.push(p);
  planet.place(new Point(p.x + delta_x, p.y + delta_y));
}

var lines = aspects(planets, positions);
// console.log(lines);
for (var i = 0; i < lines.length; i++) {

  var myPath = new Path();
  myPath.strokeColor = LUZEIRA_BLUE;
  myPath.strokeWidth = ASPECT_STROKE;
  myPath.add(new Point(lines[i].origin.x + delta_x, lines[i].origin.y + delta_y));
  myPath.add(new Point(lines[i].end.x + delta_x, lines[i].end.y + delta_y));
}



project.importSVG('astrologia.svg');


