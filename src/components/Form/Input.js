// Application to tests and documentation!!!

import React, { useEffect, useRef } from 'react';

// API para conectar o input(qualquer tipo) com o unform
import { useField } from '@unform/core';

export default function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);
  // É necessário o pegar o name no input para identificação
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField]);

  return (
    <div>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input ref={inputRef} defaultValue={defaultValue} {...rest} />

      { error && <span style={{ color: '#f00' }}>{error}</span> }
    </div>
  );
}

/* 
// const { fieldName, registerField, defaultValue, error } = useField()

=> fielname = name 

=> registerField = é uma função que temos que disparar quando o nosso 
componente for montado em tela, e para isso usamos o 
useEffect de dentro do React

// unform vem de => uncontrolled-form => uncontrolled components
=> não anotar os dados de um input enquanto o usuário digita

// path
=> Qual propriedade que contém o valor do meu input dentro da referênca 

*/ 