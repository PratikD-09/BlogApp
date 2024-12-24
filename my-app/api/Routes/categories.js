const router = require('express').Router();
const Categories = require("../Models/Catagoris");


router.post("/", async (req,res)=>{
    const newCategory= new Categories(req.body);
    try {
        const saveCategory=await newCategory.save();
        res.status(200).json(saveCategory);
    } catch (error) {
        res.status(500).json(error)
    }
})


//ET cATEGORY

router.get("/", async (req,res)=>{
    try {
        const category=await Categories.find()
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;