var assert = require('assert');
var BalloonOrder = require('../balloon.js');
// console.log(BalloonOrder);

var orderStr = "4 sets of red, 3 sets of blue, and 3 sets of yellow.";
var pricesStr = "R4 for red, R5 for blue, and R5.50 for yellow.";
var poppedStr = "5 red balloons, 1 blue balloon, and 3 yellow balloons popped";

describe("BALLOON", function(){

  it("should return an array of length 3", function(){
    var balloon = new BalloonOrder(pricesStr, orderStr);
    var result = balloon.order.length;
    assert.equal(result, 3);
  });

  it("should return detailed map of order, including colour, quantity, price, and cost.", function(){
    var balloon = new BalloonOrder(pricesStr, orderStr);
    var result = balloon.order;
    assert.deepEqual(result, [ { colour: 'red', quantity: 12, price: 4, cost: 48 }, { colour: 'blue', quantity: 9, price: 5, cost: 45 }, { colour: 'yellow', quantity: 9, price: 5.5, cost: 49.5 } ]);
  });

  it("should return total quantity of balloons ordered.", function(){
    var balloon = new BalloonOrder(pricesStr, orderStr);
    var result = balloon.quantity;
    assert.equal(result, 30);
  });

  it("should return total helium cost.", function(){
    var balloon = new BalloonOrder(pricesStr, orderStr);
    var result = balloon.heliumCost;
    assert.equal(result, 60);
  });

  it("balloon.enough should return a number representing spare balloons left.", function(){
    var balloon = new BalloonOrder(pricesStr, orderStr);
    var result = balloon.enough(25);
    assert.equal(result, "spare balloons : 5");
  });

  it("balloon.leastLeft should return least balloons left after pop.", function(){
    var balloon = new BalloonOrder(pricesStr, orderStr, poppedStr);
    var result = balloon.leastLeft;
    assert.deepEqual(result, {colour: "yellow", quantity: 6});
  });

  it("balloon.leastLeft should return least balloons left after pop.", function(){
    var balloon = new BalloonOrder(pricesStr, orderStr, poppedStr);
    var result = balloon.mostLeft;
    assert.deepEqual(result, {colour: "blue", quantity: 8});
  });

});
