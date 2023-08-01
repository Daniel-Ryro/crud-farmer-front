import React, { useState, useEffect } from 'react';
import { getProducerRuralById, updateProducerRural } from '../services/api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ProducerEdit = ({ match }) => {
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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = match.params.id;

    try {
      await updateProducerRural(id, formData);
      console.log('Produtor atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar produtor:', error);
    }
  };

  return (
    <div>
      <h2>Editar Produtor Rural</h2>
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
          Salvar
        </Button>
      </form>
    </div>
  );
};

export default ProducerEdit;
