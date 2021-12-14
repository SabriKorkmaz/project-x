import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ModalType } from "../create-modal/modal-type.enum";

export default function MediaCard(props: any) {
  let navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345, p: 4, cursor: "pointer" }}>
      <CardMedia
        component="img"
        height="140"
        image={props.data.imageUrl}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.data.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            console.log(props);
            if (props.type == ModalType.Meetup)
              navigate("/meetup/detail", { state: { id: props.data.id } });
            if (props.type === ModalType.Service) {
              navigate("/service/detail", { state: { id: props.data.id } });
            }
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
