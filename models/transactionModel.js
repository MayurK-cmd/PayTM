
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    senderAccount:{type: mongoose.Schema.Types.ObjectId, ref:'Account',required:true},
    receiverAccount:{type: mongoose.Schema.Types.ObjectId, ref:'Account',required:true},
    amount:{type: Number, required:true},
    timestamp:{type:Date, default: Date.now},


},{timestamps: true});  


module.exports=mongoose.model('Transaction', TransactionSchema);