const MySQL = require('../datasources/mysql.js');

exports.Get = async (req, res) => {
    const rows = await MySQL.Query(`select * from Task`);
    rows.forEach((r, i) => {
        rows[i] = {...r, gateway_data: JSON.parse(r.gateway_data)}
    });
    res.json(rows);
}

exports.Create = async (req, res) => {
    const {
        title,
        description,
        min_compensation,
        max_compensation,
        min_quota,
        max_quota,
        current_accepted,
        payment_method,
        is_approved,
        paid_at,
        gateway_data,
        amount,
        employer_email,
    } = req.body;

    const rows = await MySQL.Query(`insert into Task value (
        ${null},
        '${title}',
        '${description}',
        ${min_compensation},
        ${max_compensation},
        ${min_quota},
        ${max_quota},
        ${current_accepted},
        '${payment_method}',
        ${is_approved},
        '${paid_at}',
        '${JSON.stringify(gateway_data)}',
        '${amount}',
        '${employer_email}'
    )`);

    res.json({
        id: rows.insertId,
        title,
        description,
        min_compensation,
        max_compensation,
        min_quota,
        max_quota,
        current_accepted,
        payment_method,
        is_approved,
        paid_at,
        gateway_data,
        amount,
        employer_email,
    });
}

exports.Delete = async (req, res) => {
    const {task_id} = req.body;
    // TODO : escape string
    const rows = await MySQL.Query(`delete from Task where task_id = ${task_id}`);
    if (rows.affectedRows == 1) {
        res.status(200).send();
    } else {
        res.status(400).send();
    }
}
