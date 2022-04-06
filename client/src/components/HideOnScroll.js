import { Slide } from "@material-ui/core";

// const HideOnScroll = ({ children }) => {
//   return children;
// };

const HideOnScroll = ({ children, direction, trigger }) => {
  return (
    <Slide
      appear={false}
      direction={direction}
      in={!trigger}
      timeout={{ enter: 500, exit: 1000 }}
    >
      {children}
    </Slide>
  );
};

export default HideOnScroll;
