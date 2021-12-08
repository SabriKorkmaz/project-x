import React, { useEffect, useState } from "react";
import { Box, Divider } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import TableList from "../../components/table";
import { ITable } from "../../components/table/interface";
import { ResponseModel } from "../../services/base/response.interface";
import { ServiceModel } from "../../services/service/service.interface";
import { ModalType } from "../../components/create-modal/modal-type.enum";
import { ServiceService } from "../../services/service/service.service";

export const Services = () => {
  const [services, setServices] = useState({} as ITable);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let userId = params.get("id");
    if (userId) {
      const fetchData = async () => {
        let result = await ServiceService.getAll<ResponseModel<ServiceModel[]>>(
          parseInt(userId!)
        );
        if (result.data.length) {
          let tableData = {
            title: Object.keys(result.data[0]),
            data: result.data,
          } as ITable;
          setServices(tableData);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <React.Fragment>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          width: "100%",
        }}
      >
        <Typography
          component="h4"
          color="black"
          variant="h4"
          style={{ marginBottom: "10px" }}
        >
          My Services
        </Typography>
        <Divider variant="middle" style={{ margin: 0 }} />
        <TableList
          type={ModalType.Service}
          showDeleteButton={true}
          showEditButton={true}
          data={services}
        />
      </Box>
    </React.Fragment>
  );
};
