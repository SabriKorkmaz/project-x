import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchTable from "../../components/search-table";
import { UserService } from "../../services/user/user.service";

export const Search = (props: any) => {
  const { state } = useLocation();
  const { keyword } = state;
  const [data, setData] = useState([] as any);
  useEffect(() => {
    const fetchData = async () => {
      let result = await UserService.search({
        keyword: keyword,
      });
      console.log(result);
      setData([]);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Box style={{ marginTop: "20px" }}>
        <SearchTable data={data} />
      </Box>
    </React.Fragment>
  );
};
