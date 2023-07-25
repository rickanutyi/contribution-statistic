import service from "shared/service"

export const getStatistic = () => {
    service.getStatistic()
        .then(res => {
            if(res.status === 200) {
                return res.data
            }else console.error('error')
        })
        .catch(err => console.error(String(err)))
}