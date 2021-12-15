import { axios } from '@/lib/axios'
import aspida from '@aspida/axios'
import api from '@/api/$api'

export const aspidaClient = api(aspida(axios))
