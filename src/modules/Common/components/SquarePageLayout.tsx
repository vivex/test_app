import MUIContainer from "@mui/material/Container";
import MUIBox from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const Container = styled(MUIContainer)({
  background:
    "linear-gradient(196deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 35%, rgba(0,212,255,1) 100%)",
  maxWidth: "100% !important",
  height: "100vh",
  paddingTop: "3rem",
  paddingBottom: "3rem",
  paddingLeft: "8rem !important",
  paddingRight: "8rem !important",
});

const Box = styled(MUIBox)(({ theme }) => {
  return {
    backgroundColor: theme.palette.mode === "dark" ? "#1a2127" : "#fff",
    padding: 0,
  };
});

export function SquarePageLayout({ children }) {
  return (
    <Container>
      <Box>{children}</Box>
    </Container>
  );
}
