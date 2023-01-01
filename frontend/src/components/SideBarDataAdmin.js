import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as CgIcons from 'react-icons/cg';


export const SidebarDataAdmin = 
[
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />, 
    },
    {
        title: 'Add',
        path: '#',
        icon: <RiIcons.RiFilePaper2Line />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    
        subNav: [
            {
                title: 'Add Admin',
                path: '/addadmin',
                icon: <IoIcons.IoIosPaper />
              },
              {
            title: 'Add User',
            path: '/adduser',
            icon: <IoIcons.IoIosPaper />
          }
        ]
    },{
      title: 'Report',
      path: '/reportadmin',
      icon: <AiIcons.AiFillHome/>,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />, 
  },{
    title: 'Requests',
    path: '/requestadmin',
    icon: <AiIcons.AiFillHome/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />, 
},

]