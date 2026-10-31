# CXO Scenario & Investment Workbench

Independent synthetic consulting prototype. Compare stabilise, modernise and replace choices across three fictional enterprise cases. Includes leadership lenses, funding eligibility, adjustable investment assumptions, monthly discounted cash-flow calculations, yearly tables, sensitivity cases, CSV export and a printable/downloadable decision brief.

All amounts are GBP thousands. No client data, live connectors, LLM or backend. Browser-local saved assumptions; no information is sent to a server by the application. Google Fonts may be requested for typography; system fonts are the fallback.

## Run

Serve the repository with any static server, e.g. `python -m http.server 8080`, and open localhost:8080. JavaScript modules require HTTP hosting. GitHub Pages: deploy main branch root.

## Verify

`node --test model.test.mjs`

## Financial model

Continue-as-is is the zero incremental baseline. Total funding = implementation × (1 + overrun) + transition. Expenditure is even across duration + delay months. Savings begin after delivery and ramp over six months. Optional business contribution represents incremental margin or monetisable capacity, distinct from savings. Benefits are multiplied by realisation. Monthly end-of-period discounting uses the annual rate; payback is undiscounted with interpolation. NPV and ROI use horizon cash flows only. Committed expenditure beyond horizon is disclosed. No terminal value, tax, inflation, financing or automatic delay cost. Figures are synthetic and must be validated before a real decision.

Leadership scores combine bounded ROI, residual risk, strategic fit and execution feasibility with visible weights. Only funded options enter the illustrative shortlist. This is not autonomous approval or a prediction.
