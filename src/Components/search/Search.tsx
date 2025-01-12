// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ICoupon } from '../coupon/Coupon';

// interface Category {
//     id: number;
//     name: string;
// }

// interface SearchProps {
//     id: number;
//     name: string;
// }

// const Search = (props: SearchProps) => {
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [selectedCategory, setSelectedCategory] = useState('');

//     useEffect(() => {
//         getCategories();
//     }, []);


//     const getCategories = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/categories');
//             setCategories(response.data.content);
//         } catch (e) {
//             console.error(e);
//         }
//     };

//     useEffect(() => {
//         console.log("Categories:", categories); // Debugging
//     }, [categories]);

//     const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedCategory(event.target.value);
//     };

//     return (
//         <div>
//             <select
//                 value={selectedCategory}
//                 onChange={handleCategoryChange}
//             >
//                 <option value="">Select Category</option>
//                 {categories.map((category) => (
//                     <option key={category.id} value={category.name}>
//                         {category.name}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );
// };

// export default Search;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
    id: number;
    category: string;
}

interface SearchProps {
    id: number;
    name: string;
}

const Search = (props: SearchProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categories');
            setCategories(response.data.content);
        } catch (e) {
            console.error(e);
        }
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div>
            <select
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                <option value="">Select Category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.category}>
                        {category.category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Search;