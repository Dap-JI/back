const axios = require("axios");
const db = require("../models");
const session = require("express-session");
const querystring = require("querystring");

exports.naverLogin = (req, res) => {
  const naverAuthURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.NAVER_REDIRECT_URI}&state=STATE_STRING`;
  res.redirect(naverAuthURL);
};

exports.naverCallback = async (req, res) => {
  const { code, state } = req.query;
  try {
    // Access token 요청
    const tokenResponse = await axios({
      method: "POST",
      url: "https://nid.naver.com/oauth2.0/token",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      data: querystring.stringify({
        grant_type: "authorization_code",
        client_id: process.env.NAVER_CLIENT_ID,
        client_secret: process.env.NAVER_CLIENT_SECRET,
        redirect_uri: process.env.NAVER_REDIRECT_URI,
        code,
        state,
      }),
    });

    const { access_token } = tokenResponse.data;

    // 사용자 정보 요청
    const userResponse = await axios({
      method: "GET",
      url: "https://openapi.naver.com/v1/nid/me",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = userResponse.data.response;
    const provider = "naver";

    // 사용자 정보 저장
    const [userRecord, created] = await db.User.findOrCreate({
      where: { email: user.email, provider: provider },
      defaults: {
        nickname: user.nickname,
        email: user.email,
        img: user.profile_image,
        provider: user.provider,
      },
    });

    // 사용자 정보 세션에 저장
    req.session.user = {
      user_idx: userRecord.user_idx,
      nickname: userRecord.nickname,
      email: userRecord.email,
      img: userRecord.img,
      provider: userRecord.provider,
      role: userRecord.role,
    };

    res.json(req.session.user);
  } catch (error) {
    console.error("Error during Naver callback:", error);
    res.status(500).send("Naver login failed");
  }
};
