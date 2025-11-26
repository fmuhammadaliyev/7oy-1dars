import axios from "axios";

const useAxios = () => {
  const response = (props) => {
    const { url, method = "GET", headers, params, body } = props;
    return axios({
      url: `https://json-api.uz/api/project/fn44-amaliyot/${url}`,
      method,
      data: body,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      params: {
        ...params,
      },
    });
  };
  return response;
};

export default useAxios;
