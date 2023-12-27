
interface SnackbarProps {
    message: string;
    onClose: () => void;
  }
  
const Snackbar: React.FC<SnackbarProps> = ({message, onClose}) => {
    return (
      <div style={{
        visibility: message ? 'visible' : 'hidden',
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '10px',
        zIndex: 1000,
      }}>
        {message}
        <button onClick={onClose} style={{ marginLeft: '20px', background: 'none', color: 'white', border: 'none' }}>Close</button>
      </div>
    );
  };
  
  export default Snackbar;