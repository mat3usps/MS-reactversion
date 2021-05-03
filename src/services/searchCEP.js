import axios from "axios";

export const brasilAPICEP = async (cep) => {
  try {
    let data = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);

    return data;
  } catch (error) {
    console.log("Error on Brasil API - CPF");
  }
};
