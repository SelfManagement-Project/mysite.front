import "@/assets/styles/components/common/SearchComponent.scss";
import { useSearch } from "@/hooks/common/useSearch";

const SearchComponent = () => {
    const { results } = useSearch();
    // const { query, setQuery, results, handleSearch } = useSearch();

    return (
        <div className="search-container">
            <h2>🔍 데이터 결과</h2>

            {/* <div className="search-input-group">
                <input
                    type="text"
                    placeholder="검색어 입력..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>검색</button>
            </div> */}

            <div className="results-container">
                {results.map((table, index) => (
                    <div key={index} className="result-item">
                        <h3>{table.table} 테이블</h3>
                        <pre>
                            {JSON.stringify(table.data, null, 2)}
                        </pre>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchComponent;