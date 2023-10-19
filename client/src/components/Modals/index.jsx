/* eslint-disable react/prop-types */
import { Modal } from "@mui/material"
import AuthForm from "../AuthFrom"
import styles from "./Modals.module.scss"

const Modals = ({ type, handleModalClose }) => {
  const modalProps = {
    login: { formType: "login" },
    register: { formType: "register" },
  };

  return (
    <Modal
      open={type === "login" || type === "register"}
      onClose={handleModalClose}
    >
      <div className={styles.formContainer}>
        <AuthForm
          {...modalProps[type]}
          handleModalClose={handleModalClose}
        />
      </div>
    </Modal>
  );
};

export default Modals
