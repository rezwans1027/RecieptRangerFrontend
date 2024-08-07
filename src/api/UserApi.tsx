import { OnboardingForm } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from 'react-query'


const API_BASE_URL = 'http://localhost:3000' // TODO: move to .env file


export const useGetUserInfo = (clerkId: string) => {
  const getUserInfoRequest = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/user/${clerkId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Failed to get user info:', errorText)
        throw new Error('Failed to get user info')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in getUserInfoRequest:', error)
      throw error
    }
  }

  const {
    data: userInfo,
    isLoading,
    error,
  } = useQuery(['fetchUserInfo', clerkId], getUserInfoRequest)

  return { userInfo, isLoading, error }
}

export const useUserOnboarding = (clerkId: string) => {
  const queryClient = useQueryClient()
  const userOnboardingRequest = async (formData: OnboardingForm) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/${clerkId}/onboarding`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in userOnboardingRequest:', error)
      throw error
    }
  }

  const {
    mutateAsync: onboardUser,
    isLoading,
    error,
  } = useMutation(userOnboardingRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchUserInfo')
    },
  })

  return { onboardUser, isLoading, error }
}

export const useSendInvitation = () => {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  const sendInvitationRequest = async ({ email, role, manager }: { email: string, role: number, manager?: number }) => {
    try {
      const token = await getToken()

      if (!token) {
        throw new Error('No token found')
      }

      const response = await fetch(`${API_BASE_URL}/api/users/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, role, manager }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in sendInvitationRequest:', error)
      throw error
    }
  }

  const {
    mutateAsync: sendInvitation,
    isLoading,
    error,
  } = useMutation(sendInvitationRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchInvitations')
    },
  })

  return { sendInvitation, isLoading, error }
}

export const useGetInvitation = (token: string) => {
  const getInvitationRequest = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/register/${token}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Failed to get invitation:', errorText)
        throw new Error('Failed to get invitation')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in getInvitationRequest:', error)
      throw error
    }
  }

  const {
    data: invitation,
    isLoading,
    error,
  } = useQuery(['fetchInvitation', token], getInvitationRequest)

  return { invitation, isLoading, error }
}

export const useAcceptInvitation = (token: string) => {
  const queryClient = useQueryClient()
  const acceptInvitationRequest = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/register/${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in acceptInvitationRequest:', error)
      throw error
    }
  }

  const {
    mutateAsync: acceptInvitation,
    isLoading,
    error,
  } = useMutation(acceptInvitationRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchUserInfo')
    },
  })

  return { acceptInvitation, isLoading, error }
}

export const useGetInvitations = () => {
  const { getToken } = useAuth()

  const getInvitationsRequest = async () => {
    try {
      const token = await getToken()

      if (!token) {
        throw new Error('No token found')
      }

      const response = await fetch(
        `${API_BASE_URL}/api/users/invitations`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Failed to get invitations:', errorText)
        throw new Error('Failed to get invitations')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in getInvitationsRequest:', error)
      throw error
    }
  }

  const {
    data: invitations,
    isLoading: invitationsLoading,
    error,
  } = useQuery('fetchInvitations', getInvitationsRequest)

  return { invitations, invitationsLoading, error }
}

export const useGetManagers = () => {
  const { getToken } = useAuth()

  const getManagersRequest = async () => {
    try {
      const token = await getToken()

      if (!token) {
        throw new Error('No token found')
      }

      const response = await fetch(
        `${API_BASE_URL}/api/users/managers`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Failed to get managers:', errorText)
        throw new Error('Failed to get managers')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in getManagersRequest:', error)
      throw error
    }
  }

  const {
    data: managers,
    isLoading,
    error,
  } = useQuery('fetchManagers', getManagersRequest)

  return { managers, isLoading, error }
}

export const useGetEmployees = () => {
  const { getToken } = useAuth()

  const getEmployeesRequest = async () => {
    try {
      const token = await getToken()

      if (!token) {
        throw new Error('No token found')
      }

      const response = await fetch(
        `${API_BASE_URL}/api/users/employees`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Failed to get employees:', errorText)
        throw new Error('Failed to get employees')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error in getEmployeesRequest:', error)
      throw error
    }
  }

  const {
    data: employees,
    isLoading,
    error,
  } = useQuery('fetchEmployees', getEmployeesRequest)

  return { employees, isLoading, error }
}