const MySQL = require('../datasources/mysql.js');

exports.Get = async (req, res) => {
    const rows = await MySQL.Query(`select * from Task natural join TaskFieldsOfWork`);
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

    res.json(Object.values(task).map(t => ({...t, fieldsOfWork: fieldsOfWork[t['taskId']]})));
}

exports.Create = async (req, res) => {
    const {
        title,
        description,
        minCompensation,
        maxCompensation,
        minQuota,
        maxQuota,
        currentAccepted,
        paymentMethod,
        isApproved,
        paidAt,
        gatewayData,
        amount,
        employerEmail,
        fieldsOfWork,
    } = req.body;

    const rows = await MySQL.Query(`insert into Task value (
        ${null},
        '${title}',
        '${description}',
        ${minCompensation},
        ${maxCompensation},
        ${minQuota},
        ${maxQuota},
        ${currentAccepted},
        '${paymentMethod}',
        ${isApproved},
        '${paidAt}',
        '${JSON.stringify(gatewayData)}',
        '${amount}',
        '${employerEmail}'
    )`);

    fieldsOfWork.forEach(f => {
        MySQL.Query(`insert into TaskFieldsOfWork value (${rows.insertId}, '${f}')`).catch(e => console.log(e))
    });

    res.json({
        id: rows.insertId,
        title,
        description,
        minCompensation,
        maxCompensation,
        minQuota,
        maxQuota,
        currentAccepted,
        paymentMethod,
        isApproved,
        paidAt,
        gatewayData,
        amount,
        employerEmail,
        fieldsOfWork,
    });
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
