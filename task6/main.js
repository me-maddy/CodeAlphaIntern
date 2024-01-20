// let shopItemsData = [
//   {
//     id: "jfhgbvnscs",
//     name: "Casual Shirt",
//     price: 45,
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "images/img-1.jpg",
//   },
//   {
//     id: "ioytrhndcv",
//     name: "Office Shirt",
//     price: 100,
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "images/img-2.jpg",
//   },
//   {
//     id: "wuefbncxbsn",
//     name: "T Shirt",
//     price: 25,
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "images/img-3.jpg",
//   },
//   {
//     id: "thyfhcbcv",
//     name: "Mens Suit",
//     price: 300,
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "images/img-4.jpg",
//   },
// ];

const shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];
console.log(basket);

const generateData = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id);
      return `<div id=product-id-${id} class="item">
        <img width="220" src=${img} alt="Image is loading">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}.</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onClick="decrement(${id})" class="bi bi-dash-lg icon"></i>
                    <div id=${id} class="btn">${search ? search.item : 0}</div>
                    <i onClick="increment(${id})" class="bi bi-plus-lg icon"></i>
                </div>
            </div>
        </div>
    </div>`;
    })
    .join(""));
};

generateData();

const decrement = (element) => {
  let selectedItem = element;
  let search = basket.find((x) => x.id === selectedItem.id);
  console.log(search);
  if (!search) return;
  else if (search.item === 0) return;
  else search.item -= 1;
  update(element.id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

const increment = (element) => {
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
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

const calculation = () => {
  let items = basket
    .map((x) => x.item)
    .reduce((acc, currentValue) => {
      return acc + currentValue;
    }, 0);
  document.getElementsByClassName("cartAmount")[0].textContent = items;
};

calculation();
