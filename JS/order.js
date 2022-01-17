class Pizza {
  constructor(size, crust, toppings, name, quantity) {
    this.size = size;
    this.crust = crust;
    this.toppings = toppings;
    this.name = name;
    this.quantity = quantity;
  }

  splitToppings() {
    const { toppings } = this;
    return toppings.toString();
  }

  currentOrder() {
    const { size, crust, name, quantity } = this;
    return `Name:${name} Size:${size} Quantity:${quantity} Crust:${crust} Toppings:${this.splitToppings()}`;
  }

  buildPrice() {
    const { size } = this;
    let crustPrice = 0;
    let toppingsPrice = 0;
    let sizePrice = 0;

    if (size === "mega") {
      crustPrice = crustArray[0];
      toppingsPrice = toppingsArray[0];
      sizePrice = sizeArray[0];
    } else if (size === "large") {
      crustPrice = crustArray[1];
      toppingsPrice = toppingsArray[1];
      sizePrice = sizeArray[1];
    } else if (size === "medium") {
      crustPrice = crustArray[2];
      toppingsPrice = toppingsArray[2];
      sizePrice = sizeArray[2];
    } else if (size === "small") {
      crustPrice = crustArray[3];
      toppingsPrice = toppingsArray[3];
      sizePrice = sizeArray[3];
    } else {
      crustPrice = null;
      toppingsPrice = null;
      sizePrice = null;
    }

    return crustPrice + toppingsPrice + sizePrice;
  }

  currentPrice() {
    const { quantity } = this;
    return this.buildPrice() * quantity;
  }

  orderSummary() {
    return ` ${this.currentOrder()}  Price: ${this.currentPrice()} `;
  }
}

const toppingsArray = [100, 80, 60, 40];
const crustArray = [900, 720, 540, 360];
const sizeArray = [400, 300, 200, 100];

//Array to push currentPrice
const totalArray = [];

//Return total for multiple orders
const totalOrder = (nums) => nums.reduce((total, initial) => total + initial);

//Array to push currentOrder
const allOrders = [];

//Return all orders as a string
const outputOrders = (ordersArray) => {
  return ordersArray.toString();
};

//function to check if .checked === true
const pizzaToppings = () => {
  const nodeList = document.getElementsByClassName("toppings");
  const arr = [];

  for (let i of nodeList) {
    if (i.checked !== false) arr.push(i.value);
  }
  return arr;
};

//User interface

$(document).ready(() => {
  //Display current total
  $(".quantity").mouseleave(() => {
    const pizzaName = $("#pizzas").val();
    const pizzaSize = $("#sizes").val();
    const pizzaCrust = $("#crusts").val();
    const pizzaQuantity = parseInt($(".qty").val());

    const newPizza = new Pizza(
      pizzaSize,
      pizzaCrust,
      pizzaToppings(),
      pizzaName,
      pizzaQuantity
    );
    $(".totals").text(`Ksh ${newPizza.currentPrice()}`);
  });

  //Order once
  $(".orderform").on("submit", (e) => {
    const pizzaName = $("#pizzas").val();
    const pizzaSize = $("#sizes").val();
    const pizzaCrust = $("#crusts").val();
    const pizzaQuantity = parseInt($(".qty").val());

    if (
      pizzaCrust === "Select Pizza Crust" ||
      pizzaName === "Select Pizza Name" ||
      pizzaSize === "Select Pizza Size"
    ) {
      alert("Choose a pizza");
    }

    const newPizza = new Pizza(
      pizzaSize,
      pizzaCrust,
      pizzaToppings(),
      pizzaName,
      pizzaQuantity
    );
    e.preventDefault();
    $(".form1").hide();
    $(".form2").show();
  });

  // Order multiple
  $("#addpizza").click((e) => {
    const pizzaName = $("#pizzas").val();
    const pizzaSize = $("#sizes").val();
    const pizzaCrust = $("#crusts").val();
    const pizzaQuantity = parseInt($(".qty").val());

    const newPizza = new Pizza(
      pizzaSize,
      pizzaCrust,
      pizzaToppings(),
      pizzaName,
      pizzaQuantity
    );

    allOrders.push(newPizza.orderSummary());
    totalArray.push(newPizza.currentPrice());
    $(".orderform")[0].reset();
    $(".totals").text("");
  });

  //Pick-up option
  $(".pickup").click((e) => {
    const pizzaName = $("#pizzas").val();
    const pizzaSize = $("#sizes").val();
    const pizzaCrust = $("#crusts").val();
    const pizzaQuantity = parseInt($(".qty").val());

    const newPizza = new Pizza(
      pizzaSize,
      pizzaCrust,
      pizzaToppings(),
      pizzaName,
      pizzaQuantity
    );

    swal({
      title: `Hey there your total is ${newPizza.currentPrice()}`,
      text: "Thanks for ordering. Be sure to pick-up in the next hour",
      imageUrl: "../images/cat-dj.gif",
      imageHeight: 200,
      imageWidth: 300,
      footer: "ps: Stay Safe",
    });

    $(".placeorder").trigger("reset");
    $(".totals").text("");
    $(".form2").hide();
    $(".form1").show();
  });

  $(".home").click((e) => {
    $(".form2").hide();
    $(".form3").show();
  });

  //Delivery option
  $(".checkout").click((e) => {
    e.preventDefault();
    const pizzaName = $("#pizzas").val();
    const pizzaSize = $("#sizes").val();
    const pizzaCrust = $("#crusts").val();
    const pizzaQuantity = parseInt($(".qty").val());

    const newPizza = new Pizza(
      pizzaSize,
      pizzaCrust,
      pizzaToppings(),
      pizzaName,
      pizzaQuantity
    );

    $(".appendix").append(
      [
        `<p>${outputOrders(allOrders)}</p>`,
        `<p>Total: ${totalOrder(totalArray)}</p>`
      ].join('')
    );
      $(".form3").hide();
    $(".appendix").show();
  });

});

$(document).ready(() => {
  //plus button logic
  $(".plus-btn").on("click", function (e) {
    e.preventDefault();
    let quantity = $(this).closest("div").find("input");
    let value = parseInt(quantity.val());

    if (value < 100) {
      value = value + 1;
    } else {
      value = 1;
    }

    quantity.val(value);
  });

  //minus button logic
  $(".minus-btn").on("click", function (e) {
    e.preventDefault();
    let quantity = $(this).closest("div").find("input");
    let value = parseInt(quantity.val());

    if (value > 1) {
      value = value - 1;
    } else {
      value = 0;
    }

    quantity.val(value);
  });
});
