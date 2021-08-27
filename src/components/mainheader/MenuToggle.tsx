import * as React from 'react';

import { motion, /* useCycle  */} from "framer-motion";

import styled from 'styled-components'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { navigationSlice } from '../../redux/slices/navigationSlice';

const Path = (props: any) => (
    <motion.path
        fill="transparent"
        strokeWidth="2"
        stroke="#334a60"
        strokeLinecap="round"
        {...props}
    />
);

const StyledButton = styled.div`
    outline: none;
  border: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  cursor: pointer;
  /* position: absolute;
  top: 18px;
  left: 15px; */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
 /*  margin-top: auto;
  margin-bottom: 50%; */
  display: flex;
  transform: scale(1.5);
  `


interface Props {
   
}

export const MenuToggle: React.FunctionComponent<Props> = ({  }) => {

    const showSidebar = useAppSelector((state) => state.navigation.showSidebar)
    
    const dispatch = useAppDispatch()
   

    const onMenuSelect = () => {
        if (showSidebar === false) {
            dispatch(navigationSlice.actions.setSidebarVisibility(true))
           
        } else {
            dispatch(navigationSlice.actions.setSidebarVisibility(false))
            
        }
    }

    

    return (
        <motion.div
            initial={false}
            animate={showSidebar ? "open" : "closed"}
        /* custom={height} */
        /* ref={containerRef} */
        style={{display: "flex", margin: "auto"/* , marginBottom: "1.5rem" */}}
        >
            <StyledButton onClick={() => onMenuSelect()}>
                <svg width="23" height="23" viewBox="0 0 23 23" style={{margin: "auto"}}>
                    <Path
                        variants={{
                            closed: { d: "M 2 2.5 L 20 2.5" },
                            open: { d: "M 3 16.5 L 17 2.5" }
                        }}
                    />
                    <Path
                        d="M 2 9.423 L 20 9.423"
                        variants={{
                            closed: { opacity: 1 },
                            open: { opacity: 0 }
                        }}
                        transition={{ duration: 0.1 }}
                    />
                    <Path
                        variants={{
                            closed: { d: "M 2 16.346 L 20 16.346" },
                            open: { d: "M 3 2.5 L 17 16.346" }
                        }}
                    />
                </svg>
            </StyledButton>
        </motion.div>

    );
};

export default MenuToggle