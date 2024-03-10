// models/Category.js

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    childrenCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
});
module.exports = mongoose.model('Category', CategorySchema);
