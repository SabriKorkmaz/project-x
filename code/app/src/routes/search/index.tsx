import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchTable from "../../components/search-table";
import { UserService } from "../../services/user/user.service";
import { ModalType } from "../../components/create-modal/modal-type.enum";

export const Search = (props: any) => {
  const { state } = useLocation();
  const { keyword } = state;
  const [data, setData] = useState({} as any);
  useEffect(() => {
    const fetchData = async () => {
      let result = await UserService.search({
        keyword: keyword,
      });
      let searchData: any = [];
      if (result.dataMeetup.length) {
        result.dataMeetup.forEach((item: any) => {
          searchData.push({
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            duration: item.duration,
            date: item.date,
            capacity: item.capacity,
            description: item.description,
            address: item.address,
            userId: item.userId,
            type: ModalType.Meetup,
          });
        });
      }
      if (result.dataService.length) {
        result.dataService.forEach((item: any) => {
          searchData.push({
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            duration: item.duration,
            date: item.date,
            credit: item.credit,

            capacity: item.capacity,
            description: item.description,
            address: item.address,
            userId: item.userId,
            type: ModalType.Service,
          });
        });
      }
      setData(searchData);

      if (searchData.length) {
        setData({
          title: Object.keys(searchData[0]),
          data: searchData,
        });
      }
    };
    fetchData();
  }, []);

  let result = () => {
    if (data.length === 0) {
      return <h3>No result found</h3>;
    }
    return <SearchTable data={data} />;
  };
  return (
    <React.Fragment>
      <Box style={{ marginTop: "20px" }}>{result()}</Box>
    </React.Fragment>
  );
};
