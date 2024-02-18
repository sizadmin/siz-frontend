import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const ServerError = () => {
  const history = useHistory();
  document.body.style.height = "100%";
  return (
    <div className="noPageFound">
      <div>
        <h1 className="mb-3"> Something went wrong </h1>
        <h6 className="text-center">
          Please try again or report a issue to support
        </h6>
        <br />

        <div className="text-center">
          <Button
            variant="primary"
            onClick={() => {
              history.goBack();
            }}
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
};
