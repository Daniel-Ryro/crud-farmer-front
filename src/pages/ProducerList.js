import React, { useState, useEffect } from 'react';
import { getProducersRural, deleteProducerRural } from '../services/api';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProducerList = () => {
  const [producers, setProducers] = useState([]);
  const [editingProducerId, setEditingProducerId] = useState(null);

  useEffect(() => {
    fetchProducers();
  }, []);

  const fetchProducers = async () => {
    const data = await getProducersRural();
    setProducers(data);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProducerRural(id);
      // Update the list after deletion
      fetchProducers();
    } catch (error) {
      console.error('Erro ao excluir produtor:', error);
    }
  };

  const handleEdit = (id) => {
    // Set the ID of the producer being edited
    setEditingProducerId(id);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Lista de Produtores Rurais
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>CPF/CNPJ</TableCell>
            <TableCell>Fazenda</TableCell>
            <TableCell>Cidade</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Hectares Totais</TableCell>
            <TableCell>Hectares Agrícolas</TableCell>
            <TableCell>Hectares de Vegetação</TableCell>
            <TableCell>Culturas Plantadas</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {producers.map((producer) => (
            <TableRow key={producer.id}>
              <TableCell>{producer.name}</TableCell>
              <TableCell>{producer.cpf_cnpj}</TableCell>
              <TableCell>{producer.farm_name}</TableCell>
              <TableCell>{producer.city}</TableCell>
              <TableCell>{producer.state}</TableCell>
              <TableCell>{producer.total_hectares}</TableCell>
              <TableCell>{producer.arable_hectares}</TableCell>
              <TableCell>{producer.vegetation_hectares}</TableCell>
              <TableCell>{producer.planted_crops}</TableCell>
              <TableCell>
                <Link to={`/edit/${producer.id}`}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(producer.id)}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  >
                    Excluir
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ProducerList;
