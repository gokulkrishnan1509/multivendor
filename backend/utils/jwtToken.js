const jwt = require("jsonwebtoken");


getJwtToken = async function (id) {
  return await jwt.sign({ id}, process.env.SECERET_STRING, {
    expiresIn: "30d",
  });
};

// create token and saving that in cookies

const sendToken = async (user, statusCode, res) => {
  const token = await getJwtToken(user._id);
  // // console.log(token)
  // const [header, payload, signature] = token.split('.');
  // const decodedPayload = Buffer.from(payload,'base64').toString('utf-8')

  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, user, token });
};

const sendShopToken = async (user, statusCode, res) => {
  const token = await getJwtToken(user._id);


  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  // res.cookie('seller_token', token, {
  //   expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // Set expiration time
  //   httpOnly: true,
  //   secure: true, // Set to true if using HTTPS
  // });

  res
    .status(statusCode)
    .cookie("seller_token", token, options)
    .json({ success: true, user, token });
};

module.exports = { sendToken, sendShopToken };
