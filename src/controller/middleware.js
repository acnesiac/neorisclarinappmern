const DiaFeriado = require('../models/diaferiado');
const PgnovasAPI = require('../controller/pgnovas');

const asyncApiCall = async () => {
    return await PgnovasAPI.getNolaborables('2016', 'opcional');
}
module.exports = {

    getDiaFeriados: (req,res) =>  {
        const diasFeriados = DiaFeriado.find();
        if(diasFeriados.length > 0 ){
            res.json(diasFeriados);
        }else{
            asyncApiCall().
            then(response => {
                response.data.forEach(
                    (dia)=> {
                        let newDia = {title : dia.id, description: dia.id}
                        const task = new DiaFeriado(newDia);
                        task.save();
                    }
                );
                res.json(response.data);
            });
        }
    }


}