let basket = JSON.parse(localStorage.getItem("data"));
const bill = document.getElementById("bill");

function showTotalBill() {
  let value = basket
    .map((x) => {
      let basketId = x.id;
      let basketItem = x.item;
      let usefulData = shopItemsData.find((x) => x.id === basketId);
      let { price } = usefulData;
      return price * basketItem;
    })
    .reduce((acc, currentValue) => {
      return acc + currentValue;
    }, 0);
  return value;
}

const generateBillData = () => {
  if (basket === null || basket.length === 0) {
    bill.innerHTML = `<h2>Your cart is Empty!</h2>
        <h4>Please go back to your home page and select some products to add it in your cart and buy it.</h4>
        <div class="billBtn"><a href="index.html"><button id="empty">Back to home</button></a>
        </div>`;
  } else {
    bill.innerHTML =
      `<h2 id="totalAmountBill">Total Bill : $ ${showTotalBill()}</h2>
        <div class="billBtn"><button id="firstBillBtn">Checkout</button><button onClick="clearCart()" id="secondBillBtn">Clear Cart</button>
        </div>` +
      basket
        .map((x) => {
          let basketId = x.id;
          let basketItem = x.item;
          let usefulData = shopItemsData.find((x) => x.id === basketId);
          let { name, price, img } = usefulData;
          return `<div class="addedItem">
            <img src=${img} width="100" alt="Image is loading...">
            <div class="billDetails">
                <div class="productName-price">
                    <h4>${name}</h4>
                    <h4 class="realPrice">$ ${price}</h4>
                    <i onClick="removeItem(${basketId})" class="bi bi-x-lg cancel-icon"></i>
                </div>
                <div class="buttons">
                    <i onClick="decrement(${basketId},${price})" class="bi bi-dash-lg icon"></i>
                    <div id = ${basketId} class="btn">${basketItem}</div>
                    <i onClick="increment(${basketId},${price})" class="bi bi-plus-lg icon"></i>
                </div>
                <h3 class="totalAmount">$ ${basketItem * price}</h3>
            </div>
            </div>`;
        })
        .join("");
  }
};

const decrement = (element, price) => {
  let selectedItem = element;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (!search) return;
  else if (search.item === 0) return;
  else search.item -= 1;
  update(element.id, price);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

const increment = (element, price) => {
  let selectedItem = element;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search) {
    search.item += 1;
  } else {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  }
  update(selectedItem.id, price);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id, price) => {
  let search = basket.find((x) => x.id === id);
  // document.getElementById(id).parentElement.nextElementSibling.textContent =
  //   "$ " + price * search.item;
  generateBillData();
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

const calculation = () => {
  if (basket === undefined || basket === null) return;
  let items = basket
    .map((x) => x.item)
    .reduce((acc, currentValue) => {
      return acc + currentValue;
    }, 0);
  document.getElementsByClassName("cartAmount")[0].textContent = items;
};

const removeItem = (element) => {
  let id = element.id;
  basket = basket.filter((x) => x.id !== id);
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
  generateBillData();
};

const clearCart = () => {
  basket = [];
  localStorage.removeItem("data");
  generateBillData();
  document.getElementsByClassName("cartAmount")[0].textContent = 0;
};

generateBillData();
calculation();
