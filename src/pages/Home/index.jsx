import React, { useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { Header } from "../../components/Header";
import { Container } from "@mui/system";
import { app } from "../../services/config";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ListUsers } from "./listUsers";
import FormDialog from "./createUser";

export const Home = () => {
  const { user, signOut } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const userLogado = JSON.parse(JSON.stringify(user));
  const settings = [
    {
      label: "Meus Dados",
      action: () => navigate("/profile"),
    },
    {
      label: "Logout",
      action: () => signOut(),
    },
  ];

  const db = getFirestore(app);
  const userCollections = collection(db, "users");
  
  const handleClose = () => {
    setOpen(false);
  }

  const getUsers = useCallback(async () => {
    const data = await getDocs(userCollections);

    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <Header imgUrl={userLogado.photoURL} menuAvatar={settings} />
      <Container maxWidth="xl">
        <Grid container>
          <Grid
            item
            xs={12}
            textAlign="center"
            sx={{
              mt: 5,
            }}
          >
            <Typography variant="h6">Lista de usuários</Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: 10 }}>
            <Button
              sx={{
                mb: 3,
              }}
              onClick={() => setOpen(true)}
              variant="contained"
            >
              Adicionar novo
            </Button>
            <ListUsers listaData={users} />
          </Grid>
        </Grid>
      </Container>
      {open && <FormDialog open={open} handleClose={() => handleClose()} />}
    </>
  );
};
