import { useCallback } from 'react';
    
export default function useFetch(url) {
    // const [data, setData] = useState(null);
    // useEffect(() => {
    //     async function loadData() {
    //         const response = await fetch(url);
    //         if(!response.ok) return;
            
    //         const posts = await response.json();
    //         setData(posts);
    //     }
    
    //     loadData();
    // }, [url]);
    // return data;

    return useCallback(
      async (url) => {
        try {
            const response = await fetch(url);
            if(!response.ok) return;
                
            const posts = await response.json();
            return posts
        } catch (e) {
            return
        }
      }, []
    )
}