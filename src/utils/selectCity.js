const selectCity = id => {
  let city;
  switch (id) {
    case 0:
      city = {
        name: "Mumbai",
        latitude: 19.075983,
        longitude: 72.877655
      };
      return {
        city
      };
    case 1:
      city = {
        name: "Tianjin",
        latitude: 39.343357,
        longitude: 117.361649
      };
      return {
        city
      };
    case 2:
      city = {
        name: "Manila",
        latitude: 14.599512,
        longitude: 120.984222
      };
      return {
        city
      };
    case 3:
      city = {
        name: "Moscow",
        latitude: 55.755825,
        longitude: 37.617298
      };
      return {
        city
      };
    case 4:
      city = {
        name: "Tokyo",
        latitude: 35.689487,
        longitude: 139.691711
      };
      return {
        city
      };
    case 5:
      city = {
        name: "Dhaka",
        latitude: 23.810331,
        longitude: 90.412521
      };
      return {
        city
      };
    case 6:
      city = {
        name: "Istanbul",
        latitude: 41.00824,
        longitude: 28.978359
      };
      return {
        city
      };
    case 7:
      city = {
        name: "Karachi",
        latitude: 24.860735,
        longitude: 67.001137
      };
      return {
        city
      };
    case 8:
      city = {
        name: "Beijing",
        latitude: 39.904202,
        longitude: 116.407394
      };
      return {
        city
      };
    default:
      city = {
        name: "Shanghai",
        latitude: 31.230391,
        longitude: 121.473701
      };
      return {
        city
      };
  }
};

export default selectCity;
