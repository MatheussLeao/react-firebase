import LoadingButton from "@mui/lab/LoadingButton";

export const SharedLoadingButton = (props) => {
  const { children, variant } = props;
  return (
    <LoadingButton {...props} variant={variant || "outlined"}>
      {children}
    </LoadingButton>
  );
};
