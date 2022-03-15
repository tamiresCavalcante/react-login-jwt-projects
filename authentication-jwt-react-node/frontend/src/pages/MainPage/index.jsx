import React, { useState, useEffect } from 'react';
import './styles.css';
import Nav from './Nav';
import Search from './Search';
import Repositories from './Repositories';
import { getRepositories } from '../../services/api';

const MainPage = () => {

    const [repositories, setRepositories] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);

    const userId = '622ca48ddacf76a84069df4b';
    const loadData = async(query = '') => {
        try {
            const response = await getRepositories(userId);
            console.log(response.data);
            setRepositories(response.data);
            
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
        
    }

    const handleDeleteRepo = (repository) => {

    }

    const handleNewRepo = (url) => {

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