
const Course = require('../models/Course');
const {mongooseToObject} = require('../../util/mongoose');

class CourseController {

    //  [GET]/course/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then(course => {
                res.render('courses/show', {course: mongooseToObject(course)});
            })
            .catch(next);
    }

    //  [GET]/course/create
    create(req, res, next) {
        res.render('courses/create')
    }

    //  [POST]/course/store
    store(req, res, next) {
        // res.json(req.body);
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBS-rOVBlQWDq94SGlWOAYWjtyKbw`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
        
    //  [GET]/course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course =>  res.render('courses/edit', {
                course: mongooseToObject(course),
            }))
            .catch(next);
       
    }

    //  [PUT]/course/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //  [DELETE]/course/:id
    destroy(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() =>res.redirect('back'))
            .catch(next);
    }
    //  [DELETE]/course/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() =>res.redirect('back'))
            .catch(next);
    }
    //  [DELETE]/course/:id/restore
    restore(req,res, next) {
        Course.restore({_id: req.params.id})
            .then(() =>res.redirect('back'))
            .catch(next);
    }

    //  [POST]/course/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'Delete':
                Course.delete({_id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'Restore':
                Course.restore({_id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'ForcedDelete':
                Course.deleteOne({_id: {$in: req.body.courseIds}})
                   .then(() => res.redirect('back'))
                   .catch(next);
                break;
            default:
                res.json({message: 'Hành động không hợp lệ!'});
        }
    }


}

module.exports = new CourseController();
