import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Nav from './Nav';
import Search from './Search';
import Repositories from './Repositories';
import { getRepositories, createRepository, destroyRepository } from '../../services/api';

const MainPage = () => {

    const [repositories, setRepositories] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);

    const userId = '622ca48ddacf76a84069df4b';
    const loadData = async(query = '') => {
        try {
            const response = await getRepositories(userId, query);
            setRepositories(response.data);
            console.log(response.data);
            setLoading(false);
            
        } catch (error) {
            console.error(error);
            setLoading(true);
        }
    }

    useEffect(() => {
        (async () => await loadData())();
    }, []);

    const handleLogout = () => {

    }

    const handleSearch = (query) => {
        loadData(query);
    }

    const handleDeleteRepo = async (repository) => {
        await destroyRepository(userId, repository._id);
        await loadData();
    }

    const handleNewRepo = async (url) => {
        try {
            await createRepository(userId, url);
            await loadData();
        } catch (err) {
            setLoadingError(true);
        }
    }

    if(loadingError){
        return (
            <div className="loading">
                Erro ao carregar os dados de repositório. <Link to="/login">Voltar</Link>
            </div>
        )
    }

    if(loading){
        return (
            <div className="loading">
                Carregando
            </div>
        )
    }

    return (
        <div id="main">
            <Nav onLogout={handleLogout} />

            <Search onSearch={handleSearch} />

            <Repositories 
                repositories={repositories} 
                onDeleteRepo={handleDeleteRepo} 
                onNewRepo={handleNewRepo} 
            />
        </div>
    )
}

export default MainPage;