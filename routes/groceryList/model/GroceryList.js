const mongoose = require("mongoose");
const GroceryListSchema = new mongoose.Schema({
  grocery: {
    type: String,
    name: String,
  },
  purchased: {
    type: Boolean,
    default: false,
  },
  dateAdded: {
    type: Date,
    default: () => Date.now(),
  },
});
module.exports = mongoose.model("grocery", GroceryListSchema);