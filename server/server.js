const { err } = require("console");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  port: "3306",
  database: "CadeOR3",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { codbarras } = req.body;
  const { nome } = req.body;
  const { qtd } = req.body;
  const { tipo } = req.body;
  const { descricao } = req.body;
  const { valor } = req.body;
  const { estilo } = req.body;
  const { capa } = req.body;

  let SQL = "CALL RegProduto  ( ?, ?, ?, ?, ?, ?, ?, ?  )";

  db.query(
    SQL,
    [codbarras, nome, qtd, tipo, descricao, valor, estilo, capa],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/registerCli", (req, res) => {
  const { nome } = req.body;
  const { email } = req.body;
  const { login } = req.body;
  const { senha } = req.body;
  const { tel } = req.body;
  const { cpf } = req.body;
  const { rg } = req.body;
  const { cnpj } = req.body;
  const { ie } = req.body;
  const { cep } = req.body;
  const { logradouro } = req.body;
  const { uf } = req.body;
  const { cidade } = req.body;
  const { numero } = req.body;

  let SQL = "CALL RegCli  ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?  )";

  db.query(
    SQL,
    [
      nome,
      email,
      login,
      senha,
      tel,
      cpf,
      rg,
      cnpj,
      ie,
      cep,
      logradouro,
      uf,
      cidade,
      numero,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/search", (req, res) => {
  const { nome } = req.body;
  const { tipo } = req.body;
  const { qtd } = req.body;
  const { valor } = req.body;
  const { codbarras } = req.body;
  const { capa } = req.body;

  let mysql =
    "SELECT * from vwProdutos WHERE Nome = ? AND Tipo = ? AND Qtd = ? AND Valor = ? AND CodBarras = ? AND Capa = ?";
  db.query(mysql, [nome, tipo, qtd, valor, codbarras, capa], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/produto/:codbarras", (req, res) => {
  const { codbarras } = req.params;
  console.log(`Buscando produto com código de barras: ${codbarras}`); // Adicione este log
  let mysql = "SELECT * FROM vwProdutos WHERE Codbarras = ?";
  db.query(mysql, [codbarras], (err, result) => {
    if (err) {
      console.error("Erro ao buscar detalhes do produto:", err); // Adicione este log
      res.status(500).send("Erro ao buscar detalhes do produto");
      return;
    }
    console.log("Resultado da consulta:", result);
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).send("Produto não encontrado");
    }
  });
});

app.get("/getcards", (req, res) => {
  let SQL = "Select * from vwProdutos";

  db.query(SQL, (error, result) => {
    if (error) console.log(error);
    else res.send(result);
  });
});


app.put("/edit", (req, res) => {
  const { codbarras } = req.body;
  const { nome } = req.body;
  const { tipo } = req.body;

  let mysql = "UPDATE TbEstoque SET Nome = ?, Tipo = ? WHERE CodBarras = ?";
  db.query(mysql, [nome, tipo, codbarras], (err, result) => {
    if (err) {
      res.send(err);
      console.log(err)
    } else {
      res.send(result);
      console.log(res)
    }
  });
});

app.delete("/delete/:codbarras", (req, res) => {
  const { codbarras } = req.params;
  let mysql = "DELETE FROM TbEstoque WHERE CodBarras = ?";
  db.query(mysql, [codbarras], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3002, () => {
  console.log("Rodando o servidor");
});
