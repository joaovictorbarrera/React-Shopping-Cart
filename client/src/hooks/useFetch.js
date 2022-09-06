import { useCallback } from 'react';
    
export default function useFetch() {
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