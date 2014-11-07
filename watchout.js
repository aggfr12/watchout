
// generate enemyPositions
var randomEnemyPositions = function(n) {
  var result = [];
  for(var i=0; i<n; i++) {
    result.push([Math.floor(Math.random()*780+10),
                 Math.floor(Math.random()*480)+10]);
  }
  return result;
};

var enemyPositions = randomEnemyPositions(10);

// create svg element attached to body to represent gameboard
var gameBoard = d3.select("body")
                  .append("svg")
                  .attr("width", 800)
                  .attr("height", 500);

var update = function(data) {


  // creating enemy circles
  var enemies = gameBoard.selectAll("circle")
                         .data(randomEnemyPositions(10),
                          function(d) {return d});


// update old elements
  enemies.transition()
         .duration(1000)
         .attr("cx", function(d) {return d[0]})
         .attr("cy", function(d) {return d[1]});

// enter
  enemies.enter()
         .append("circle")
         .attr("r", 10)
         .style("fill", "blue")
         .attr("cx", function(d) {return d[0]})
         .attr("cy", function(d) {return d[1]});

// exit
  enemies.exit()
         .remove();


  // create callback to be run through setTimeout
  // randomPositions will use transitions
}



update();
setInterval(update, 1000);






















