import { Accordion } from "./components/Builder/Accordion";
import { AppShell } from "./components/Layout/AppShell";
import { ReviewPanel } from "./components/Review/ReviewPanel";

function App() {
  return <AppShell builder={<Accordion />} review={<ReviewPanel />} />;
}

export default App;
