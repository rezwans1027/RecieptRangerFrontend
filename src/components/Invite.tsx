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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { cn, roleMapping } from '@/lib/utils'
import { ChevronsUpDownIcon, CheckIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useGetManagers, useSendInvitation } from '@/api/UserApi'


const formSchema = z.object({
  email: z.string().email().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  role: z.string(),
  manager: z.number().optional(),
})

const Invite = () => {
  const { managers, isLoading } = useGetManagers()
  const [managerList, setManagerList] = useState<{ label: string; value: number }[]>([])
  const [open, setOpen] = useState(false)
  const { sendInvitation } = useSendInvitation()

  useEffect(() => {
    if (!isLoading) {
      setManagerList(
        managers.map((manager: any) => ({
          label: manager.firstName + ' ' + manager.lastName,
          value: manager.id,
        }))
      )
    }
  }, [managers, isLoading])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      role: '',
      manager: undefined,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await sendInvitation({
        email: values.email,
        role: roleMapping[values.role], // Convert role to number
        manager: values.manager,
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
            Invite a user to your organization
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
                      <FormDescription>
                        This is the email address of the user you want to
                        invite.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex items-center justify-between'>
                  <FormField
                    control={form.control}
                    name='role'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={value => {
                            field.onChange(value)
                            if (value === 'manager') {
                              form.setValue('manager', undefined)
                            }
                          }}
                        >
                          <FormControl>
                            <SelectTrigger className='min-w-32'>
                              <SelectValue placeholder='Role' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="employee">Employee</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='manager'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>Manager</FormLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant='outline'
                                role='combobox'
                                aria-expanded={open}
                                className={cn(
                                  'w-[200px] justify-between',
                                  !field.value && 'text-muted-foreground'
                                )}
                                disabled={form.watch('role') === 'manager'}
                              >
                                {field.value
                                  ? managerList.find(
                                      (manager: any) =>
                                        manager.value === field.value
                                    )?.label
                                  : 'Select Manager'}
                                <ChevronsUpDownIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='z-50 w-[200px] p-0'>
                            <Command>
                              <CommandInput placeholder='Search manager...' />
                              <CommandEmpty>No manager found.</CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {managerList.map(manager => (
                                    <CommandItem
                                      value={manager.label}
                                      key={manager.value}
                                      onSelect={() => {
                                        form.setValue('manager', manager.value)
                                        setOpen(false)
                                      }}
                                    >
                                      <CheckIcon
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          manager.value === field.value
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                        )}
                                      />
                                      {manager.label}
                                    </CommandItem>
                                  ))}
                                </CommandList>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type='submit'>Submit</Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Invite
