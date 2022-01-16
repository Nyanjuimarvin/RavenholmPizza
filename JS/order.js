class Pizza{
  constructor(size, crust, toppings, name,quantity) {
		this.size = size;
		this.crust = crust
		this.toppings = toppings;
		this.name = name;
    this.quantity = quantity;
	}

  currentOrder(){
    const { size,crust,toppings,name,quantity } = this;
    return `Name:${name} ,Size:${size},Quantity:${quantity}, Crust:${crust}, Toppings:${toppings}`;
  }

  currentPrice(){
    const { size,crust,toppings,quantity } = this;
    return (size + crust + toppings ) * quantity;
  }

  orderSummary(){
    return `${this.currentOrder}  ${this.currentPrice}`;
  }

}


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
