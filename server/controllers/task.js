const MySQL = require('../datasources/mysql.js');

const getTask = async (filter) => {
    const query = `select * from Task natural join TaskFieldsOfWork`;
    let where = '';
    if (filter['employerEmail'] !== undefined) {
        where += ` employer_email = '${filter['employerEmail']}'`
    }else if (filter['taskId'] !== undefined) {
        where += ` task_id = ${filter['taskId']}`
    }

    let rows;
    if (where === '') {
        rows = await MySQL.Query(query);
    } else {
        rows = await MySQL.Query(query.concat(' where', where));
    }

    // console.log(filter, rows)

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
    const filter = req.query
    res.json(await getTask(filter));
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

        for (let f of fieldsOfWork) {
            await MySQL.Query(`insert into TaskFieldsOfWork value (${rows.insertId}, '${f}')`)
        }  

        // throw Error("Mysql transaction")

        await MySQL.Query('COMMIT;')

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

exports.Update = async (req, res) => {
    const {
        taskId,
        title,
        description,
        minCompensation,
        maxCompensation,
        minQuota,
        maxQuota,
        paymentMethod,
        fieldsOfWork,
    } = req.body;

    try {
        await MySQL.Query('SET autocommit = 0;')

        const rows = await MySQL.Query(`update Task set 
            title='${title}', 
            description='${description}', 
            min_compensation=${minCompensation}, 
            max_compensation=${maxCompensation}, 
            min_quota=${minQuota}, 
            max_quota=${maxQuota}, 
            payment_method='${paymentMethod}'
            where task_id=${taskId}
    `);

        await MySQL.Query(`delete from TaskFieldsOfWork where task_id=${taskId}`)

        for (let f of fieldsOfWork) {
            await MySQL.Query(`insert into TaskFieldsOfWork value (${taskId}, '${f}')`)
        }        

        await MySQL.Query('COMMIT;')
        res.json({
            id: taskId,
            title,
            description,
            minCompensation,
            maxCompensation,
            minQuota,
            maxQuota,
            paymentMethod,
            fieldsOfWork,
        });
        
    } catch (err) {
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
