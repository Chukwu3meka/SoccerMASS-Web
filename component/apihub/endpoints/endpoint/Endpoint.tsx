import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { Description, Snippet, Response } from ".";
import DataNotFound from "@component/shared/dataNotFound";
import TabPanel, { a11yProps } from "@component/shared/tabPanel";

function Endpoint({ endpoint, copyToCLipboardHandler, currentTab, handleTabChange, theme }) {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="endpoint">
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Code Snippet" {...a11yProps(1)} />
          <Tab label="API Response" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={currentTab} index={0}>
        {endpoint ? <Description handleTabChange={handleTabChange} title={endpoint.title} description={endpoint.description} /> : <DataNotFound />}
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        {endpoint ? <Snippet snippet={endpoint.snippet} copyToCLipboardHandler={copyToCLipboardHandler} theme={theme} /> : <DataNotFound />}
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        {endpoint ? <Response response={endpoint.response} handleTabChange={handleTabChange} theme={theme} /> : <DataNotFound />}
      </TabPanel>
    </Box>
  );
}

export default Endpoint;
