import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Axios from "axios";
import "../FormDialog/FormDialog.css";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    codbarras: props.codbarras,
    nome: props.nome,
    tipo: props.tipo,
    valor: props.valor,
    qtd: props.qtd,
    descricao: props.descricao,
    estilo: props.estilo,
    capa: props.capa,
  });

  const handleChangeValues = (values) => {
    console.log("Novos valores:", values.target.value);
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditGame = () => {
    console.log("Valores editados:", editValues);
    Axios.put("http://localhost:3002/edit", {
      codbarras: editValues.codbarras,
      nome: editValues.nome,
      tipo: editValues.tipo,
      valor: editValues.valor,
      qtd: editValues.qtd,
      descricao: editValues.descricao,
      estilo: editValues.estilo,
      capa: editValues.capa,
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.id == editValues.id
            ? {
                codbarras: editValues.codbarras,
                nome: editValues.nome,
                tipo: editValues.tipo,
                valor: editValues.valor,
                qtd: editValues.qtd,
                descricao: editValues.descricao,
                estilo: editValues.estilo,
                capa: editValues.capa,
              }
            : value;
        })
      );
    });
    handleClose();
    document.location.reload();
  };

  const handleDeleteGame = () => {
    Axios.delete(`http://localhost:3002/delete/${editValues.codbarras}`).then(
      () => {
        props.setListCard(
          props.listCard.filter((value) => {
            return value.codbarras != editValues.codbarras;
          })
        );
      }
    );
    document.location.reload();
    handleClose();
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="codbarras"
            label="Código de Barras"
            defaultValue={props.codbarras}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="nome"
            label="Nome"
            defaultValue={props.nome}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="valor"
            label="Preço"
            defaultValue={props.valor}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="tipo"
            label="Tipo"
            defaultValue={props.tipo}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />

          <TextField
            margin="dense"
            id="qtd"
            label="Quantidade"
            defaultValue={props.qtd}
            onChange={handleChangeValues}
            type="number"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="descricao"
            label="Descrição"
            defaultValue={props.descricao}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="estilo"
            label="Estilo"
            defaultValue={props.estilo}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="capa"
            label="Capa"
            defaultValue={props.capa}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteGame()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditGame()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
