const { Session } = require("../models");

const router = require("express").Router();

router.delete("/", async (req, res) => {
  console.log(req.headers.authorization.substring(7));
  await Session.destroy({
    where: { token: req.headers.authorization.substring(7) },
  });
  res.status(204).end();
});
module.exports = router;
