const express = require('express');
const MySQLStore = require('express-mysql-session');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { trabajador, beneficiario, edad, parentesco, curp, mail, cel, curpb, edicion } = req.body;
    const newLink = {
        trabajador,
        beneficiario,
        edad,
        parentesco,
        curp,
        mail,
        cel,
        curpb,
	edicion,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO beneficiarios set ?', [newLink]);
    req.flash('success', 'Guardado Correctamente');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM beneficiarios WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links });
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM beneficiarios WHERE ID = ?', [id]);
    req.flash('success', 'Borrado Correctamente');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const user = req.user.id;
    const links = await pool.query('SELECT * FROM beneficiarios WHERE id = ? AND user_id = ?', [id, user]);
    if(user === links[0].user_id) {
        res.render('links/edit', {links: links[0]});
    }else{
    res.redirect('/');
    }

});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { trabajador, beneficiario, edad, parentesco, curp, mail, cel, curpb, edicion } = req.body;
    const newLink = {
        trabajador,
        beneficiario,
        edad,
        parentesco,
        curp,
        mail,
        cel,
        curpb,
        edicion
    };
    await pool.query('UPDATE beneficiarios set ? WHERE id = ?', [newLink, id])
    res.redirect('/links');
    req.flash('success', 'Editado Correctamente');
});

router.get('/search', isLoggedIn, async (req, res) => {
    const { nombre } = req.query;
    const links = await pool.query(`SELECT * FROM beneficiarios WHERE user_id = ${req.user.id} AND trabajador LIKE "%${nombre}%"`);
    res.render('links/search', { links });
    console.log(req.query);
    console.log(res.query);
});

router.get('/missing', isLoggedIn, async (req, res) => {
    const { missing } = req.query;
    const links = await pool.query(`SELECT * FROM beneficiarios WHERE user_id = ${req.user.id} AND edicion = 0`);
    res.render('links/missing', { links });
    console.log(req.query);
    console.log(res.query);
    
    
});



module.exports = router;


