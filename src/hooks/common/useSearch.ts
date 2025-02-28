// hooks/common/useSearch.ts
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setQuery, setResults } from '@/redux/reducers/common/searchReducer';
import { useNavigate } from 'react-router-dom';
import axios from "@/services/api/instance";


export const useSearch = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { query, results } = useAppSelector(state => state.search);
    const token = localStorage.getItem("token");

    const handleSearch = async () => {
        if (!query.trim()) return;
        try {
            const response = await axios.get(`http://localhost:9000/api/common/search?keyword=${query}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(setResults(response.data));

        } catch (error) {
            console.error("검색 실패:", error);
            navigate('/login');
        }
    };

    return {
        query,
        setQuery: (query: string) => dispatch(setQuery(query)),
        results,
        handleSearch
    };
};