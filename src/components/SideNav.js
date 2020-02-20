import React from "react"
import { Segment, Sidebar } from 'semantic-ui-react'

/**
 * SideNav
 * a simple side nav bar
 * @props: children - the item to be in the sidenav
 */

export function SideNav(props) {
    return (
        <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu}
                     animation='overlay'
                     inverted
                     visible
                     width='thin'
                     vertical>
                {props.children}
            </Sidebar>
        </Sidebar.Pushable>
    )
}

