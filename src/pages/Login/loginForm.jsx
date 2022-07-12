import { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Grid,
  Link,
  TextField,
  Tooltip,
} from "@mui/material";
import { AuthContext } from "../../contexts/auth";
import GoogleIcon from "@mui/icons-material/Google";
import { SharedButton } from "../../components/SharedButton";
import { SharedLoadingButton } from "../../components/SharedLoadingButton";

export const LoginForm = () => {
  const { sign, loading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const hasValueInput = watch("email") || watch("password");

  async function onSubmit(data) {
    await sign["userAndPass"](data);
  }

  async function onSocialLoginSubmit() {
    await sign["google"]();
  }
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("email")}
        margin="normal"
        required
        fullWidth
        label="Email"
        type="email"
        helperText={errors.email}
      />
      <TextField
        {...register("password")}
        margin="normal"
        required
        fullWidth
        label="Senha"
        type="password"
        autoComplete="current-password"
        helperText={errors.password}
      />
      <SharedLoadingButton
        type="submit"
        loading={loading}
        variant="contained"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
      >
        Login
      </SharedLoadingButton>
      <SharedButton
        type="button"
        onClick={onSocialLoginSubmit}
        fullWidth
        disabled={!!hasValueInput}
        sx={{ mb: 2 }}
      >
        <Tooltip title="Login com a conta Google">
          <GoogleIcon color="default" />
        </Tooltip>
      </SharedButton>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Esqueci a senha
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
