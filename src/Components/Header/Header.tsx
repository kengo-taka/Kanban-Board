import { Box, Divider, Flex, Text } from '@mantine/core'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <Box bg={'white'} w={'100%'} p={10} sx={{borderBottom: '1px solid lightGray'}}>
      <Flex align={'center'} gap={10}>
        <Box w={50} h={50} sx={{borderRadius: '50%'}} bg={'blue'}/>
        <Text weight={'bold'} size={22}>Kanban Board</Text>
        <Text size={'xs'} weight={'bold'}>by Kengo Takamiya</Text>
      </Flex>
    </Box>
  )
}

export default Header