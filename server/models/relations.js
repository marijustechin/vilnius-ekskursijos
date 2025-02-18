function modelRelations(sequelize) {
  const {
    user,
    role,
    user_secret,
    token,
    //   order,
    //   order_status,
    //   order_items,
    //   menu_item,
    //   category,
  } = sequelize.models;

  // useris
  user.belongsTo(role, { foreignKey: "role_id" });
  user.hasOne(user_secret, { foreignKey: "user_id", onDelete: "CASCADE" });
  //user.hasMany(order, { foreignKey: "user_id" });
  user.hasOne(token, { foreignKey: "user_id", onDelete: "CASCADE" });

  user_secret.belongsTo(user, { foreignKey: "user_id" });
  token.belongsTo(user, { foreignKey: "user_id" });

  // role
  role.hasMany(user, { foreignKey: "role_id" });

  // patiekalai
  //   category.hasMany(menu_item, { foreignKey: "category_id" });
  //   menu_item.belongsTo(category, { foreignKey: "category_id" });
  //   menu_item.hasMany(order_items, { foreignKey: "menu_item_id" });
  //   order_items.belongsTo(menu_item, { foreignKey: "menu_item_id" });

  //   // uzsakymai
  //   order.belongsTo(user, { foreignKey: "user_id" });
  //   order.hasOne(order_status, { foreignKey: "order_id" });
  //   order_status.belongsTo(order, { foreignKey: "order_id" });
  //   order.hasMany(order_items, { foreignKey: "order_id" });
  //   order_items.belongsTo(order, { foreignKey: "order_id" });
}

module.exports = { modelRelations };
