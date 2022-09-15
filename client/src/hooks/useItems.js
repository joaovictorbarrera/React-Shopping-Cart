import { useEffect, useState } from "react"
import { useSetAppStatus } from "../contexts/AppStatusProvider"
import useFetch from "./useFetch"

export default function useItems() {
    const URL = process.env.REACT_APP_ITEMS_API_URL
    if (!URL) console.log("URL FOR ITEMS API NOT FOUND!")

    const fetchHook = useFetch()
    const setAppStatus = useSetAppStatus()
    const [rawItems, setRawItems] = useState([])

    useEffect(() => {
        fetchHook(URL).then(data => {
          if (!data?.items) return setAppStatus("failed")
          setAppStatus("done")
          setRawItems(data.items)
        })
      }, [setAppStatus, fetchHook, URL])

    return rawItems
}