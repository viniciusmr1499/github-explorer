import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logoImg.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => (
  <> 
    <img src={logoImg} alt="Github Explorer"/>
    <Title>Explore repositórios no Github.</Title>

    <Form>
      <input placeholder="Digite o nome do repositório" />
      <button type="submit">Pesquisar</button>
    </Form>

    <Repositories>
      <a href="#">
        <img src="https://avatars0.githubusercontent.com/u/50683707?s=460&u=aef4fae5619943c1732adff034d39ab59f378c0e&v=4" alt="Vinicius"/>
        <div>
          <strong>Marcos Vinicius</strong>
          <p>Lorem ipsum dolor sit, amet consectetur</p>
        </div>

        <FiChevronRight size={20} />
      </a>
    </Repositories>
  </>
);

export default Dashboard;
