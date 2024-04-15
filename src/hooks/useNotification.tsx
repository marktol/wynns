import { AlertColor, Slide, SlideProps } from "@mui/material";
import { useSnackbar } from "notistack";

const SlideTransition = (props: SlideProps) => (
  <Slide {...props} direction="left" />
);

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const enqueueNotification = (message: string, variant: AlertColor) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { vertical: "top", horizontal: "right" },
      TransitionComponent: SlideTransition,
      autoHideDuration: 2000,
    });
  };

  return { enqueueNotification };
};

export default useNotification;
