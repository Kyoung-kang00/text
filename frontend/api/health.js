module.exports = (req, res) => {
  res.status(200).json({
    message: "Vercel Serverless API 정상 작동 중입니다.",
  });
};
