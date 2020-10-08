import React from 'react'
import {
  CHeader,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
} from '@coreui/react'
import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks
}  from './index'
import {CButton} from "@coreui/react"

import history from "../history"


const TheHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const is_company = user.is_company

  return (
    <CHeader withSubheader>
      <div className="container">

        <CHeaderNav className="mr-auto">
          <CHeaderNavItem className="px-3" >
            <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem  className="px-3">
            <CHeaderNavLink to="/users">Users</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink>Settings</CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>

        <CHeaderNav style={{float: "right"}}>
          <TheHeaderDropdownNotif/>
          <TheHeaderDropdownTasks/>
          <TheHeaderDropdownMssg/>
          <TheHeaderDropdown/>
        </CHeaderNav>

        {
          is_company ?
            <CHeaderNav style={{float: "right", marginRight: "30px"}}>
              <CButton
                block
                color="success"
                onClick={() => {history.push('/dashboard/post_job1')}}
              >
                Post a job
              </CButton>
            </CHeaderNav>
            :
            ''
        }

      </div>
    </CHeader>
  )
}

export default TheHeader
