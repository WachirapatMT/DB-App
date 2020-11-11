const MySQL = require('../datasources/mysql.js');

const getApplication = async (filter) => {
    const query = `select * from Application`;
    let where = '';
    if (filter['taskId'] !== undefined) {
        where += ` task_id = ${filter['taskId']}`
    }

    let rows;
    if (where === '') {
        rows = await MySQL.Query(query);
    } else {
        rows = await MySQL.Query(query.concat(' where', where));
    }

    console.log(rows)

    let application = {}
    rows.forEach(r => {
        application[r['application_id']] = {
            applicationId: r['application_id'],
            information: r['information'],
            status: r['status'],
            studentEmail: r['student_email'],
            taskId: r['task_id'],
        };
    });
    return application;
}

exports.Get = async (req, res) => {
    res.json(await getApplication({}));
}