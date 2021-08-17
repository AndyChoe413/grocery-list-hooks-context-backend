const express = require('express')
const router = express.Router()

const {
    createGrocery,
    getAllGroceries,
    updateGroceriesById,
    deleteGroceriesById,
    isPurchased,
    sortByDate,
    sortByPurchased
} = require("./controller/groceriesController")

/* GET home page. */
router.get("/", function (req, res, next) {
    res.json(true);
  });

router.post('/create-grocery', createGrocery)
router.get('/get-all-groceries', getAllGroceries)
router.put('/update-groceries-by-id/:id', updateGroceriesById)
router.delete('/delete-groceries-by-id/:id', deleteGroceriesById)
router.put('/purchased-by-id/:id', isPurchased)
router.get('/get-groceries-by-sort', sortByDate)
router.get('/get-groceries-by-purchased', sortByPurchased)

module.exports = router