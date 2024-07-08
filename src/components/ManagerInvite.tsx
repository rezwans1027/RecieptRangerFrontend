import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
  } from '@/components/ui/dialog'
  import { Button } from '@/components/ui/button'
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form'
  import { Input } from '@/components/ui/input'
  import { zodResolver } from '@hookform/resolvers/zod'
  import { z } from 'zod'
  import { useForm } from 'react-hook-form'
  import { useSendInvitation } from '@/api/UserApi'
import { roleMapping } from '@/lib/utils'
  
  const formSchema = z.object({
    email: z.string().email().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  })
  
  const ManagerInvite = () => {
    const { sendInvitation } = useSendInvitation()
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: '',
      },
    })
  
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        await sendInvitation({
          email: values.email,
          role: roleMapping['employee'], // Role is always employee for manager invites
        })
        console.log('Invitation sent!')
      } catch (error) {
        console.error(error)
      }
    }
  
    return (
      <Dialog
        onOpenChange={isOpen => {
          if (!isOpen) form.reset()
        }}
      >
        <DialogTrigger className='rounded-lg bg-black p-2 px-4 text-white'>
          Invite
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='mb-6'>
              Invite an employee to your team
            </DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-8'
                >
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder='johndoe@mail.com' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit'>Submit</Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default ManagerInvite
  