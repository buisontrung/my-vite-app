import axios from "axios";
import { useEffect, useState } from "react";
import './HocBai.scss';
import { Link } from "react-router-dom";

interface Block {
    id: number;
    description: string;
    blockName: string;
}

interface Class {
    id: number;
    description: string;
    className: string;
    blockId: number;
}

const HocBai = () => {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blockResponse = await axios.get('https://localhost:7034/api/Block');
                const classResponse = await axios.get('https://localhost:7034/api/class');
                setBlocks(blockResponse.data);
                setClasses(classResponse.data);
                setIsLoading(false);
            } catch (err) {
                alert(err);

            }
        };

        fetchData();
    }, []);

    const getClassesForBlock = (blockId: number) => {
        return classes.filter(cls => cls.blockId === blockId);
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className="home-container">
            <div className="container">
                <div className="row">
                    <div className="hocbai">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            blocks.map(block => (
                                <div key={block.id} className="card-body" style={{ borderTop: `3px solid ${getRandomColor()}` }}>
                                    <h2>{block.blockName}</h2>

                                    <div className="classes">
                                        {getClassesForBlock(block.id).length > 0 ? (
                                            getClassesForBlock(block.id).map((cls) => (
                                                <div key={cls.id} className="class-item">
                                                    <Link to={`/khoa-hoc?classname=${cls.className}&classId=${cls.id}`}><h3>{cls.className}</h3></Link>

                                                </div>
                                            ))
                                        ) : (
                                            <p>No classes available</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default HocBai;
