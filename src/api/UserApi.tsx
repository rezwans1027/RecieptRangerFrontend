import { OnboardingForm } from '@/types'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const API_BASE_URL = 'http://localhost:3000' // move to .env file

export const useGetUserInfo = (clerkId: string) => {
  const getUserInfoRequest = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${clerkId}`, {
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
  } = useMutation(userOnboardingRequest, {onSuccess: () => {
    queryClient.invalidateQueries("fetchUserInfo");
  },})

  return { onboardUser, isLoading, error }
}

export const useGetInvitation = (token: string) => {
  const getInvitationRequest = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/register/${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

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
  } = useMutation(acceptInvitationRequest, {onSuccess: () => {
    queryClient.invalidateQueries("fetchUserInfo");
  },})

  return { acceptInvitation, isLoading, error }
}