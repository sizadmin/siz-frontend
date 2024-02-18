import { Button } from "react-bootstrap";

export const NoMatchPage = () => {
  document.body.style.height = "100%";
  return (
    <div className="noPageFound">
      Page Not found
      <br />
      <Button
        className="mt-3"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Go Back
      </Button>
    </div>
  );
};
