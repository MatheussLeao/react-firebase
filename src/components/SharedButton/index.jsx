import { Button } from "@mui/material";

export const SharedButton = (props) => {
  const { variant, children } = props;
  return (
    <Button {...props} variant={variant || "outlined"}>
      {children}
    </Button>
  );
};
