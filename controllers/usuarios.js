const bcrypt = require("bcryptjs/dist/bcrypt");
const { request, response } = require("express");
const pool = require("../db/conexion");
const usuariosQueries = require("../models/usuarios");
const bcryptjs = require("bcryptjs");
const req = require("express/lib/request");

const usuariosGet = async (req = request, res = response) => {
  const {limite = 5, desde = 0 } = req.query;
 desde = parseInt(desde);
 limite = parseInt(limite);

 
  let conn;

try {
  conn = await pool.getConnection();

  const usuarios = await conn.query(usuariosQueries.selectUsuarios, [ 
    desde,
  limite,
]);
  
  res.json({usuarios});
} catch (error){
  console.log(error);
  res
  .status(500)
  .json({ msg: "por favor conectate al administrador.", error});
}finally {
  if (conn) conn.end();
}
};


const usuariosPost = async (req = request, res = response) => {
  const {nombre, email, password, status = 1 } = req.body;

  let conn;

try {
  const salt = bcrypt.getSaltSync();
  const passwordHash = bcryptjs.hashSync(password, salt);

  conn = await pool.getConnection();
  
  const usuarios = await conn.query(usuariosQueries.insertUsuario, [
    nombre,
     email, 
     passwordHash,
      status]);
  
  res.json({usuarios});
} catch (error){
  console.log(error);
  res
  .status(500)
  .json({ msg: "por favor conectate al administrador.", error});
}finally {
  if (conn) conn.end();
}
};

const usuariosPut = async (req = request, res = response) => {
  const { email } = req.query;
  const { nombre, status } = req.body;

  let conn;

try {
  conn = await pool.getConnection();
  const usuarios = await conn.query(usuariosQueries.updateUsuario, [
    nombre,
     status,
      email,
    ]);
  
  res.json({usuarios});
} catch (error){
  console.log(error);
  res
  .status(500)
  .json({ msg: "por favor conectate al administrador.", error});
}finally {
  if (conn) conn.end();
}
  
};

const usuariosDelete = async (req = request, res = response) => {
  const { email } = req.query;

  let conn;

try {
  conn = await pool.getConnection();
  const usuarios = await conn.query(usuariosQueries.deleteUsuario, [ email ]);
  
  res.json({usuarios});
} catch (error){
  console.log(error);
  res
  .status(500)
  .json({ msg: "por favor conectate al administrador.", error});
}finally {
  if (conn) conn.end();
}
  
};

const usuarioSignin = async (req = request, res = response) => {
  const {email, password} = req.body;
   let conn;

   try {
     conn = await pool.getConnection();

     const usuarios = await conn.query(usuariosQueries.get, [ email ]);

     res.json({ usuarios });
   }catch (error) {
     console.log( error );
     res

         .status(500)
         .json({ msg: "porfavor conectae al administrador.",error});

   }finally{

    if (conn) conn.end();
   }
}
module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete };