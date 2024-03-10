const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongoose');
class SiteController {
    // [GET] /
     index(req, res, next) {

        Course.find({})
        .then(courses => {
            // Sử dụng map để chuyển đổi từ các đối tượng Mongoose thành các đối tượng JavaScript thông thường
            res.render('home', { 
                courses: mutipleMongooseToObject(courses)
             });
        })
        .catch(next);
    }
    
    // [GET]/search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
