
var highScore = 0;
var currentScore = 0;
var collisions = 0;
var detectorOn = true;

var gameBoardX = window.innerWidth - 20 || document.documentElement.clientWidth - 20 || document.getElementsByTagName('body')[0].clientWidth - 20;
var gameBoardY = 700;

// generate enemyPositions
var randomEnemyPositions = function(n) {
  var result = [];
  for(var i=0; i<n; i++) {
    result.push([Math.floor(Math.random()*(gameBoardX-50)),
                 Math.floor(Math.random()*(gameBoardY-33))]);
  }
  return result;
};


// create svg element attached to body to represent gameboard
var gameBoard = d3.select("body")
                  .append("svg:svg")
                  .classed("gameBoard", true)
                  .attr("width", gameBoardX)
                  .attr("height", gameBoardY);

var update = function(data) {

  var newCoordinates = randomEnemyPositions(20);
  // creating enemy circles
  var enemies = gameBoard.selectAll("image")
                         .data(newCoordinates);

  var tween = function() {
    var enemyPositions = d3.select(this);

    return function(t) {
      if (detectorOn) {
        collisionDetector(enemyPositions);
        // update current score
        currentScore += 0.01;
        d3.select(".current span").text(parseInt(currentScore));
      }

    };
  };
  // update old elements, above enter so not run twice when first called
  enemies.transition()
         .duration(2000)
         .tween("custom", tween)
         .attr("x", function(d) {return d[0]})
         .attr("y", function(d) {return d[1]});
         // .attr("cx", function(d) {return d[0]})
         // .attr("cy", function(d) {return d[1]});

  // creates a color scale that you can randomize and assign with fill
  // var color = d3.scale.category10();
  // enter
  enemies.enter()
         .append("svg:image")
         //.attr("r", 10)
         .attr("xlink:href", "tie_fighter.png")
         .attr("class", "enemies")
         .attr("x", function(d) {return d[0]})
         .attr("y", function(d) {return d[1]})
         .attr("width", "50")
         .attr("height", "33");
         // .style("fill", function(d, i){return color(i % 10)})
         //.attr("cx", function(d) {return d[0]})
         //.attr("cy", function(d) {return d[1]});


};

update();
setInterval(update, 2000);


var dragPlayer = function() {
  d3.select(this).attr("y", function() {
                    if (d3.event.y > gameBoardY - 37) {
                      return gameBoardY - 37;
                    } else if (d3.event.y < 0) {
                      return 0;
                    } else {
                      return d3.event.y;
                    }
                  })
                 .attr("x", function() {
                    if (d3.event.x > gameBoardX - 70) {
                      return gameBoardX - 70;
                    } else if (d3.event.x < 0) {
                      return 0;
                    } else {
                      return d3.event.x;
                    }
                  });
};


var drag = d3.behavior.drag().on("drag", dragPlayer);

var player = gameBoard
                      .append("svg:image")
                      .attr("class", "player")
                      .attr("xlink:href", "millenium-falcon.gif")
                      .attr("x", gameBoardX/2 - 35)
                      .attr("y", gameBoardY/2 - 19)
                      .attr("width", "70")
                      .attr("height", "37")
                      // .append("circle")
                      // .style("fill", "orange")
                      // .attr("r", 10)
                      // .attr("ry", 10)
                      // .attr("rx", 20)
                      // .attr("cy", 250)
                      // .attr("cx", 400)
                      .call(drag);

var collisionDetector = function(enemies, i) {
  var xDist = enemies.attr("x") - d3.selectAll(".player").attr("x");
  var yDist = enemies.attr("y") - d3.selectAll(".player").attr("y");

  var proximity = parseInt(Math.sqrt(xDist * xDist + yDist * yDist));

  if (proximity <= 30) {
    collisions += 1;
    detectorOn = false;
    d3.select(".collisions span").text(collisions);
    if (currentScore > highScore) {
      highScore = currentScore;
      d3.select(".high span").text(parseInt(highScore));
    }
    gameBoard.append("svg:image")
             .attr("class","explosion")
             .attr("xlink:href", "explosion.gif")
             .attr("x", d3.selectAll(".player").attr("x")-40)
             .attr("y", d3.selectAll(".player").attr("y")-80)
             .attr("width", "142")
             .attr("height", "200");
    // gameBoard.selectAll(".explosion").remove();
    setTimeout(function() {gameBoard.selectAll(".explosion").remove(); detectorOn = true;}, 800);
    // setTimeout(removeExplosions.bind(this), 500);
    currentScore = 0;
  }

// var removeExplosions = function() {
//   gameBoard.selectAll(".explosion").remove();
// };

};























