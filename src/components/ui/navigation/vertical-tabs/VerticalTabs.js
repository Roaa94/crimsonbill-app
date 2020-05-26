import React from 'react';
import {Tab, TabContentContainer, TabsContainer, VerticalTabsContainer} from "./VerticalTabs.styles";

const TabContent = ({children, value, index}) => {
    return (
        <div
            hidden={value !== index}
        >
            {
                value === index && (
                    <TabContentContainer>
                        {children}
                    </TabContentContainer>
                )
            }
        </div>
    )
}

const VerticalTabs = ({tabs}) => {
    const [currentTabIndex, setCurrentTab] = React.useState(0);

    return (
        <VerticalTabsContainer>
            <TabsContainer>
                {
                    tabs.map(({index, label}) => (
                        <Tab
                            key={index}
                            onClick={() => setCurrentTab(index)}
                            current={currentTabIndex === index}
                        >
                            {label}
                        </Tab>
                    ))
                }
            </TabsContainer>
            {
                tabs.map(({index, tabContent}) => (
                    <TabContent
                        key={index}
                        value={currentTabIndex}
                        index={index}
                    >
                        {tabContent}
                    </TabContent>
                ))
            }
        </VerticalTabsContainer>
    );
};

export default VerticalTabs;
