const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({})

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
    
      Promise.all([
          courseQuery.lean(), // Lấy danh sách khóa học (không bao gồm metadata của Mongoose)
          Course.countDocumentsWithDeleted({ deleted: true }) // Đếm số lượng khóa học đã bị xóa
      ])
      .then(([courses, deletedCount]) => {
          res.render('me/stored-courses', { // Render template 'stored-courses' với dữ liệu được truyền vào
              courses,
              deletedCount
          });
      })
      .catch(next); // Xử lý lỗi nếu có
  
  

         // Course.countDocumentsDeleted()
         //    .then((deletedCount) => {
         //       console.log(deletedCount);
         //    })
         //    .catch(() => {});
         
         // Course.find({})
         //    .then(courses =>res.render('me/stored-Courses', {
         //       courses: mutipleMongooseToObject(courses)
         //    })
         //    )
         //    .catch(next);        
     }

     // [GET] /me/trash/courses
     trashCourses(req, res, next) {
      Course.findDeleted({ deletedAt: { $ne: null } }) // Chỉ lấy các bản ghi đã bị xóa
          .then(courses => res.render('me/trash-Courses', {
              courses: mutipleMongooseToObject(courses)
          }))
          .catch(next);        
  }
  
  
}

module.exports = new MeController();
