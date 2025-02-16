import AppBar from "@mui/material/AppBar"
import LinearProgress from "@mui/material/LinearProgress"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import { MenuButton } from "common/components"
import { ResultCode } from "common/enums"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { changeTheme, selectAppStatus, selectIsLoggedIn, selectThemeMode, setIsLoggedIn } from "../../../app/appSlice"
import { baseApi } from "../../../app/baseApi"
import { useLogoutMutation } from "../../../features/auth/api/authAPI"
import { Stack} from "@mui/material"
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export const Header = () => {
  const dispatch = useAppDispatch()

  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [logout] = useLogoutMutation()


  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          localStorage.removeItem("sn-token")
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(["Todolist", "Task"]))
      })
  }

  return (
    <AppBar position="sticky" sx={{ mb: "30px" }}  >
      <Toolbar sx={{ display: "flex", justifyContent: "center", alignItems: 'center',  }}>
        <Stack direction={'row'}>
          {isLoggedIn && <MenuButton onClick={logoutHandler}> 
            Logout
            <LogoutOutlinedIcon  />
            </MenuButton>}      
          <Switch sx={{marginLeft: '15px'}} color={"default"} onChange={changeModeHandler} />
          {themeMode === 'light' ? <LightModeOutlinedIcon sx={{alignSelf: 'center'}}/> : <DarkModeOutlinedIcon sx={{alignSelf: 'center'}}/>}
        </Stack>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
