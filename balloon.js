var orderStr = "4 sets of red, 3 sets of blue, and 3 sets of yellow.";
var pricesStr = "R4 for red, R5 for blue, and R5.50 for yellow.";
var poppedStr = "5 red balloons, 1 blue balloon, and 3 yellow balloons popped";

function mapOrder(orderStr, pricesStr) {
  var order = [];
  var regexOrder = /(\d+) sets of (\w+)/g, regexPrices = /(\d+\.?\d*?) for (\w+)/g, match1, match2;
  while (match1 = regexOrder.exec(orderStr)) {
    order.push({colour: match1[2], quantity: Number(match1[1]*3)});
  }
  // console.log(order);
  while (match2 = regexPrices.exec(pricesStr)) {

    // console.log(order.find);

    var find = order.find(function(balloon) {
      return balloon.colour === match2[2];
    });
    // console.log(find);

    find.price = Number(match2[1]);
    find.cost = find.quantity * find.price;
  }
  return order;
}
// console.log(mapOrder(orderStr,pricesStr));
function getPopped(poppedStr) {
  var popped = [];
  var regex = /(\d+)\s(\w+)/g, match;
  while (match = regex.exec(poppedStr)) {
    this.balloons.push({colour: match[2], quantity: match[1]});
  }
  return popped;
}

function getQuantity(orderMap, colour) {
  if (colour === 'all') {
    return orderMap.reduce(function(sum,b) {return sum+=b.quantity;},0);
  } else {
    return orderMap.find(function(balloon) {return balloon.colour===colour;}).quantity;
  }
}

function getOrderCost(orderMap) {
  return orderMap.reduce(function(sum,b) {return sum+= + b.cost;},0);
}

function getHeliumCost(quantity){
  return quantity * 2;
}

function enough(mapOrder, partySize) {
    var quantity = getQuantity(mapOrder, 'all');
    return quantity - partySize;
    // if (result > 0) {
    //     return "spare balloons : "+result;
    //   } else if (result === 0) {
    //     return "No extra required. No spare balloons";
    //   } else if (result < 0) {
    //     return Math.abs(result)+" extra balloons required.";
    //   }
}

function BalloonOrder(pricesStr, orderStr, poppedStr) {
    this.order = mapOrder(orderStr, pricesStr);
    this.quantity = getQuantity(this.order,'all');
    this.heliumCost = getHeliumCost(this.quantity);
    this.enough = function(partySize) {
      var result = this.quantity - partySize;
      if (result > 0) {
          return "spare balloons : "+result;
        } else if (result === 0) {
          return "No extra required. No spare balloons";
        } else if (result < 0) {
          return Math.abs(result)+" extra balloons required.";
        }
      };

    this.spare = function(partySize) {
                    return enough(this.order, partySize);
                  };


  if (poppedStr) {
    this.popped = function(poppedStr) {
        return getPopped(poppedStr);
      };

    this.without = function(partySize) {
      var totalpopped =  this.popped.reduce(function(sum,b){return sum+=b.quantity;},0);
      var enough = this.spare(partySize);
      var noballoons = totalpopped-this.spare(partySize) ;
        return noballoons+" guests without balloons.";
    };
    var left = this.order.map(function(balloon){
      var find = this.popped.find(function(popped) {return popped.colour===balloon.colour;});
      return {colour: balloon.colour, quantity: balloon.quantity - find.quantity};
      });
    this.leastLeft = left.reduce(function(a,b){return a.quantity<b.quantity ? a : b;});
    this.mostLeft = left.reduce(function(a,b){return a.quantity>b.quantity ? a : b;});
  }
}

module.exports = function(pricesStr, orderStr, poppedStr) {
  return new BalloonOrder(pricesStr, orderStr, poppedStr);
};
