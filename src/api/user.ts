import { useQuery } from 'react-query'
import { ApiEndpoints } from '@/config/api'
import { Axios } from '@/config/axios'
import { User } from '@/types/user'

export const useCurUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ApiEndpoints.me,
    queryFn: () =>
      Axios.get<User>(ApiEndpoints.me)
        .then((res) => res.data)
        .catch(() => null),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  return { user: data, isLoading }
}
