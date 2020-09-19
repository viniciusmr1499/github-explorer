import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logoImg.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RoutesProps {
  repository: string;
}

interface Repository {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

interface Issue {
  title: string;
  id: number;
  html_url: string;
  user: {
    login: string;
  }
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RoutesProps>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  // primeira forma de fazer a chamada
  useEffect(() => {
    api.get(`repos/${params.repository}`).then(response => {
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then(response => {
      setIssues(response.data);
    });

    // outra forma de fazer essa mesma chamada
    // async function loadData():Promise<void> {
    //   const [ repository, issues ] = await Promise.all([
    //     api.get(`repos/${params.repository}`),
    //     api.get(`repos/${params.repository}/issues`)
    //   ]);

    //   console.log(repository);
    //   console.log(issues);
    // }

    // loadData();
  } , [params.repository]);
  
  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer"/>
        <Link to="/">
          <FiChevronLeft size={16} />
          voltar
        </Link>
      </Header>

      {repository && <RepositoryInfo>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
        </header>

        <ul>
          <li>
            <strong>{repository.stargazers_count}</strong>
            <span>{repository.stargazers_count}</span>
          </li>
          <li>
            <strong>{repository.forks_count}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>67</strong>
            <span>issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>}

      <Issues>
        {issues.map(issue => 
          <a key={issue.id} target="blank" href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>            
            </div>

          <FiChevronRight size={20} />
        </a>)}
      </Issues>
    </>
  );
}

export default Repository;
