import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

export const getAll = async (route) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}/${route}`,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateOne = async (route, data, id) => {
  try {
    const response = await axios({
      method: "PATCH",
      url: `${BASE_URL}/${route}/${id}`,
      data,
    });

    return response?.data?.doc;
  } catch (err) {
    console.log(err);
  }
};

export const createOne = async (route, data) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/${route}`,
      data,
    });

    return response?.data?.doc;
  } catch (err) {
    console.log(err);
  }
};

export const deleteOne = async (route, id) => {
  try {
    await axios({
      method: "DELETE",
      url: `${BASE_URL}/${route}/${id}`,
    });
  } catch (err) {
    console.log(err);
  }
};
