const DiaFeriado = require('../models/task');
const PgnovasAPI = require('../controller/pgnovas');

const asyncApiCall = async () => {
    return await PgnovasAPI.getNolaborables('2016', 'opcional');
}
module.exports = {

    getDiaFeriados: (req,res) =>  {
        const tasks = DiaFeriado.find();
        if(tasks.length > 3 ){
            res.json(tasks);
        }else{
            asyncApiCall().
            then(response => {
                response.data.forEach(
                    (value)=> console.log(value)
                );
            });
        }
    }


}