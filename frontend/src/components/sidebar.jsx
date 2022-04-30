import React, { useState } from "react";
import { SidebarData } from "./sidebarData";
import { ImLab } from "react-icons/im";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

function Sidebar() {
  const [click, setClick] = useState(true);

  const handleClick = () => setClick(!click);
  return (
    <Container>

      <SidebarContainer>
        <SlickBar
         clicked={click}
        >
          {SidebarData.map((item, index) => {
            return (
              <Item
                key={index}
                exact
                activeClassName="active"
                to={item.link}
                // onClick={() => setClick(false)}
              >
                <Text
                //  clicked={click}
                 >{item.title}</Text>
              </Item>
            );
          })}
        </SlickBar>
      </SidebarContainer>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  z-index: 1;

`;

const Button = styled.button`
  background-color: #2c384a;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 1.5rem 0 0 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before,
  &::after {
    content: "";
    background-color: #fff;
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }
  &::before {
    top: ${(props) => (props.clicked ? "1.5" : "1rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;

const SidebarContainer = styled.div`
  background-color: #2c384a;
  width: 4rem;
  height: 80vh;
  margin-top: 1rem;
  border-radius: 0 30px 30px 0;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: relative;
`;

const SlickBar = styled.ul`
  color: #fff;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:  #2c384a;
 
    brightness(101%) contrast(94%);
  padding: 2rem 0;
  // position: absolute;
  top: 5rem;
  // left: 0;

  // width: 10rem;
  transition: all 0.5s ease;
  border-radius: 0 30px 30px 0;
`;

const Item = styled(NavLink)`
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
  color: #fff;
  display: flex;
  padding-left: 0.1rem;
  text-decoration: none;

  &:hover {
    border-right: 4px solid #fff;
  }
`;

const Text = styled.span`
  width: 100%;
  overflow: hidden;
  // margin-left: 1rem;
  transition: all 0.3s ease;
`;

export default Sidebar;
