import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as CgIcons from 'react-icons/cg';


export const SidebarDataTrainee = 
[
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />, 
  },
  {
    title: 'Courses',
    path: '#',
    icon: <RiIcons.RiFilePaper2Line />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
        {
            title: 'Your Courses',
            path: '#',
            icon: <IoIcons.IoIosPaper />
          },
    ]
  },
  {
    title: "Profile",
    path: '/profile',
    icon: <CgIcons.CgProfile />
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  }
];