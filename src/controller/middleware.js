const DiaFeriado = require('../models/diaferiado');
const PgnovasAPI = require('../controller/pgnovas');

const asyncApiCall = async () => {
    return await PgnovasAPI.getNolaborables('2016', 'opcional');
}
module.exports = {

    getDiaFeriados: async (req,res) =>  {
        const diasFeriados = await DiaFeriado.find();
        if(diasFeriados.length > 0 ){
            res.json(diasFeriados);
        }else{
            asyncApiCall().
            then(response => {
                response.data.forEach(
                    (dia)=> {
                        let newDia = { motivo: dia.motivo, tipo : dia.tipo, dia: dia.dia, mes: dia.mes , _id : dia.id}
                        const task = new DiaFeriado(newDia);
                        task.save();
                    }
                );
                res.json(response.data);
            });
        }
    }


}