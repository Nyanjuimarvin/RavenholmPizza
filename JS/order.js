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
    return `Name:${name} ,Size:${size},Quantity:${quantity}, Crust:${crust}, Toppings:${this.splitToppings()}`;
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
    return `${this.currentOrder()}  ${this.currentPrice()}`;
  }
}

const toppingsArray = [100, 80, 60, 40];
const crustArray = [900, 720, 540, 360];
const sizeArray = [400, 300, 200, 100];

//Array to push currentPrice
const totalArray = [];

//Array to push currentOrder
const allOrders = [];

//function to check if .checked === true
const pizzaToppings = () => {
  const nodeList = document.getElementsByClassName("toppings");
  const arr = [];

  for (let i of nodeList) {
    if (i.checked !== false) arr.push(i.value);
  }
  return arr;
};

const saveOrder = (orders) => {
  allOrders.push(`orders`);
  return allOrders;
};

const saveTotal = (eachOrder) => {
  totalArray.push(eachOrder);
  return totalArray;
};

$(document).ready(() => {

  //Display current total
  $('.quantity').mouseleave(()=>{
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
    $('.totals').text(`Ksh ${newPizza.currentPrice()}`);
  });

  $(".orderform").submit((e) => {

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
  

    
    console.log(newPizza);
    e.preventDefault();
    $(".form1").hide();
    $(".form2").show();
  });

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
    $(".orderform")[0].reset();
    $(".totals").text('');

  });

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
    alert(`Hey your total is ${newPizza.currentPrice()}.Pick up your Pizza in the next hour`);

    $('.form2').hide();
    $('.form1').show();
  });

  $('.home').click((e)=>{
    $('.form2').hide();
    $('.form3').show();
  });

  $('.check').submit((e)=>{
    $('.form3').hide();
    $('.checkout').show();
  })

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
