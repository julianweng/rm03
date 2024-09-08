import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import WeatherView from "./components/WeatherView";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

type WeatherDataType = {
  data: number[];
  errorMargin: number[];
};

type LocationWeatherData = {
  temperature: WeatherDataType;
  precipitation: WeatherDataType;
  moisture: WeatherDataType;
  weather: string;
};

type WeatherData = {
  [location: string]: LocationWeatherData;
};

const mockWeatherData: WeatherData = {
  "Current Location": {
    temperature: {
      data: [
        22, 23, 24, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 15, 16, 17,
        18, 19, 20, 21, 22, 23,
      ],
      errorMargin: [
        1, 1, 1.5, 1.5, 1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1,
      ],
    },
    precipitation: {
      data: [
        0, 0.1, 0.5, 2, 1, 0.3, 0, 0, 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6,
        1.8, 2, 1.8, 1.6, 1.4, 1.2, 1,
      ],
      errorMargin: [
        0.1, 0.1, 0.2, 0.5, 0.3, 0.1, 0, 0, 0, 0.1, 0.1, 0.2, 0.2, 0.3, 0.3,
        0.3, 0.4, 0.4, 0.5, 0.4, 0.4, 0.3, 0.3, 0.2,
      ],
    },
    moisture: {
      data: [
        50, 55, 60, 65, 63, 58, 52, 48, 45, 43, 40, 38, 35, 33, 30, 32, 35, 38,
        40, 43, 45, 48, 50, 53,
      ],
      errorMargin: [
        2, 2, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      ],
    },
    weather: "Partly Cloudy",
  },
  "New York": {
    temperature: {
      data: [
        18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 30, 29, 28, 27,
        26, 25, 24, 23, 22, 21,
      ],
      errorMargin: [
        1, 1, 1, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5,
        1.5, 1.5, 1.5, 1, 1, 1, 1, 1, 1,
      ],
    },
    precipitation: {
      data: [
        0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.4,
        1.3, 1.2, 1.1, 1, 0.9, 0.8, 0.7, 0.6, 0.5,
      ],
      errorMargin: [
        0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3,
        0.3, 0.3, 0.3, 0.2, 0.2, 0.2, 0.2, 0.2, 0.1, 0.1,
      ],
    },
    moisture: {
      data: [
        45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 69, 67, 65, 63,
        61, 59, 57, 55, 53, 51,
      ],
      errorMargin: [
        2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2,
      ],
    },
    weather: "Sunny",
  },
  London: {
    temperature: {
      data: [
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 25, 24, 23, 22, 21, 20,
        19, 18, 17, 16, 15, 14,
      ],
      errorMargin: [
        1, 1, 1, 1, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5,
        1, 1, 1, 1, 1, 1, 1, 1,
      ],
    },
    precipitation: {
      data: [
        0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.5, 1.4, 1.3,
        1.2, 1.1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4,
      ],
      errorMargin: [
        0.2, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.4, 0.4, 0.4, 0.3,
        0.3, 0.3, 0.3, 0.3, 0.2, 0.2, 0.2, 0.2, 0.2, 0.1,
      ],
    },
    moisture: {
      data: [
        60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 80, 78, 76, 74, 72, 70,
        68, 66, 64, 62, 60, 58,
      ],
      errorMargin: [
        3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3,
      ],
    },
    weather: "Rainy",
  },
  Tokyo: {
    temperature: {
      data: [
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 32, 31, 30, 29,
        28, 27, 26, 25, 24, 23,
      ],
      errorMargin: [
        1, 1, 1, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 2, 2, 2, 2, 1.5, 1.5,
        1.5, 1.5, 1.5, 1, 1, 1, 1,
      ],
    },
    precipitation: {
      data: [
        0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.3,
        1.2, 1.1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4,
      ],
      errorMargin: [
        0.1, 0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.3, 0.3,
        0.3, 0.3, 0.2, 0.2, 0.2, 0.2, 0.2, 0.1, 0.1, 0.1,
      ],
    },
    moisture: {
      data: [
        55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 79, 77, 75, 73,
        71, 69, 67, 65, 63, 61,
      ],
      errorMargin: [
        2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 2, 2, 2,
      ],
    },
    weather: "Clear",
  },
};

