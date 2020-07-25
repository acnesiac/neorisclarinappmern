const DiaFeriado = require('../models/diaferiado');
const PgnovasAPI = require('../controller/pgnovas');

const PgnovasAPICall = async () => {
    return await PgnovasAPI.getNolaborables('2016', 'opcional');
}
exports.getDiaFeriados = (req,res,next)=>{
    const diasFeriados = DiaFeriado.find().exec().then(dias => {
        if(dias.length > 0 ){
            res.json(dias);
        }else{
            PgnovasAPICall().
            then(response => {
                response.data.forEach(
                    (dia)=> {
                        let newDia = { motivo: dia.motivo, tipo : dia.tipo, dia: dia.dia, mes: dia.mes , id : dia.id }
                        const task = new DiaFeriado(newDia);
                        task.save();
                    }
                );
                res.json(response.data);
            });
        }
    });
}