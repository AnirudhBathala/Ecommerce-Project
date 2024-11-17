import React from "react";
import { Avatar } from "@mui/material";
import { Rating, Box, Typography, Grid2 } from "@mui/material";

const ProductReviewCard = ({item}) => {
  const [value, setValue] = React.useState(4.5);
  return (
    <div className="">
      <Grid2 container spacing={2} gap={3}>
        <Grid2 item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
            //   alt={item.user.firstName}
              src=""
            >
                {/* {"madhan"} */}
              {/* {item.user.firstName[0].toUpperCase()} */}
            </Avatar>
          </Box>
        </Grid2>
        <Grid2 item xs={9}>
          <div className="space-y-2">
            <div className="">
                {"Madhan Kumar"}
              {/* <p className="font-semibold text-lg">{item.user.firstName}</p> */}
              <p className="opacity-70">April 5, 2023</p>
            </div>
            <div>
            

              <Rating
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
              />
             
            </div>
            <p>
              {item.review}
            </p>
          </div>
        </Grid2>
      </Grid2>
      <div className="col-span-1 flex"></div>
    </div>
  );
};

export default ProductReviewCard;
