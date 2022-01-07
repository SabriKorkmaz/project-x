import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { UserService } from "../../services/user/user.service";
import { SnackbarContext } from "../../index";
import { InputLabel } from "@mui/material";
import { Input } from "@material-ui/core";
import { MeetupService } from "../../services/meetup/meetup.service";
import { BaseService } from "../../services/base/base.service";
import Modal from "@mui/material/Modal";
import * as React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MainStore from "../../stores";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function UpdateProfile(props: any) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [file, setFile] = useState(null as any);
  const [description, setDescription] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // @ts-ignore
  const { setSnack } = useContext(SnackbarContext);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  style.width = props.width ?? "30%";
  useEffect(() => {
    if (props.data) {
      setName(props.data.name);
      setSurname(props.data.surname);
      setDescription(props.data.description);
      setEmail(props.data.email);
      setProfileImg(props.data.profileImg);
    }
  }, [props.data]);
  const handleSubmit = async () => {
    let result = await UserService.update({
      id: props.data.id,
      name: name,
      surname: surname,
      email: email,
      password: password,
      description: description,
      profileImg: profileImg,
    });

    setSnack({
      message: result.message,
      open: true,
      type: result.isSuccess ? "success" : "error",
    });

    setInterval(() => {
      window.location.reload();
    }, 1333);
  };

  let editButton = () => {
    if (!props.auth) return;
    return (
      <Button
        variant="outlined"
        size="small"
        endIcon={<ModeEditIcon />}
        onClick={handleOpen}
      >
        Edit Profile
      </Button>
    );
  };
  const onFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };
  const uploadImage = async () => {
    const formData = new FormData();
    if (file.name == null) {
      setSnack({
        message: "Henüz bir dosya seçmediniz.",
        open: true,
        type: "error",
      });
    }
    formData.append("file", file as any, file.name);
    let result = await MeetupService.upload(formData);
    if (result.isSuccess) {
      result.url = BaseService.baseUrl + result.url.slice(1);
      setProfileImg(result.url);
    }
    setSnack({
      message: result.message,
      open: true,
      type: result.isSuccess ? "success" : "error",
    });
    await MainStore.updateUser();
  };

  return (
    <div>
      {editButton()}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Avatar sx={{ m: 1 }}>
            <Avatar alt="Remy Sharp" src={profileImg} />
          </Avatar>
          <InputLabel htmlFor="import-button" style={{ border: "none" }}>
            <Input
              onChange={onFileChange}
              id="import-button"
              inputProps={{
                accept: ".png,.jpeg,.jpg",
              }}
              type="file"
              name="file"
            />
            <Button
              onClick={uploadImage}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Upload image
            </Button>
          </InputLabel>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              variant="outlined"
              label="Name"
              autoComplete="name"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              variant="outlined"
              label="Surname"
              name="surname"
              autoComplete="surname"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="overview"
              label="Overview"
              name="overview"
              autoComplete="overview"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              variant="outlined"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              name="passwordConfirm"
              label="Password Confirm"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              fullWidth
              onClick={handleSubmit}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
