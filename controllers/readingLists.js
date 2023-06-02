const router = require("express").Router();
const { ReadingListItem } = require("../models");
const { tokenExtractor } = require("../utils/middleware");
router.get("/", async (req, res) => {
  const items = await ReadingListItem.findAll({
    attributes: ["userId", "blogId"],
  });
  res.json(items);
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const listItem = await ReadingListItem.findByPk(req.params.id);

  if (!listItem) {
    return res.status(400).json({ error: "ID is invalid" });
  }
  if (
    req.body.read === undefined ||
    (req.body.read !== true && req.body.read !== false)
  ) {
    return res.status(400).json({ error: "Read field is not valid" });
  }

  console.log(req.user.id, listItem.userId);

  if (req.user.id !== listItem.userId) {
    return res.status(401).json({ error: "Not authorized" });
  }

  listItem.read = req.body.read;
  await listItem.save();
  console.log(listItem);
  res.json(listItem);
});
module.exports = router;
