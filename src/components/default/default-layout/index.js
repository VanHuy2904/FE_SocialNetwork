import { AppProvider } from "../../../Context/appContext";
import Header from "./header";
import Slider from "./sliderbar";
import SliderRight from "./sliderbar-right";

function DefaultLayout({ children }) {
  return (
    <div>
      <AppProvider>
        <Header />
        <div className="w-2/3 flex justify-center m-auto pt-30  mt-14">
          <Slider />
          {children}
          <SliderRight />
        </div>
      </AppProvider>
    </div>
  );
}

export default DefaultLayout;
