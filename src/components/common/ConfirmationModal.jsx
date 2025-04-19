import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ConfirmationModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          textAlign: "center",
          height: "70px",
        }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="d-flex justify-content-center">
            {/* Registration Success... */}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <img
            src="https://img.icons8.com/ios/452/checked--v1.png"
            alt="success"
            style={{ width: "100px", color: "green" }}
          />
        </div>
        <br />
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <h4 className="d-flex justify-content-center align-items-center">
            Congratulations, you have successfully registered.
          </h4>
        </div>

        <div className="d-flex justify-content-center">
          <Button
            style={{
              backgroundColor: "#a37814",
              color: "white",
              width: "30%",
              alignItems: "center",
            }}
            onClick={props.onHide}
          >
            Ok
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
