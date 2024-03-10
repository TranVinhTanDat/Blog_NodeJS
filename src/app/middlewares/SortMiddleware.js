module.exports = function SortMiddleware(req, res, next) {  // bác bảo vệ

    res.locals._sort = {
        enabled: false,
        type: 'default',
    }

    if(req.query.hasOwnProperty('_sort')) {  // bác bảo vệ kiểm tra
        // res.locals._sort.enabled = true;
        // res.locals._sort.column = req.query.column;
        // res.locals._sort.type = req.query.type;

        // Hợp nhất các object

        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        });
    }

    next();
}