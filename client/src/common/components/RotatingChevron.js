import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const RotatingChevron = (props) => {
  const { open, setOpen } = props;
  const handleRotate = () => setOpen(!open);
  const rotate = open ? "rotate(180deg)" : "rotate(0)";
  return (
    <ExpandMoreIcon
      style={{ transform: rotate, transition: "all 0.1s linear" }}
      onClick={handleRotate}
    />
  );
};

export default RotatingChevron;
