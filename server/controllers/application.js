const MySQL = require('../datasources/mysql.js');

const getApplication = async (filter) => {
    const query = `select * from Application`;
    let where = '';
    if (filter['applicationId'] !== undefined) {
        where += ` application_id = '${filter['applicationId']}'`
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

exports.Create = async (req, res) => {
    let {
        information,
        status,
        studentEmail,
        taskId,
    } = req.body;

    status = status === undefined ? 'Pending' : status;

    const rows = await MySQL.Query(`insert into Application value (
        ${null},
        '${information}',
        '${status}',
        '${studentEmail}',
        ${taskId}
    )`);

    res.json({
        id: rows.insertId,
        information,
        status,
        studentEmail,
        taskId,
    });
}

exports.Delete = async (req, res) => {
    const {applicationId} = req.body;
    const rows = await MySQL.Query(`delete from Application where application_id = ${applicationId}`);
    if (rows.affectedRows == 1) {
        res.status(200).send();
    } else {
        res.status(400).send();
    }
}