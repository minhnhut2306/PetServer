const UserModel = require("../modules/usermodule");
const bcrypt = require("bcryptjs");

const register = async (fullName, email, password) => {
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("Người dùng đã tồn tại");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const user = await UserModel.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  } catch (error) {
    throw error;
  }
};




module.exports = { register, login};
