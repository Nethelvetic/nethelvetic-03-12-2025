// src/components/ClientNavBar.tsx
"use client";

import React from "react";
import NavBarV from "./navBar-V";

const NavBarAdmin: React.FC<{ items: any[] }> = ({  items }) => {
  return <NavBarV items={items} />;
};

export default NavBarAdmin;
