import { useState } from "react";
import axios from "@/services/api/instance";

const token = localStorage.getItem("token");

const SearchComponent = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = async () => {
        if (!query.trim()) return;
        try {
            const response = await axios.get(`http://localhost:9000/api/common/search?keyword=${query}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
            setResults(response.data);
        } catch (error) {
            console.error("검색 실패:", error);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", borderRadius: "10px", background: "#f9f9f9", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>🔍 데이터 검색</h2>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="검색어 입력..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        flex: "1",
                        padding: "10px",
                        fontSize: "16px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        outline: "none"
                    }}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        padding: "10px 15px",
                        fontSize: "16px",
                        borderRadius: "5px",
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    검색
                </button>
            </div>

            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                {results.map((table, index) => (
                    <div key={index} style={{ marginBottom: "20px", padding: "15px", borderRadius: "8px", background: "#fff", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" }}>
                        <h3 style={{ color: "#444", marginBottom: "10px" }}>{table.table} 테이블</h3>
                        <pre
                            style={{
                                background: "#f4f4f4",
                                padding: "10px",
                                borderRadius: "5px",
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                                fontSize: "14px"
                            }}
                        >
                            {JSON.stringify(table.data, null, 2)}
                        </pre>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchComponent;
