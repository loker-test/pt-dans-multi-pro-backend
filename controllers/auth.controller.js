const joi = require("joi");
const {UserModel} = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("../config/jwt.config");

const register = async (req, res) => {
  const schema = joi.object({
    username: joi
      .string()
      .required(),
    password: joi
      .string()
      .required()
  })
  const validateSchema = schema.validate(req.body)
  if (validateSchema.error) {
    return res.status(406).json({
      message: validateSchema.error.message || "Bad Request",
      status: 406,
    });
  }

  const user = UserModel.build({
    username: validateSchema.value.username,
    password: bcrypt.hashSync(validateSchema.value.password, 10),
  })
  await user.save()

  res.json({
    status: 'success',
    data: {
      token: jwt.generateRefreshToken({
        id: user.id,
        username: user.username
      }),
      user: user
    }
  })
}

const login = async (req, res) => {
  const schema = joi.object({
    username: joi
      .string()
      .required(),
    password: joi
      .string()
      .required()
  })
  const validateSchema = schema.validate(req.body)
  if (validateSchema.error) {
    return res.status(406).json({
      message: validateSchema.error.message || "Bad Request",
      status: 406,
    });
  }

  const user = await UserModel.findOne({
    where: {
      username: validateSchema.value.username
    }
  })

  const comparePass = await bcrypt.compare(validateSchema.value.password, user.password)
  if (comparePass) {
    res.json({
      message: 'Welcome '+user.username,
      data: {
        token: jwt.generateRefreshToken({
          id: user.id,
          username: user.username
        }),
        user: user
      }
    })
  } else {
    res
      .status(406)
      .json({
        message: 'wrong username or password',
      })
  }
}

module.exports = {
  register,
  login,
}
