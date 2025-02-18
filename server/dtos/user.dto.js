const sequelize = require("../db");
const { role } = sequelize.models;

// del asinchroninio kodo sita klase turi
// buti inicijuojama taip: await UserDto.init(model)
module.exports = class UserDto {
  id;
  first_name;
  email;
  role;
  address;
  phone_number;

  constructor(model, roleName) {
    this.id = model.id;
    this.first_name = model.first_name;
    this.email = model.email;
    this.role = roleName;
    this.address = model.address;
    this.phone_number = model.phone_number;
  }

  static async init(model) {
    const userRole = await role.findOne({ where: { id: model.role_id } });

    return new UserDto(model, userRole.role_name);
  }
};
