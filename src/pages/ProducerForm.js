import React, { useState } from 'react';
import { createProducerRural } from '../services/api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const ProducerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    cpf_cnpj: '',
    farm_name: '',
    city: '',
    state: '',
    total_hectares: '',
    arable_hectares: '',
    vegetation_hectares: '',
    planted_crops: '',
  });

  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorPopupMessage, setErrorPopupMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  function validateCpfCnpj(input) {
    const cleanedInput = input.replace(/\D/g, '');

    if (cleanedInput.length === 11) {
      if (
        cleanedInput === '00000000000' ||
        cleanedInput === '11111111111' ||
        cleanedInput === '22222222222' ||
        cleanedInput === '33333333333' ||
        cleanedInput === '44444444444' ||
        cleanedInput === '55555555555' ||
        cleanedInput === '66666666666' ||
        cleanedInput === '77777777777' ||
        cleanedInput === '88888888888' ||
        cleanedInput === '99999999999'
      ) {
        return false;
      }

      let sum = 0;
      let remainder;
      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleanedInput.substring(i - 1, i)) * (11 - i);
      }
      remainder = (sum * 10) % 11;

      if (remainder === 10 || remainder === 11) {
        remainder = 0;
      }

      if (remainder !== parseInt(cleanedInput.substring(9, 10))) {
        return false;
      }

      sum = 0;
      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleanedInput.substring(i - 1, i)) * (12 - i);
      }
      remainder = (sum * 10) % 11;

      if (remainder === 10 || remainder === 11) {
        remainder = 0;
      }

      if (remainder !== parseInt(cleanedInput.substring(10, 11))) {
        return false;
      }

      return true;
    }

    if (cleanedInput.length === 14) {
      let sum = 0;
      let position = 5;
      for (let i = 0; i < 12; i++) {
        sum += parseInt(cleanedInput.charAt(i)) * position;
        position--;
        if (position < 2) {
          position = 9;
        }
      }
      let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

      if (result !== parseInt(cleanedInput.charAt(12))) {
        return false;
      }

      sum = 0;
      position = 6;
      for (let i = 0; i < 13; i++) {
        sum += parseInt(cleanedInput.charAt(i)) * position;
        position--;
        if (position < 2) {
          position = 9;
        }
      }
      result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

      if (result !== parseInt(cleanedInput.charAt(13))) {
        return false;
      }

      return true;
    }

    return false;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate CPF/CNPJ
    const isValidCpfCnpj = validateCpfCnpj(formData.cpf_cnpj);
    if (!isValidCpfCnpj) {
      console.error('Invalid CPF/CNPJ');
      return;
    }
    const totalHectares = parseFloat(formData.total_hectares);
    const arableHectares = parseFloat(formData.arable_hectares);
    const vegetationHectares = parseFloat(formData.vegetation_hectares);

    const totalArableAndVegetation = arableHectares + vegetationHectares;
    if (totalArableAndVegetation > totalHectares) {
      console.error('The sum of arable and vegetation hectares exceeds the total hectares.');
      return;
    }

    try {
      const response = await createProducerRural(formData);
      console.log('Producer created successfully:', response);
    } catch (error) {
      console.error('Error creating producer:', error);
    }
  };


  return (
    <div>
      <h2>Novo Produtor Rural</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="CPF/CNPJ"
          name="cpf_cnpj"
          value={formData.cpf_cnpj}
          onChange={handleChange}
          required
        />
        <TextField
          label="Fazenda"
          name="farm_name"
          value={formData.farm_name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Cidade"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <TextField
          label="Estado"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />
        <TextField
          label="Hectares Totais"
          name="total_hectares"
          value={formData.total_hectares}
          onChange={handleChange}
          required
        />
        <TextField
          label="Hectares Agrícolas"
          name="arable_hectares"
          value={formData.arable_hectares}
          onChange={handleChange}
          required
        />
        <TextField
          label="Hectares de Vegetação"
          name="vegetation_hectares"
          value={formData.vegetation_hectares}
          onChange={handleChange}
          required
        />
        <TextField
          label="Culturas Plantadas"
          name="planted_crops"
          value={formData.planted_crops}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Criar Produtor
        </Button>
      </form>

    </div>
  );
};

export default ProducerForm;
