const axios = require("axios");
const db = require("../models");
const session = require("express-session");

exports.kakaoLogin = (req, res) => {
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}`;
  res.redirect(kakaoAuthURL);
};

exports.kakaoCallback = async (req, res) => {
  const { code } = req.query;
  try {
    // Access token 요청
    const tokenResponse = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      data: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        code,
      }).toString(),
    });

    const { access_token } = tokenResponse.data;

    // 사용자 정보 요청
    const userResponse = await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = userResponse.data;

    // 사용자 정보 추출
    const nickname = user.properties.nickname;
    const email = user.kakao_account.email;
    const img = user.kakao_account.profile.profile_image_url;
    const provider = "kakao";

    // 사용자 정보 저장 또는 업데이트
    const [userRecord, created] = await db.User.findOrCreate({
      where: { email, provider },
      defaults: { nickname, email, img, provider },
    });

    // 세션에 사용자 정보 저장
    req.session.user = {
      user_idx: userRecord.user_idx,
      nickname: userRecord.nickname,
      email: userRecord.email,
      img: userRecord.img,
      provider: userRecord.provider,
      role: userRecord.role,
    };
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
      } else {
        console.log("Session saved successfully.");
      }
    });
    console.log("Session after login:", req.session);

    // 사용자 정보 응답
    res.json(userRecord);
  } catch (error) {
    console.error("Error during Kakao callback:", error); // 에러 로그
    res.status(500).send("Kakao login failed");
  }
};
