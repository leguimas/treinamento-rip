#!/bin/bash

#JS
cat dxDialog/dxDialog.js > index.js
cat dxDropdownMenu/dxDropdownMenu.js >> index.js
cat dxIconExpansibleMenu/dxIconExpansibleMenu.js >> index.js
cat dxResultTable/dxResultTable.js >> index.js
cat dxTabs/dxTabs.js >> index.js
cat dxTooglePanel/dxTooglePanel.js >> index.js
cat dxForms/dxForms.js >> index.js
cat dxButtons/dxButtons.js >> index.js
cat dxButtonIcons/dxButtonIcons.js >> index.js
cat dxPickList/dxPickList.js >> index.js
cat dxSuggestion/dxSuggestion.js >> index.js;

#CSS
cat dxDialog/dxDialog.css > index.css
cat dxDropdownMenu/dxDropdownMenu.css >> index.css
cat dxIconExpansibleMenu/dxIconExpansibleMenu.css >> index.css
cat dxResultTable/dxResultTable.css >> index.css
cat dxTabs/dxTabs.css >> index.css
cat dxTooglePanel/dxTooglePanel.css >> index.css
cat dxPickList/dxPickList.css >> index.css
cat dxFormHint/dxFormHint.css >> index.css
cat dxSuggestion/dxSuggestion.css >> index.css

#load css file
echo -n 'hlLoad("holy/components/index.css");' >> index.js
dos2unix index.js
