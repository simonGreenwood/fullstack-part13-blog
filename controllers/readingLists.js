const router = require("express").Router();
const { ReadingListItem } = require("../models");
router.get("/", async (req, res) => {
  const items = await ReadingListItem.findAll({
    attributes: ["userId", "blogId"],
  });
  res.json(items);
});
module.exports = router;
