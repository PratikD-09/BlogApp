const router = require('express').Router();
const User = require("../Models/User");
const Posts = require("../Models/Posts")


// create post
router.post("/", async (req, res) => {
    
    const newPost =new Posts(req.body);
    try {
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err)
    }
});


// DELETE 
router.delete("/:id", async(req,res)=>{
    try {
        const post=await Posts.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                await post.deleteOne();
                res.status(200).json("post is deleted !!!")
            } catch (error) {
                res.status(500).json(err);
            }
        }else{
            res.status(500).json("You can only delete your own post !!! ")
        }
    } catch (err) {
        res.status(500).json(err);
    }
})


// UPDATE POST

router.put("/:id", async(req,res)=>{
    try {
        const post=await Posts.findById(req.params.id);
        if(post.username === req.body.username){

            try {
                const updatedPost= await Posts.findByIdAndUpdate(req.params.id,
                    {
                        $set : req.body
                    },
                    { new : true}
                );
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json(error)
            }
            
        }else{
            res.status(500).json("You can only update your own post !!! ")
        }
    } catch (err) {
        res.status(500).json(err);
    }
})






//Get POST


router.get("/:id", async (req,res)=>{
    try {
        const post= await Posts.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET ALL POSTS

router.get("/", async (req,res)=>{
    const username= req.query.user;
    const catName=  req.query.cat;
    try {
        let posts;
        if(username){
            posts= await Posts.find({username});
        }else if(catName){
            posts= await Posts.find(
                {
                    categeris : { $in :[catName]}
                }
            )
        }else{
            posts = await Posts.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;