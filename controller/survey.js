// const book = require("../modles/book");
const Questions = require("../models/survey");
const Survey = require('../models/answer')

// const auth = require("../middleware/authentication");

//post API for book
const postQuestion = async (req, res) => {
  let { ...data} = req.body;
  try {
  
  
      const newSurvey = await new Survey({
        ...req.body
      
      }).save();
      res.status(200).send(newSurvey)

      if (!newSurvey) {
        res
          .status(400)
          .json({ message: "postQuestion is not created", status: false });
      } else {
        res.status(200).json({
          message: "postQuestion is created successfully",
          data: newSurvey,
          status: true,
        });
      }
    }
  catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//getAll  questions

const getQuestions = async (req, res) => {
  try {
    const getQuestionsdata = await Questions.find();
    if (!getQuestionsdata) {
      res.json({ message: "there is no Questions", status: false });
    }
    res.json({
      message: "Found  Questions",
      data: getQuestionsdata,
      status: true,
    });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};


// get question by id
const getByIDQuestions = async (req, res) => {
  try {
    const getQuestionsdata = await Questions.findById({_id: req.params.id });
    if (!getQuestionsdata) {
      res.json({ message: "there is no Questions", status: false });
    }
    res.json({
      message: "Found  Questions",
      data: getQuestionsdata,
      status: true,
    });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};




//patch api  for book
const UpdateQuestionsDetails = async (req, res) => {
  let {  dataType, Question, extraValue } = req.body;
  let UserID =req.user
  try {
    const UpdateQuestionsdata = await Questions.findOneAndUpdate(
      { id: req.params._id },
      { dataType, UserID, Question, extraValue }
    );
    if (!UpdateQuestionsdata) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.json({
        message: "Student Details  has updated successsfully",
        data: UpdateQuestionsdata,
        status: true,
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};



//Delete api
const DeleteQuestionsDetails = async (req, res) => {
  try {
    const deteleQuestionDetails = await Questions.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deteleQuestionDetails) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.send({
        message: "Question Details  has deleted successfully",
        status: true,
      });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};




module.exports = {
  postQuestion,
  getQuestions,
  UpdateQuestionsDetails,
  getByIDQuestions,
  DeleteQuestionsDetails,
  // postAnswer,
};

