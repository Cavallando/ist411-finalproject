'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var PaintingSchema = new Schema({
 owner_id: String,
 painting_name: String,
 date_created: Date,
 last_edited_by: String,
 paint_data: Object
});

//export our module to use in server.js
module.exports = mongoose.model('Painting', PaintingSchema);
