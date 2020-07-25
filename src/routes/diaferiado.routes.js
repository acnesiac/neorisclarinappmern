const express = require('express');
const router = express.Router();

// Middleware
const DiaFeriado = require('../models/diaferiado');
const Middleware = require('../controller/diaferiado.controller');

// GET todos los dias feriados
router.get('/',Middleware.getDiaFeriados);

// GET Dia feriado por id
router.get('/:id', async (req, res) => {
    const dia = await DiaFeriado.find({id: req.params.id});
    res.json(dia[0]._doc);
});

// POST nuevo feriado
router.post('/', async (req, res) => {
    const {title, description} = req.body;
    const dia = new DiaFeriado({title, description});
    await dia.save();
    res.json({status: 'DiaFeriado guardado'});
});

// UPDATE un nuevo feriado
router.put('/:id', async (req, res) => {
    const {title, description} = req.body;
    const newDiaFeriado = {title, description};
    await DiaFeriado.findByIdAndUpdate(req.params.id, newDiaFeriado);
    res.json({status: 'DiaFeriado Actualizado'});
});


module.exports = router;
