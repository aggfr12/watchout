
var highScore = 0;
var currentScore = 0;
var collisions = 0;

// generate enemyPositions
var randomEnemyPositions = function(n) {
  var result = [];
  for(var i=0; i<n; i++) {
    result.push([Math.floor(Math.random()*780+10),
                 Math.floor(Math.random()*480)+10]);
  }
  return result;
};


// create svg element attached to body to represent gameboard
var gameBoard = d3.select("body")
                  .append("svg")
                  .classed("gameBoard", true)
                  .attr("width", 880)
                  .attr("height", 700);

var update = function(data) {

  var newCoordinates = randomEnemyPositions(20);
  // creating enemy circles
  var enemies = gameBoard.selectAll("circle")
                         .data(newCoordinates);

  var tween = function() {
    var enemyPositions = d3.select(this);

    return function(t) {
      collisionDetector(enemyPositions);
      // update current score
      currentScore += 0.01;
      d3.select(".current span").text(parseInt(currentScore));

    };
  };
  // update old elements, above enter so not run twice when first called
  enemies.transition()
         .duration(1000)
         .tween("custom", tween)
         .attr("cx", function(d) {return d[0]})
         .attr("cy", function(d) {return d[1]});

  var color = d3.scale.category10();
  // enter
  enemies.enter()
         .append("circle")
         .attr("r", 10)
         .attr("class", "enemies")
         .style("fill", function(d, i){return color(i % 10)})
         .attr("cx", function(d) {return d[0]})
         .attr("cy", function(d) {return d[1]});


};

update();
setInterval(update, 1000);


var dragPlayer = function() {
  d3.select(this).attr("cy", function() {
                    if (d3.event.y > 490) {
                      return 490;
                    } else if (d3.event.y < 10) {
                      return 10;
                    } else {
                      return d3.event.y;
                    }
                  })
                 .attr("cx", function() {
                    if (d3.event.x > 780) {
                      return 780;
                    } else if (d3.event.x < 20) {
                      return 20;
                    } else {
                      return d3.event.x;
                    }
                  });
};

// var pattern = d3.gameBoard.append("pattern")
//                           .attr("id", "img1")
//                           .attr

var drag = d3.behavior.drag().on("drag", dragPlayer);

var player = gameBoard.append("ellipse")
                      // .style("fill", "orange")
                      // .attr("xlink:href", "spaceShip.png")
                      .attr("src", "spaceShip.png")
                      .classed("player", true)
                      .attr("ry", 10)
                      .attr("rx", 20)
                      .attr("cy", 250)
                      .attr("cx", 400)
                      .call(drag);

var collisionDetector = function(enemies, i) {
  var xDist = enemies.attr("cx") - d3.selectAll("ellipse").attr("cx");
  var yDist = enemies.attr("cy") - d3.selectAll("ellipse").attr("cy");

  var proximity = parseInt(Math.sqrt(xDist * xDist + yDist * yDist));

  if (proximity <= 10) {
    collisions += 1;
    d3.select(".collisions span").text(collisions);
    if (currentScore > highScore) {
      highScore = currentScore;
      d3.select(".high span").text(parseInt(highScore));
    }
    currentScore = 0;
    // d3.select(".current span").text(currentScore);
  }

};























