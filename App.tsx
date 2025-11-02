import React, { useEffect } from "react";
import { createTables } from "./database/database";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  useEffect(() => {
    createTables();
  }, []);

  return <AppNavigator />;
}
