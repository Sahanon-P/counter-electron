import {
  Modal,
  Backdrop,
  Typography,
  Button,
  Stack,
} from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "black",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
};
export default function Message({
  message,
  open,
  handleClose,
}: {
  message: string;
  open: boolean;
  handleClose: () => void;
}) {
  let check = false;
  if (message.includes("blue")) {
    check = true;
  } else if (message.includes("red")) {
    check = false;
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      {check ? (
        <Stack spacing={5} sx={style}>
          <Typography color={"primary"} variant="h1">
            {message.toUpperCase()}
          </Typography>
          <Button color={"primary"} onClick={handleClose}>
            {" "}
            close
          </Button>
        </Stack>
      ) : (
        <Stack spacing={5} sx={style}>
          <Typography color={"error"} variant="h1">
            {message.toUpperCase()}
          </Typography>
          <Button color={"error"} onClick={handleClose}>
            {" "}
            close
          </Button>
        </Stack>
      )}
    </Modal>
  );
}
