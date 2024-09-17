import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react';

const formSchema = yup.object({
  name: yup.string().required("Nome obrigatório").default(''),
});

function App() {
  const [showName, setShowName] = useState(false);

  const formik = useFormik({
    initialValues: formSchema.getDefault(),
    validationSchema: formSchema,
    onSubmit: () => setShowName(true),
    onReset: () => formSchema.getDefault(),
  });

  const handleClear = () => {
    formik.resetForm({ values: formSchema.getDefault() });
    setShowName(false);
  };

  return (
    <div className="container py-5">
      <h1 className='mb-3'>Digite seu nome <FontAwesomeIcon icon={faCoffee} /></h1>
      <form className='row' onSubmit={formik.handleSubmit}>
        <div className='col'>
          <input className='form-control' type="text" {...formik.getFieldProps('name')} placeholder='João sem braço' />
          {!!formik.errors.name && <p className='form-text text-danger'>* {formik.errors.name}</p>}
        </div>
        <div className='col'>
          <button className='btn btn-primary' type="submit" style={{ marginLeft: '8px' }}>
            Ok
          </button>
          <button
            className='btn btn-primary'
            type="button"
            style={{ marginLeft: '8px' }}
            onClick={handleClear}
          >
            Limpar
          </button>
        </div>
      </form>
      <p className={`alert my-3 ${!!showName ? "alert-success" : "alert-info"}`}>Olá, {!!showName ? formik.values.name : "Estranho"}</p>
    </div>
  );
}

export default App;
