import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';

export default function AlertComponent({optionsAlert}) {
  const {show, severity, msj} = optionsAlert;
  return (
    <div>
      <Collapse in={show}>
        <Alert severity={severity}>{msj}</Alert>
      </Collapse>
    </div>
  );
}
