module.exports = {
  itemNameText: (position) =>  `.inventory_item:nth-of-type(${position}) .inventory_item_name`,
  itemPriceText: (position) =>  `.inventory_item:nth-of-type(${position}) .inventory_item_price`,
  addToCartButton: (position) =>  `.inventory_item:nth-of-type(${position}) .btn_inventory`,
};