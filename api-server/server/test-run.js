const { readData } = require('./db_modules/read-data');
const { insertData } = require('./db_modules/insert-data');
const { updateData } = require('./db_modules/update-data');
const { deleteData } = require('./db_modules/delete-data');

(async () => {
    // data = await readData();
    // console.log(data);
    await deleteData('f71b28b2-c235-49ab-8df0-2142c4d743a3');
    // await insertData('15da7043-afaf-4c45-a13a-8ef0e8998cf8', 'Test insert into', false);
    data = await readData();
    console.log(data);
})();
