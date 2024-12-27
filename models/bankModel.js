const mongoose = require('mongoose');



const bankSchema = new mongoose.Schema({
    
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
 
    balance:{type: Number, default: 0},
    accountNumber:{type:String, unique:true, },
    
});

module.exports = mongoose.model('Account', bankSchema);