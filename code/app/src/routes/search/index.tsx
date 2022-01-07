import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchTable from "../../components/search-table";
import { UserService } from "../../services/user/user.service";
import { ModalType } from "../../components/create-modal/modal-type.enum";

export const Search = (props: any) => {
  const { state } = useLocation();
  const { keyword } = state;
  const { distance } = state;
  const { location } = state;
  const geocoder = new google.maps.Geocoder();

  const [data, setData] = useState({} as any);
  useEffect(() => {
    let googleData = {} as any;
    let getLocation = async () => {
      googleData = await geocoder.geocode({
        placeId: location.value.place_id,
      });
    };

    const fetchData = async () => {
      let result = [];
      if (location !== null) {
        await getLocation();
        result = await UserService.advancedSearch({
          keyword: keyword,
          distance: distance,
          latitude: googleData.results[0].geometry.location.lat(),
          longitude: googleData.results[0].geometry.location.lng(),
        });
      } else {
        result = await UserService.search({
          keyword: keyword,
        });
      }

      let searchData: any = [];
      if (result.dataMeetup.length) {
        result.dataMeetup.forEach((item: any) => {
          searchData.push({
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
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
            date: item.date,
            hours: item.hours,

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
