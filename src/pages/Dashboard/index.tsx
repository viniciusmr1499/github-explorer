import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logoImg.svg';

import { Title, Form, Repositories, InputError } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => { 
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storegedRepository = localStorage.getItem('@Github-explorer:');

    if(storegedRepository) {
      return JSON.parse(storegedRepository);
    }

    return [];
  });
  const [errorInput, setErrorInput] = useState('');

  useEffect(() => {
    localStorage.setItem('@Github-explorer:', JSON.stringify(repositories));
  } , [repositories])

  async function handleNewRepository(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    try {
      if(!newRepo) {
        setErrorInput('Digite o nome do autor/repositório');
        return;
      }

      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;
          
      setRepositories([...repositories, repository]);

      setNewRepo('');
      setErrorInput('');
    }catch(err) {
      setErrorInput('Repositório não existe');
    }
  }

  return (
    <> 
      <img src={logoImg} alt="Github Explorer"/>
      <Title>Explore repositórios no Github.</Title>

      <Form onSubmit={handleNewRepository} hasError={!!errorInput}>
        <input 
          placeholder="Digite o nome do repositório" 
          value={newRepo}
          onChange={(e) => {setNewRepo(e.target.value)}}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      { errorInput && <InputError>{errorInput}</InputError>}

      <Repositories>
        {repositories.map(repository => (
          <Link to={`repositories/${repository.full_name}`} key={repository.full_name}>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  ); 
}

export default Dashboard;
