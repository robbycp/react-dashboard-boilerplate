import React from 'react'
import { Button, Grid, TextField } from '@mui/material'

type Props = {
  description: string,
  handleCreateTodo: () => void,
  setDescription: SetState<string>,
}

const CreateView = ({
  description,
  handleCreateTodo,
  setDescription,
}: Props) => {
  return (
    <Grid>
      <TextField label="New task" value={description} onChange={(e) => setDescription(e.currentTarget.value)} />
      <Button onClick={handleCreateTodo}>
        Submit
      </Button>
    </Grid>
  )
}

export default CreateView