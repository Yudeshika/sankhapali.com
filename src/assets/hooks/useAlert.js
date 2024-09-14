import { useState } from 'react';

const useAlert = () => {
    const [alert, setAlert] = useState({ show: false, message: '', type: 'danger' });

    const showAlert = ({ text, type = 'danger' }) => setAlert({ show: true, message: text, type });  // Ensure this uses 'message'
    const hideAlert = () => setAlert({ show: false, message: '', type: 'danger' });

    return { alert, showAlert, hideAlert };
}

export default useAlert;
