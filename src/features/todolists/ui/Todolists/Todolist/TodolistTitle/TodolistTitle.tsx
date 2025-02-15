import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks"
import { RequestStatus } from "../../../../../../app/appSlice"
import { todolistsApi, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "../../../../api/todolistsApi"
import { DomainTodolist } from "../../../../lib/types/types"
import BackspaceIcon from '@mui/icons-material/Backspace';

import s from "./TodolistTitle.module.css"
import { Typography } from "@mui/material"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist

  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const dispatch = useAppDispatch()

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const index = state.findIndex((tl) => tl.id === id)
        if (index !== -1) {
          state[index].entityStatus = status
        }
      }),
    )
  }

  const removeTodolistHandler = () => {
    updateQueryData("loading")
    removeTodolist(id)
      .unwrap()
      .catch(() => {
        updateQueryData("idle")
      })
  }

  const updateTodolistHandler = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <div className={s.container}>
      <Typography variant="h5" component="h4">
        <EditableSpan value={title} onChange={updateTodolistHandler} disabled={entityStatus === "loading"} />
      </Typography>
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        {/* <DeleteIcon /> */}
        <BackspaceIcon />
      </IconButton>
    </div>
  )
}
