// Application to tests and documentation!!!

import React, { useRef, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import './App.css';

import Input from './components/Form/Input';

const initialData = {
  email: 'danieldaniabreu@gmail.com',
  address: {
    city: 'Sao Paulo'
  }
}

function App() {
  // State para simulação de API
  const [user, setUser] = useState({});

  const formRef = useRef(null);

  // Validação para envio do form
  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório!'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório!'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'No mínimo 3 caracteres')
            .required('A cidade é obrigatória!')
        })
      });

      /* 
      * O Yup por padrão, sempre que ele encontra algo na 
      * validação que já não deu certo...
      * por exemplo, se ele viu que o primeiro item do form
      * não está preenchido, ele vai retornar a mensagem 
      * correspondente e não vai validar o restante do form
      * 
      * Isso porque a função abortEarly por padrão já vem 
      * como true
      */

      await schema.validate(data, {
        abortEarly: false,
      })
  
      console.log(data);

      // Limpando os erros
      formRef.current.setErrors({});

      // Limpando os inputs após envio do form
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  // Simulando um API
  useEffect(() => { 
    setTimeout(() => {
      setUser({
        name: 'Daniel Hessel',
        email: 'danieldaniabreu@gmail.com',
      })
    }, 2000);
  }, []);

  return (
    <div className="App">
      <h1>Hello World</h1>

      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input type="email" name="email" />
        
        <Scope path="address">
          <Input name="street" />
          <Input name="number" />
          <Input name="neighborhood" />
          <Input name="city" />
          <Input name="state" />
        </Scope>
        
        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;

// Application to tests and documentation!!!

// // Validação para envio do form
// function handleSubmit(data, { reset }) {
//   if (data.name === "") {
//   //   alert('Nome está vazio');
//     // formRef.current.setFieldError('address.city', 'O cidade é obrigatória!')
//     formRef.current.setErrors({
//       name: 'O nome é obrigatório',
//       address: {
//         city: 'A cidade é obrigatória!'
//       }
//     })
//   }

//   console.log(data);

//   reset();
// }