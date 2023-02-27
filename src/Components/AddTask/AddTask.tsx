import { Box, Button, Flex, Text, Avatar, Modal, TextInput } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from '@mantine/form';

type ItemType = {
  id: number
  name: string
  column: string
}

type Props = {
  setItems: (value: React.SetStateAction<ItemType[]>) => void
}

const AddTask = ({ setItems }: Props) => {
  const [userImage, setUserImage] = useState<string[]>([])
  const [opened, setOpened] = useState(false);
  const [currentId, setCurrentId] = useState<number>(13)

  const form = useForm({
    initialValues: {
      name: '',
    },
  });

  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=5')
      .then((res) => {
        let temp = []
        for (let i = 0; i < res.data.results.length; i++) {
          temp.push(res.data.results[i].picture.medium)
        }
        setUserImage(temp)
      })
      .catch(err => console.log(err))
  }, [])

  const handleSubmit = () => {
    setItems(prevState => {
      return [...prevState, { id: currentId, name: form.values.name, column: 'To Do' }]
    })
    setCurrentId(currentId + 1)
    form.reset();
    setOpened(false)
  }

  return (
    <Box bg={'white'} p={10} sx={{ borderRadius: '5px' }}>
      <Flex gap={20} align={'center'}>
        <Text weight={'bold'} size={'lg'}>Project : <Text span weight={'bold'} size={'sm'}>Stellar Personnel</Text></Text>
        <Button onClick={() => setOpened(true)}>New Task</Button>
        <Avatar.Group spacing="sm">
          <Flex>
            {userImage.length !== 0 && userImage.map((item, index) => <Avatar src={item} radius="xl" key={item + index} />)}
            <Avatar radius="xl">+2</Avatar>
          </Flex>
        </Avatar.Group>
      </Flex>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="New Task"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Flex direction="column" gap={20}>
            <TextInput label="Task" placeholder="Task" {...form.getInputProps('name')} />
            <Button type="submit" disabled={form.values.name.length == 0}>Add Task</Button>
          </Flex>
        </form>
      </Modal>
    </Box>
  )
}

export default AddTask