const { err } = require("console");
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  port: "3306",
  database: "CadeOR3",
});

app.use(cors());
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "secret_key", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

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

app.post("/registerCli", async (req, res) => {
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

  const hashedPassword = await bcrypt.hash(senha, 10);

  db.query(
    SQL,
    [
      nome,
      email,
      login,
      hashedPassword,
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
      console.log(result);
    }
  );
});

const JWT_SECRET = "your_secret_key_here";

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM TbLogin WHERE Login = ?",
    [username],
    async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro interno no servidor");
      }

      if (results.length === 0) {
        return res.status(400).send("Usuário não encontrado!");
      }

      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.Senha);

      if (!passwordMatch) {
        return res.status(403).send("Senha incorreta!");
      }

      const accessToken = jwt.sign({ username: user.Login }, JWT_SECRET);
      res.json({ accessToken });
    }
  );
});

app.post("/completePurchase", authenticateToken, (req, res) => {
  const { vNf, vCodBarras, vTipoPagamento, vQtdDesejada } = req.body;
  const vNomeCli = req.user.username; // Pegando o nome do cliente do token

  const query = `CALL RegVenda(?, ?, ?, ?, ?)`;
  db.query(
    query,
    [vNf, vNomeCli, vCodBarras, vTipoPagamento, vQtdDesejada],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: true, message: error.message });
      }

      const email = results[0][0].Email; // Supondo que a procedure retorna o e-mail do cliente

      // Configurar o nodemailer para enviar e-mails
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "cadeor3@gmail.com",
          pass: "sua_senha",
        },
      });

      const mailOptions = {
        from: "cadeor3@gmail.com",
        to: email,
        subject: "Compra realizada com sucesso",
        text: "Obrigado por sua compra!",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: true, message: error.message });
        }
        res.json({
          error: false,
          message: "Compra realizada com sucesso e e-mail enviado.",
        });
      });
    }
  );
});

// Rota protegida (exemplo)
app.get("/profile", authenticateToken, (req, res) => {
  res.send("This is a protected route");
});

app.post("/search", (req, res) => {
  const { nome } = req.body;
  const { tipo } = req.body;
  const { qtd } = req.body;
  const { valor } = req.body;
  const { descricao } = req.body;
  const { codbarras } = req.body;
  const { capa } = req.body;

  let mysql =
    "SELECT * from TbEstoque WHERE Nome = ? AND Tipo = ? AND Qtd = ? AND Descricao = AND Valor = ? AND CodBarras = ? AND Capa = ?";
  db.query(mysql, [nome, tipo, qtd, valor, codbarras, capa], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/produto/:codbarras", (req, res) => {
  const { codbarras } = req.params;
  console.log(`Buscando produto com código de barras: ${codbarras}`); // Adicione este log
  let mysql = "SELECT * FROM TbEstoque WHERE Codbarras = ?";
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
  let SQL = "Select * from TbEstoque";

  db.query(SQL, (error, result) => {
    if (error) console.log(error);
    else res.send(result);
  });
});

app.put("/edit", (req, res) => {
  const { codbarras } = req.body;
  const { nome } = req.body;
  const { valor } = req.body;
  const { tipo } = req.body;
  const { qtd } = req.body;
  const { descricao } = req.body;
  const { estilo } = req.body;
  const { capa } = req.body;

  let mysql =
    "UPDATE TbEstoque SET Nome = ?, Valor = ?, Tipo = ?, Qtd = ?, Descricao = ?, Estilo = ?, Capa = ?  WHERE CodBarras = ?";
  db.query(
    mysql,
    [nome, valor, tipo, qtd, descricao, estilo, capa, codbarras],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(result);
        console.log(res);
      }
    }
  );
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

app.listen(3001, () => {
  console.log("Rodando o servidor");
});
