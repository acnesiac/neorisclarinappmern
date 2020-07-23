const DiaFeriado = require('../models/diaferiado');
const PgnovasAPI = require('../controller/pgnovas');

const asyncApiCall = async () => {
    return await PgnovasAPI.getNolaborables('2016', 'opcional');
}
exports.getDiaFeriados = (req,res,next)=>{

    const diasFeriados = DiaFeriado.find().exec().then(dias => {
        console.log(dias.length);
        if(dias.length > 0 ){
            res.json(dias);
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
    });



}