const WeatherApp = () => {
  const [view, setView] = useState<
    "temperature" | "precipitation" | "moisture"
  >("temperature");
  const [location, setLocation] = useState<string>("Current Location");
  const [weather, setWeather] = useState<string>(
    mockWeatherData["Current Location"].weather
  );
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const views: ("temperature" | "precipitation" | "moisture")[] = [
    "temperature",
    "precipitation",
    "moisture",
  ];
  const [currentTime, setCurrentTime] = useState<number>(new Date().getHours());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((prevTime) => (prevTime + 1) % 24);
    }, 3600000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setWeather(mockWeatherData[location].weather);
  }, [location]);

  const changeView = (direction: string) => {
    const currentIndex = views.indexOf(view);
    let newIndex = direction === "right" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0) newIndex = views.length - 1;
    else if (newIndex >= views.length) newIndex = 0;
    setView(views[newIndex]);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => changeView("left"),
    onSwipedRight: () => changeView("right"),
    trackMouse: true,
  });

  const getNextView = (direction: string) => {
    const currentIndex = views.indexOf(view);
    let newIndex = direction === "right" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0) newIndex = views.length - 1;
    else if (newIndex >= views.length) newIndex = 0;
    // Set first character to uppercase
    return views[newIndex].charAt(0).toUpperCase() + views[newIndex].slice(1);
  };

  const gradientClass =
    view === "temperature"
      ? "from-yellow-700 to-yellow-300"
      : view === "precipitation"
      ? "from-blue-800 to-blue-300"
      : "from-purple-700 to-purple-300"; // for moisture

  const getCurrentData = () => {
    const locationData = mockWeatherData[location][view].data;
    const errorMargin = mockWeatherData[location][view].errorMargin;
    return {
      data: locationData
        .slice(currentTime)
        .concat(locationData.slice(0, currentTime)),
      errorMargin: errorMargin
        .slice(currentTime)
        .concat(errorMargin.slice(0, currentTime)),
    };
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${gradientClass} flex flex-col p-4`}
      {...handlers}
    >
      <div className="text-center mb-6 relative">
        <div
          className="text-md font-semibold cursor-pointer flex items-center justify-center text-white"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {location} | {weather} <ChevronDownIcon className="h-4 w-4 ml-1" />
        </div>
        {showDropdown && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {Object.keys(mockWeatherData).map((loc) => (
                <a
                  key={loc}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setLocation(loc);
                    setShowDropdown(false);
                  }}
                >
                  {loc}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center mb-6 text-white">
        <div className="flex flex-col items-center mr-6">
          <span className="text-sm mb-1 opacity-70">{getNextView("left")}</span>
          <button
            onClick={() => changeView("left")}
            className="text-4xl leading-[0.1] scale-x-[2.0]"
          >
            ←
          </button>
        </div>
        <div className="text-7xl font-bold flex items-baseline">
          {getCurrentData().data[0]}
          <span className="text-2xl ml-1">
            {view === "temperature"
              ? "°C"
              : view === "precipitation"
              ? "mm"
              : "%"}
          </span>
        </div>
        <div className="flex flex-col items-center ml-6">
          <span className="text-sm mb-1 opacity-70">
            {getNextView("right")}
          </span>
          <button
            onClick={() => changeView("right")}
            className="text-4xl leading-[0.1] scale-x-[2.0]"
          >
            →
          </button>
        </div>
      </div>
      <WeatherView
        type={view}
        data={getCurrentData().data}
        errorMargin={getCurrentData().errorMargin}
        currentTime={currentTime}
      />
    </div>
  );
};

export default WeatherApp;
