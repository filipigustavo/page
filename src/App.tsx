import { useFormik } from 'formik';
import * as yup from 'yup';

import './App.css';
import { useState } from 'react';

const formSchema = yup.object({
  name: yup.string().required().default(''),
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
    <div>
      <h1>Digite seu nome</h1>
      <form onSubmit={formik.handleSubmit}>
        <input type="text" {...formik.getFieldProps('name')} />
        <button type="submit" style={{ marginLeft: '8px' }}>
          Ok
        </button>
        <button
          type="button"
          style={{ marginLeft: '8px' }}
          onClick={handleClear}
        >
          Limpar
        </button>
      </form>
      <p style={!!showName ? { border: "1px solid green" } : { border: "1px solid white" }}>Olá, {!!showName ? formik.values.name : "Estranho"}</p>
    </div>
  );
}

export default App;
