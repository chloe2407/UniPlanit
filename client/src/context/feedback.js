import React, { createContext, useContext, useMemo, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
  const [msg, setMsg] = useState({
    sx: null,
    snackVariant: null,
    msg: null,
    anchorOrigin: null,
    autoHideDuration: null,
  });
  const openMsg = Boolean(msg);

  const closeButton = (
    <IconButton size="small" color="inherit" onClick={() => setMsg(null)}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const SnackbarMsg = msg?.msg && (
    <Snackbar
      sx={msg.sx}
      anchorOrigin={msg.anchorOrigin}
      autoHideDuration={msg.autoHideDuration}
      open={openMsg}
      onClose={() => setMsg(null)}
    >
      <Alert action={closeButton} severity={msg.snackVariant}>
        {msg.msg}
      </Alert>
    </Snackbar>
  );

  const memo = useMemo(
    () => ({
      setMsg,
      SnackbarMsg,
    }),
    [msg]
  );

  return (
    <FeedbackContext.Provider value={memo}>{children}</FeedbackContext.Provider>
  );
}

export default function useFeedback() {
  return useContext(FeedbackContext);
}
