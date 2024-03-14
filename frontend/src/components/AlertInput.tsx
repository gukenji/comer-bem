import { Alert } from "@mui/material";
const AlertInput = ({ result }: { result: boolean | null }) => {
  return (
    <div>
      {result ? (
        <Alert
          severity="success"
          sx={{ mt: 2, fontFamily: "VT323", fontSize: 15 }}
        >
          ALIMENTO CADASTRADO COM SUCESSO!
        </Alert>
      ) : result == false ? (
        <Alert
          severity="error"
          sx={{ mt: 2, fontFamily: "VT323", fontSize: 15 }}
        >
          ERRO AO CADASTRAR ALIMENTO!
        </Alert>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AlertInput;
