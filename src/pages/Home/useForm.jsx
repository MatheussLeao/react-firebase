import { collection, getFirestore, addDoc } from "firebase/firestore";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { app } from "../../services/config";
import { Box } from "@mui/system";
import { SharedLoadingButton } from "../../components/SharedLoadingButton";
import { toast } from "react-toastify";
import { useState } from "react";

export const UserForm = () => {
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const db = getFirestore(app);
  const useCollectionRef = collection(db, "users");

  const onSubmit = async () => {
    setLoading(true);
    const data = {
      name: watch("name"),
      email: watch("email"),
      password: watch("password"),
    };
    await addDoc(useCollectionRef, {
      ...data,
    })
      .then(() => {
        toast.success("Usuário adicionado com sucesso.");
        setLoading(false);
        reset();
      })
      .catch(() => {
        setLoading(false);
        toast.error("Ocorreu erro ao adicionar usuário.");
      });
  };

  return (
    <div>
      <Box textAlign="right" component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField sx={{ m: 1 }} fullWidth type="text" {...register("name")} required label="Nome" />
        <TextField sx={{ m: 1 }} fullWidth type="email" {...register("email")} required label="Email" />
        <TextField sx={{ m: 1 }} fullWidth type="password" {...register("password")} required label="Senha" />
        <SharedLoadingButton type="submit" loading={loading} variant="contained" sx={{ mt: 3, mb: 2 }}>
          Login
        </SharedLoadingButton>
      </Box>
    </div>
  );
};
