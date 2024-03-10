const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose); // Truyền đối tượng Mongoose vào plugin mongoose-sequence

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    _id: {type: Number,},
    name: { type: String, require: true, },
    description: { type: String, maxLength: 800 },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, require: true, },
    level: { type: String, maxLength: 255 },
    slug: { type: String, slug: "name", unique: true } // unique: true là chỉ tồn tại 1 bản duy nhất
},{
    _id: false,
    timestamps:true, 
},

);

// Add plugin
mongoose.plugin(slug);

CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all',

}); // Thư viên này giúp không xóa thật mà chỉ ẩn đi thôi
module.exports = mongoose.model('Course', CourseSchema);
