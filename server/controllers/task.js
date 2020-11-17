const MySQL = require('../datasources/mysql.js');

const getTask = async (filter) => {
    const query = `select * from Task natural join TaskFieldsOfWork`;
    let where = '';
    if (filter['employerEmail'] !== undefined) {
        where += ` employer_email = ${filter['employerEmail']}`
    }

    let rows;
    if (where === '') {
        rows = await MySQL.Query(query);
    } else {
        rows = await MySQL.Query(query.concat(' where', where));
    }

    console.log(rows)

    let fieldsOfWork = {}
    let task = {}
    rows.forEach(r => {
        if (fieldsOfWork[r['task_id']] === undefined) fieldsOfWork[r['task_id']] = []
        fieldsOfWork[r['task_id']].push(r['field_of_work']);
        task[r['task_id']] = {
            taskId: r['task_id'],
            title: r['title'],
            description: r['description'],
            minCompensation: r['min_compensation'],
            maxCompensation: r['max_compensation'],
            minQuota: r['min_quota'],
            maxQuota: r['max_quota'],
            currentAccepted: r['current_accepted'],
            paymentMethod: r['payment_method'],
            isApproved: r['is_approved'],
            paidAt: r['paid_at'],
            gatewayData: JSON.parse(r['gateway_data']),
            amount: r['amount'],
            employerEmail: r['employer_email'],
        };
    });
    return Object.values(task).map(t => ({...t, fieldsOfWork: fieldsOfWork[t['taskId']]}));
}

exports.Get = async (req, res) => {
    res.json(await getTask({}));
}

exports.Create = async (req, res) => {
    const {
        title,
        description,
        minCompensation,
        maxCompensation,
        minQuota,
        maxQuota,
        paymentMethod,
        employerEmail,
        fieldsOfWork,
    } = req.body;

    try {
        await MySQL.Query('SET autocommit = 0;')

        const rows = await MySQL.Query(`insert into Task value (
            ${null},
            '${title}',
            '${description}',
            ${minCompensation},
            ${maxCompensation},
            ${minQuota},
            ${maxQuota},
            0,
            '${paymentMethod}',
            0,
            NULL,
            NULL,
            200,
            '${employerEmail}'
        )`);

        fieldsOfWork.forEach(f => {
            MySQL.Query(`insert into TaskFieldsOfWork value (${rows.insertId}, '${f}')`).catch(e => console.log(e))
        });

        // throw Error("Mysql transaction")

        res.json({
            id: rows.insertId,
            title,
            description,
            minCompensation,
            maxCompensation,
            minQuota,
            maxQuota,
            currentAccepted: 0,
            paymentMethod,
            isApproved: 0,
            paidAt: null,
            gatewayData: null,
            amount: 200,
            employerEmail,
            fieldsOfWork,
        });
    } catch (err) {
        console.log(err)
        await MySQL.Query('ROLLBACK;')
        res.status(400).send()
    } finally {
        await MySQL.Query('SET autocommit = 1;')
        
    }
}

exports.Delete = async (req, res) => {
    const {taskId} = req.body;
    // TODO : escape string
    const rows = await MySQL.Query(`delete from Task where task_id = ${taskId}`);
    if (rows.affectedRows == 1) {
        res.status(200).send();
    } else {
        res.status(400).send();
    }
}
