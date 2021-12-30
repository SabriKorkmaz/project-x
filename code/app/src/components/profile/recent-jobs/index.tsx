import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Rating } from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

export const RecentJobs = (props: any) => {
  let navigate = useNavigate();
  useEffect(() => {
    console.log(props);
  }, [props.data]);
  return (
    <React.Fragment>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography
          component="h2"
          variant="h6"
          color="primary"
          style={{ margin: 10 }}
          gutterBottom
        >
          Meetups Comments
        </Typography>
        {props.data?.meetups?.map((meetup: any, dataIndex: number) => {
          return (
            <Accordion style={{ marginBottom: "5px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    {meetup.title}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<SendIcon />}
                    onClick={() => {
                      navigate("/meetup/detail", {
                        state: { id: meetup.id },
                      });
                    }}
                  >
                    Detail
                  </Button>
                </div>
              </AccordionSummary>
              {meetup?.comments.map((comment: any, dataIndex: number) => {
                return (
                  <AccordionDetails>
                    <Typography
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Rating
                        name="read-only"
                        style={{ marginBottom: 5 }}
                        value={comment.rate}
                        readOnly
                      />
                      <Typography sx={{ color: "text.secondary" }}>
                        {comment.date}
                      </Typography>
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>{comment.comment}</Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {`${comment.owner.name} ${comment.owner.surname}`}
                      </Typography>
                    </div>
                  </AccordionDetails>
                );
              })}
            </Accordion>
          );
        })}
      </div>
    </React.Fragment>
  );
};
