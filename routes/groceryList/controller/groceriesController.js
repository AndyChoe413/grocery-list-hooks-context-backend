const Grocery = require('../model/GroceryList')

async function createGrocery(req, res) {
    try {
        let createdGrocery = new Grocery({
            grocery: req.body.grocery
        })
        
        let savedGrocery = await createdGrocery.save()
       
        res.json({ payload: savedGrocery })
        
    } catch (e) {
        res.status(500).json({message: e.message, error: e})
    }
}

async function getAllGroceries(req, res) {
    try {
        let allGroceries = await Grocery.find({})

        res.json({payload:allGroceries})
    } catch (e) {
        res.status(500).json({message: e.message, error: e})
    }
}

async function updateGroceriesById(req, res) {
    try {
        let updatedGroceries = await Grocery.findByIdAndUpdate(
            {
                _id: req.params.id
            },
                req.body,
            {new: true}
        )

        res.json({payload:updatedGroceries})
    } catch (e) {
        res.status(500).json({message:e.message, error:e})
    }
}

async function deleteGroceriesById(req, res) {
    try {
        let deletedGrocery = await Grocery.findByIdAndDelete(req.params.id)
        res.json({payload:deletedGrocery})
    } catch (e) {
        res.status(500).json({message:e.message, error:e})
    }
}

async function isPurchased(req, res) {
  try {
    let purchasedResult = await Grocery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
  
    res.json({ payload: purchasedResult });
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message, error: e });
  }
}

async function sortByDate(req, res) {
  try {
    let sort = req.query.sort;
    let sortOrder = sort === "desc" ? -1 : 1;
    let result = await Grocery.find({}).sort({ dateAdded: sortOrder });
    res.json({ payload: result });
  } catch (e) {
    res.status(500).json({ message: e.message, error: e });
  }
}

async function sortByPurchased(req, res) {
  try {
    let isPurchased = req.query.isDone;
    let isPurchasedOrder = isPurchased === "true" ? true : false;
    let sortByDate = req.query.sort ? req.query.sort : null;
    let finalSort;
    if (!sortByDate) {
      finalSort = null;
    } else {
      finalSort = sortByDate === "asc" ? 1 : -1;
    }
    let result = await Grocery.find({ purchased: isPurchasedOrder }).sort({
      dateAdded: finalSort,
    });
    res.json({ payload: result });
  } catch (e) {
    res.status(500).json({ message: e.message, error: e });
  }
}

module.exports = {
    createGrocery,
    getAllGroceries,
    updateGroceriesById,
    deleteGroceriesById,
    isPurchased,
    sortByDate,
    sortByPurchased
}