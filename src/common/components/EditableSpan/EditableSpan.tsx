import { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import { Typography } from "@mui/material"

type Props = {
  value: string
  onChange: (newTitle: string) => void
  disabled?: boolean
}

export const EditableSpan = ({ value, onChange, disabled = false }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  const activateEditModeHandler = () => {
    if (disabled) {
      return
    }
    setEditMode(true)
  }

  const deactivateEditModeHandler = () => {
    setEditMode(false)
    onChange(title)
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  return (
    <>
      {editMode ? (
        <TextField
          variant={"outlined"}
          value={title}
          size={"small"}
          onChange={changeTitleHandler}
          onBlur={deactivateEditModeHandler}
          autoFocus
        />
      ) : (
        <Typography variant='h6' sx={{padding: '5px', marginRight: '10px', whiteSpace: 'pre-line', wordBreak: 'break-word'}} onDoubleClick={activateEditModeHandler}>
          {value}
        </Typography>
      )}
    </>
  )
}