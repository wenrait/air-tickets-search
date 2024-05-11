import "./AppComponent.scss";
import { HeaderComponent } from "../Header/HeaderComponent.tsx";
import { MainComponent } from "../Main/MainComponent.tsx";
const AppComponent = () => {
  return (
    <div className={"App"}>
      <header>
        <HeaderComponent />
      </header>
      <main>
        <MainComponent />
      </main>
    </div>
  );
};
export default AppComponent;
