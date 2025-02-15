import { AddItemForm } from "common/components"
import { useAddTaskMutation } from "../../../api/tasksApi"
import { DomainTodolist } from "../../../lib/types/types"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { Accordion, AccordionSummary, Box } from "@mui/material"
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
  const [addTask] = useAddTaskMutation()

  const addTaskCallback = (title: string) => {
    addTask({ title, todolistId: todolist.id })
  }

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <Accordion >
      <AccordionSummary  expandIcon={<ArrowDropDownOutlinedIcon  />} aria-controls="panel3-content" id="panel3-header">
            <Box onClick={(e) => e.stopPropagation()}>
              <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
            </Box>
          </AccordionSummary>
          <Tasks todolist={todolist} />
          <FilterTasksButtons todolist={todolist} />
      </Accordion>
    </>
  )
}
