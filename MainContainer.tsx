import React, { ReactNode } from 'react';
import { View } from 'react-native';
import BottomNavigationBar from './components/BottomNavigationBar';

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {


  return (
    <View style={{ flex: 1 }}>
      {children}
      <BottomNavigationBar/>
    </View>
  );
}

export default MainContainer;
