import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { Link } from 'react-router-dom';
import './styles.css';
import Nav from './Nav';
import Search from './Search';
import Repositories from './Repositories';
import { getRepositories, createRepository, destroyRepository } from '../../services/api';

const MainPage = () => {

    const { user, logout } = useContext(AuthContext);
    const [repositories, setRepositories] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);

    const loadData = async(query = '') => {
        try {
            const response = await getRepositories(user?.id, query);
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
        logout();
    }

    const handleSearch = (query) => {
        loadData(query);
    }

    const handleDeleteRepo = async (repository) => {
        await destroyRepository(user?.id, repository._id);
        await loadData();
    }

    const handleNewRepo = async (url) => {
        try {
            await createRepository(user?.id, url);
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