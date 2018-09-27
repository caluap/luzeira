

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};


// aspects:
// conjunction (0), **NOT INCLUDED** sextile (60), square (90), trine (120), opposition (180)
function aspects(angles, positions) {
  var m = 7.5; // margin for aspects
  var lines = [];

  for (var who = 0; who < angles.length; who++) {
    // checks each planet with subsequent planets 
    for (var with_whom = who + 1; with_whom < angles.length; with_whom++) {
      
      var delta = Math.abs(angles[who] - angles[with_whom]);
      var line = null;

      // conjunction
      if (-m < delta && delta < m) {
        line = {
          'origin': positions[who],
          'end': positions[with_whom],
          'type': 'conjunction'
        };
      }

      // square
      if ((90-m < delta && delta < 90+m) || (270-m < delta && delta < 270+m)) {
        line = {
          'origin': positions[who],
          'end': positions[with_whom],
          'type': 'square'
        };
      }

      // trine
      if ((120-m < delta && delta < 120+m) || (240-m < delta && delta < 240+m)) {
        line = {
          'origin': positions[who],
          'end': positions[with_whom],
          'type': 'trine'
        };
      }

      // opposition
      if (180-m < delta && delta < 180+m) {
        line = {
          'origin': positions[who],
          'end': positions[with_whom],
          'type': 'opposition'
        };
      }

      if (line) {
        lines.push(line);
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

var radii = [
  [251, 122],
  [339, 165],
  [426, 207],
  [514, 250],
  [601, 292],
  [689, 335],
  [777, 378],
];

var positions = [];

var delta_x = paper.view.viewSize.width / 2;
var delta_y = paper.view.viewSize.height / 2;

var planets_layer = new Layer(),
    aspects_layer = new Layer();
  

function plot_planets() {

  console.log('Will now draw the planets...');

  planets_layer.removeChildren();
  planets_layer.activate();
  positions = [];

  if (planets.length == 0) {
    for (var i = 0; i < 7; i++) {
      planets.push(Math.floor(Math.random() * 360));
    }
  }

  for (var i = 0; i < planets.length; i++) {
  
    var p = planet_position(planets[i], radii[i]);
  
    positions.push(p);
    
    var adjusted_point = new Point(p.x + delta_x, p.y + delta_y)
    var drawn_planet = new Path.Circle(adjusted_point, PLANET_WIDTH);
    drawn_planet.fillColor = '#007cff';
  }

}

function plot_aspects() {

  console.log('...and their aspects.');

  if (positions.length == 0) {
    plot_planets();
  }

  aspects_layer.removeChildren();
  aspects_layer.activate();

  var lines = aspects(planets, positions);
  for (var i = 0; i < lines.length; i++) {
    var myPath = new Path();
    myPath.strokeColor = '#007cff';
    myPath.strokeWidth = ASPECT_STROKE;
    myPath.add(new Point(lines[i].origin.x + delta_x, lines[i].origin.y + delta_y));
    myPath.add(new Point(lines[i].end.x + delta_x, lines[i].end.y + delta_y));
  }
  aspects_layer.bringToFront();
}




var base_layer = new Layer(),
    type_layer = new Layer();


var svgs_are_dirty = true;


function plot_images_l1() {

  base_layer.removeChildren();
  base_layer.activate();
  base_layer.importSVG('svgs/base_cartao.svg');
  base_layer.scale(2,2);

  base_layer.sendToBack();

}

function plot_images_l2() {
  type_layer.removeChildren();
  type_layer.activate();
  type_layer.importSVG('svgs/tipografia_cartao.svg');
  type_layer.scale(2,2);

  type_layer.bringToFront();

}

view.onFrame = function(event) {
  if (svgs_are_dirty) {
    plot_images_l1();

    plot_aspects();
    plot_planets();

    plot_images_l2();
  
    svgs_are_dirty = false;
  }
}