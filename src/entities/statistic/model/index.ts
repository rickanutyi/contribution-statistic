import { useEffect, useState } from "react"
import { Statistic } from "../types"
import { getStatistic } from "../api"

const useGetStatistic = () => {
    const [statistic, setStatistic] = useState<Statistic[] | null>(null)

    useEffect(() => {
        getStatistic()
            .then(res => {
                if(res) {
                    setStatistic(res)
                }
            })
    })
}