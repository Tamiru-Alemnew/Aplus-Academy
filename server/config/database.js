
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('MongoDB database connected successfully!');
  });

  // Schema for registration
const registrationSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    user_email: { type: String, require: true, index:true, unique:true,sparse:true},
    pass: { type: String, required: true },
  });
  
  // Schema for profile
  const profileSchema = new mongoose.Schema({
    user_email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }
  });
  
  // Schema for question
  const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    question_description: { type: String },
    user_id: { type: Number },
    post_id: { type: String, unique: true },
  });
  
  // Schema for answer
  const answerSchema = new mongoose.Schema({
    answer: { type: String, required: true },
    user_id: { type: Number },
    question_id: { type: Number },
  });
  
  // Create models
  const Registration = mongoose.model('Registration', registrationSchema);
  const Profile = mongoose.model('Profile', profileSchema);
  const Question = mongoose.model('Question', questionSchema);
  const Answer = mongoose.model('Answer', answerSchema);
  module.exports = {
    Registration,
    Profile,
    Question,
    Answer,
  };