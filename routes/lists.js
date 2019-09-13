const express = require("express");
const router = express.Router();
const List = require("../models/List"); 

router.get( '/' , (req, res) => {
  List.find()
      .sort({ date: -1 })
      .then( lists => res.json(lists));
})

router.post( '/' , (req, res) => {
  newList = new List({
    name: req.body.name
  });

  newList.save().then( list => res.json(list));
})

