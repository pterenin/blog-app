
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import "./styles.scss";

interface LayoutProps {
  handleShow: () => void;
  savePendig: () => void;
}


function Layout({ handleShow, savePendig }: LayoutProps) {

  return (
    <>
      <div className="header">
        <h1>Blog Post App</h1>
        <div className="orange-circle"></div>
        <div className="grey-scquare"></div>
      </div>
      <div className="menu">
        <div className="button-container">
          <div className="button">
            <div className="action" onClick={handleShow}>+</div>
            <span>Add New</span>
          </div>
          <div className="button">
            <div className="action save" onClick={savePendig}><FontAwesomeIcon icon={faSave} /></div>
            <span>Save Pending</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
