import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ITableList } from "./interface";
import { useContext, useEffect, useState } from "react";
import CreateModal from "../create-modal";
import { ProcessType } from "../../utils/process-type.enum";
import Button from "@mui/material/Button";
import { ModalType } from "../create-modal/modal-type.enum";
import { MeetupService } from "../../services/meetup/meetup.service";
import { ServiceService } from "../../services/service/service.service";
import { SnackbarContext } from "../../index";
import MainStore from "../../stores/index";
import { useNavigate } from "react-router-dom";

export default function TableList(props: ITableList) {
  const [titles, setTitles] = useState([] as string[]);
  const [data, setData] = useState([] as any[]);
  let navigate = useNavigate();
  //@ts-ignore
  const { setSnack } = useContext(SnackbarContext);
  let bannedTitles = ["userId", "address", "description", "id"];
  useEffect(() => {
    if (props.data) {
      setData(props.data.data);
      setTitles(
        props.data.title?.reverse().filter((k) => !bannedTitles.includes(k))
      );
    }
  }, [props.data]);
  const getItem = (key: string, index: number) => {
    if (data[index][key]) {
      if (key == "imageUrl") {
        return (
          <TableCell key={index + "asssa"}>
            <a href={data[index][key]} target="_blank">
              <img width="200px" src={data[index][key]} />
            </a>
          </TableCell>
        );
      }
      return (
        <TableCell key={key + data[index][key]}>{data[index][key]}</TableCell>
      );
    }
    return "";
  };

  let editButton = (item: any) => {
    return props.showEditButton ? (
      <CreateModal
        userId={item.userId}
        data={item}
        buttonName={"Edit"}
        type={props.type}
        mode={ProcessType.Update}
      />
    ) : (
      ""
    );
  };
  let handleClick = (id: number) => {
    if (props.type == ModalType.Service) {
      MainStore.setActiveService(id);
      navigate("/service/detail", { state: { id: id } });
    } else if (props.type == ModalType.Meetup) {
      navigate("/meetup/detail", { state: { id: id } });
      MainStore.setActiveMeetup(id);
    }
    return undefined;
  };

  let deleteButton = (id: any) => {
    return props.showEditButton ? (
      <Button
        variant="outlined"
        color="error"
        onClick={async () => {
          let result = undefined;
          if (props.type === ModalType.Meetup) {
            result = await MeetupService.delete(id);
          } else {
            result = await ServiceService.delete(id);
          }
          setSnack({
            message: result.message,
            open: true,
            type: result.isSuccess ? "success" : "error",
          });
          setInterval(() => {
            window.location.reload();
          }, 1000);
        }}
        size="large"
      >
        Delete
      </Button>
    ) : (
      ""
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {titles?.map((item: string, index: number) => {
              return <TableCell key={index}>{item.toUpperCase()}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item: any, dataIndex: number) => {
            return (
              <TableRow key={dataIndex + "asssa"} style={{ cursor: "pointer" }}>
                {titles?.map((value: string, index: number) => {
                  return getItem(value, dataIndex);
                })}
                <TableCell align="right">{deleteButton(item.id)}</TableCell>

                <TableCell align="right">{editButton(item)}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      handleClick(item.id);
                    }}
                  >
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
