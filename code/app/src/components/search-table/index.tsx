import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ITableList } from "./interface";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { ModalType } from "../create-modal/modal-type.enum";
import MainStore from "../../stores/index";
import { useNavigate } from "react-router-dom";

export default function SearchTable(props: ITableList) {
  const [titles, setTitles] = useState([] as string[]);
  const [data, setData] = useState([] as any[]);
  let navigate = useNavigate();
  let bannedTitles = ["userId", "address", "description", "id", "type"];
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

  let handleClick = (item: any) => {
    if (item.type == ModalType.Service) {
      MainStore.setActiveService(item.id);
      navigate("/service/detail", { state: { id: item.id } });
    } else if (item.type == ModalType.Meetup) {
      navigate("/meetup/detail", { state: { id: item.id } });
      MainStore.setActiveMeetup(item.id);
    }
    return undefined;
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {titles?.map((item: string, index: number) => {
              return <TableCell key={index}>{item.toUpperCase()}</TableCell>;
            })}
            <TableCell align="right">Detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item: any, dataIndex: number) => {
            return (
              <TableRow key={dataIndex + "asssa"} style={{ cursor: "pointer" }}>
                {titles?.map((value: string, index: number) => {
                  return getItem(value, dataIndex);
                })}
                <TableCell align="right">
                  {" "}
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      handleClick(item);
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
