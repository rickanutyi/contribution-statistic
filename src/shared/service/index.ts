import { apiInstance } from "shared/api";
import endpoints from "shared/api/endpoints"

export default {
    getStatistic() {
        const url = endpoints.contribution_statistic;
        return apiInstance.get<Record<string, number>>(url)
    }
}