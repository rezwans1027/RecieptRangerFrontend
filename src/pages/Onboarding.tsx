import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from '@clerk/clerk-react'
import { useGetUserInfo, useUserOnboarding } from '@/api/UserApi'
import { OnboardingForm } from '@/types'
import { useNavigate } from 'react-router'

const baseSchema = z.object({
  role: z
    .string({
      required_error: 'Please select a role.',
    })
    .min(1),
  organization: z.string().optional(),
})

const adminSchema = baseSchema.extend({
  organization: z
    .string({ required_error: 'Organization name is required for Admins' })
    .min(1, { message: 'Organization name is required for Admins' }),
})

const Onboarding = () => {
  const navigate = useNavigate()
  const { userId } = useAuth()

  console.log(userId)

  const { userInfo, isLoading } = useGetUserInfo(userId!)
  const { onboardUser } = useUserOnboarding(userId!)
  const [selectedRole, setSelectedRole] = useState('')

  useEffect(() => {
    if (userInfo && userInfo.onboarded) {
      navigate('/')
    } 
  } , [userInfo, navigate])

  const form = useForm({
    resolver: async (data, context, options) => {
      const schema = selectedRole === '1' ? adminSchema : baseSchema
      return zodResolver(schema)(data, context, options)
    },
    defaultValues: {
      role: '',
      organization: '',
    },
  })

  const { resetField } = form

  function onSubmit(data: OnboardingForm) {
    onboardUser(data)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }


  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4'>
      <div className='mb-16 text-2xl'>
        Welcome {userInfo.username}. Select your role!
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-1/2 space-y-6'
        >
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={value => {
                    field.onChange(value)
                    setSelectedRole(value)
                    if (value !== '1') {
                      resetField('organization')
                    }
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a role' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='1'>Admin</SelectItem>
                    <SelectItem value='2'>Manager</SelectItem>
                    <SelectItem value='3'>Employee</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  A user may only have one role.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='organization'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Your organization'
                    {...field}
                    disabled={selectedRole !== '1'}
                  />
                </FormControl>
                <FormDescription>
                  Only an admin can create an organization. Managers and
                  employees must be invited to join an organization.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default Onboarding
