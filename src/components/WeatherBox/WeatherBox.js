import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';


const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(city => {
    setIsLoading(true);
    setError(false);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4966af1436244a4ff03dfa388ebf9fae&units=metric`)
    .then(res => {
      if(res.status === 200) {
        return res.json()
        .then(data => {
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main
          };
          setWeatherData(weatherData);
          setIsLoading(false);
        }
      )}
      else {
        setError(true);
        setIsLoading(false);
      }
    })},
  []);


  return (
    <section>
      <PickCity handleCityChange={handleCityChange}/>
      {weatherData && !isLoading && !error && <WeatherSummary {...weatherData}/>}
      {isLoading && <Loader />}
      {error && <ErrorBox >There is no such city!</ErrorBox>}
    </section>
  )
};

export default WeatherBox;