
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
                         .data(randomEnemyPositions(10));

// update old elements, above enter so not run twice when first called
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

var drag = d3.behavior.drag().on("drag", dragPlayer);

var player = gameBoard.append("ellipse")
                      .style("fill", "orange")
                      .attr("ry", 10)
                      .attr("rx", 20)
                      .attr("cy", 250)
                      .attr("cx", 400)
                      .call(drag);






















