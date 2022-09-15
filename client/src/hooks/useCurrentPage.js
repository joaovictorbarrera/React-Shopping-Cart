import { useCallback, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

export default function useCurrentPage(defaultValue) {
    const [currentPage, setCurrentPage] = useLocalStorage("currentPage", JSON.stringify(defaultValue))

    const parsedValue = useMemo(() => 
        Number(JSON.parse(currentPage)), 
    [currentPage])

    const handleSetCurrentPage = useCallback((value) => {
        setCurrentPage(JSON.stringify(value))
    }, [setCurrentPage])

    return [parsedValue, handleSetCurrentPage]
}