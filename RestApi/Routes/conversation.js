const Conversation = require("../Model/Conversation");

const router = require("express").Router();

//new conversation

router.post("/", async (req, res) => {
  const { receiverId, senderId } = req.body;
  const newConversation = new Conversation({
    members: [receiverId, senderId],
  });

  try {
    const setConversation = await newConversation.save();
    res.status(200).send(setConversation);
  } catch (err) {
    console.log(err);
  }
});

//
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).send(conversation);
  } catch (err) {
    console.log(err);
  }
});


// get conversation of two userid

router.get("/find/:userId1/:userId2",async(req,res)=>{
   try{
    const res = await Conversation.findOne({  members:{$all :[req.params.userId1,req.params.userId2]}});
    res.status(200).send(res);
   }catch(err){
     console.log(err)
   }
})

module.exports = router;



